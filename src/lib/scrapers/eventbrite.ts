import { RawEvent } from "./types";

export async function scrapeEventbrite(apiKey: string): Promise<RawEvent[]> {
  if (!apiKey) return [];

  try {
    // Eventbrite Search API — Houston events in next 90 days
    const params = new URLSearchParams({
      "location.address": "Houston, TX",
      "location.within": "50km",
      "start_date.range_start": new Date().toISOString(),
      "start_date.range_end": new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
      expand: "venue,category",
      page_size: "50",
    });

    const res = await fetch(
      `https://www.eventbriteapi.com/v3/events/search/?${params}`,
      {
        headers: { Authorization: `Bearer ${apiKey}` },
        signal: AbortSignal.timeout(8000),
      }
    );

    if (!res.ok) return [];
    const data = await res.json();

    return (data.events || []).map((e: Record<string, unknown>) => {
      const venue = e.venue as Record<string, unknown> | undefined;
      const address = venue?.address as Record<string, string> | undefined;
      return {
        name: (e.name as Record<string, string>)?.text || "Untitled Event",
        date: e.start ? (e.start as Record<string, string>).local : "",
        endDate: e.end ? (e.end as Record<string, string>).local : undefined,
        location: (venue?.name as string) || "Houston",
        address: address
          ? `${address.address_1 || ""}, ${address.city || "Houston"}, ${address.region || "TX"} ${address.postal_code || ""}`.trim()
          : "Houston, TX",
        description: (e.description as Record<string, string>)?.text || "",
        url: (e.url as string) || "",
        source: "Eventbrite",
        estimatedAttendance: (e.capacity as number) || undefined,
        imageUrl: e.logo ? (e.logo as Record<string, Record<string, string>>)?.original?.url : undefined,
      };
    });
  } catch {
    return [];
  }
}
