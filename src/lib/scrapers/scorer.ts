import Anthropic from "@anthropic-ai/sdk";
import { RawEvent } from "./types";
import { BeLoveEvent, EventType, SamplingViability } from "../types";

const client = new Anthropic();

export async function scoreEvent(raw: RawEvent, existingIds: Set<string>): Promise<BeLoveEvent | null> {
  // Skip events with no date or name
  if (!raw.name || !raw.date) return null;

  // Deduplicate by name similarity
  const id = `scraped_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

  try {
    const prompt = `You are a brand activation specialist for "Be Love," a health-forward beverage brand targeting young adults (21–35) in Houston, TX.

Evaluate this Houston event for product sampling potential:

Event: ${raw.name}
Date: ${raw.date}
Location: ${raw.location}
Address: ${raw.address}
Description: ${raw.description?.slice(0, 500) || "No description"}
Source: ${raw.source}

Score this event 1–10 on brand fit using:
- Outdoor or high foot-traffic venue (30%)
- Health/lifestyle/wellness audience (30%)
- Social, festive, or active vibe (20%)
- Sampling-friendly format (20%)

Return ONLY valid JSON (no markdown, no explanation):
{
  "brandFitScore": <1-10>,
  "eventType": <"Festival"|"Concert"|"Fitness"|"Market"|"Sports"|"College"|"Pop-up"|"Community"|"Other">,
  "estimatedAttendance": <number or null>,
  "isOutdoor": <true|false>,
  "isRecurring": <true|false>,
  "recurringPattern": <string or null>,
  "audienceFit": "<one sentence>",
  "samplingViability": <"High"|"Medium"|"Low">,
  "activationIdea": "<one specific idea for this event>",
  "permitConsiderations": "<key logistics note>",
  "reasoning": "<2 sentences max>"
}`;

    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 400,
      messages: [{ role: "user", content: prompt }],
    });

    const text = (message.content[0] as { type: string; text: string }).text.trim();
    const scored = JSON.parse(text);

    return {
      id,
      name: raw.name,
      date: raw.date,
      endDate: raw.endDate,
      location: raw.location,
      address: raw.address,
      estimatedAttendance: scored.estimatedAttendance || raw.estimatedAttendance || 1000,
      eventType: (scored.eventType as EventType) || "Other",
      isOutdoor: scored.isOutdoor ?? true,
      isRecurring: scored.isRecurring ?? false,
      recurringPattern: scored.recurringPattern || undefined,
      sourceUrl: raw.url,
      source: raw.source,
      description: raw.description || "",
      imageUrl: raw.imageUrl,
      brandFitScore: Math.max(1, Math.min(10, scored.brandFitScore || 5)),
      audienceFit: scored.audienceFit || "",
      samplingViability: (scored.samplingViability as SamplingViability) || "Medium",
      activationIdea: scored.activationIdea || "",
      permitConsiderations: scored.permitConsiderations || "",
      reasoning: scored.reasoning || "",
      status: "pending",
      discoveredAt: new Date().toISOString(),
      calendarAdded: false,
    };
  } catch {
    return null;
  }
}
