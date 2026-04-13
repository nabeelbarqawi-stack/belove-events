import { NextRequest, NextResponse } from "next/server";
import { scrapeEventbrite } from "@/lib/scrapers/eventbrite";
import { scrapeTicketmaster } from "@/lib/scrapers/ticketmaster";
import {
  scrapeHouston365,
  scrapeDo713,
  scrapeCultureMap,
  scrapeDiscoveryGreen,
  scrapeMillerOutdoor,
  scrapeVisitHouston,
  scrapeHoustonPress,
  scrapeSpaceCenter,
  scrapeHoustonZoo,
  scrapeHMNS,
  scrapeNRGPark,
  scrapeBayouCityEvents,
  scrapeAllevents,
  scrapeMeetup,
} from "@/lib/scrapers/jsonld";
import { scoreEvent } from "@/lib/scrapers/scorer";
import { RawEvent } from "@/lib/scrapers/types";

// Which scrapers to run based on enabled sources from request body
const SCRAPER_MAP: Record<string, () => Promise<RawEvent[]>> = {
  houston365: scrapeHouston365,
  do713: scrapeDo713,
  culturemap: scrapeCultureMap,
  discoverygreen: scrapeDiscoveryGreen,
  miller: scrapeMillerOutdoor,
  visithouston: scrapeVisitHouston,
  houstonpress: scrapeHoustonPress,
  spacecenter: scrapeSpaceCenter,
  houstonzoo: scrapeHoustonZoo,
  hmns: scrapeHMNS,
  nrgpark: scrapeNRGPark,
  houstonfirst: scrapeBayouCityEvents,
  allevents: scrapeAllevents,
  meetup: scrapeMeetup,
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      enabledSources = Object.keys(SCRAPER_MAP),
      eventbriteKey,
      ticketmasterKey,
      minScore = 6,
      existingEventNames = [] as string[],
    } = body;

    const anthropicKey = process.env.ANTHROPIC_API_KEY;
    if (!anthropicKey) {
      return NextResponse.json(
        { error: "ANTHROPIC_API_KEY not configured. Add it in Vercel environment variables." },
        { status: 500 }
      );
    }

    const existingNames = new Set<string>(
      (existingEventNames as string[]).map((n: string) => n.toLowerCase())
    );

    // ── 1. Run all scrapers in parallel ──────────────────────────────────────
    const scraperPromises: Promise<RawEvent[]>[] = [];

    // API-based sources
    if (eventbriteKey) scraperPromises.push(scrapeEventbrite(eventbriteKey));
    if (ticketmasterKey) scraperPromises.push(scrapeTicketmaster(ticketmasterKey));

    // Web scrapers
    for (const source of enabledSources) {
      if (SCRAPER_MAP[source]) {
        scraperPromises.push(SCRAPER_MAP[source]());
      }
    }

    const results = await Promise.allSettled(scraperPromises);
    const allRaw: RawEvent[] = [];
    for (const r of results) {
      if (r.status === "fulfilled") allRaw.push(...r.value);
    }

    // ── 2. Deduplicate ────────────────────────────────────────────────────────
    const seen = new Set<string>();
    const unique = allRaw.filter((e) => {
      const key = e.name.toLowerCase().trim();
      if (seen.has(key) || existingNames.has(key)) return false;
      seen.add(key);
      return true;
    });

    // Filter out events without dates or past events
    const now = new Date();
    const upcoming = unique.filter((e) => {
      if (!e.date) return false;
      try {
        return new Date(e.date) >= now;
      } catch {
        return false;
      }
    });

    // ── 3. Score with Claude (batch, max 20 to stay within timeout) ───────────
    const toScore = upcoming.slice(0, 20);
    const scored = await Promise.allSettled(
      toScore.map((e) => scoreEvent(e, seen))
    );

    const newEvents = scored
      .filter((r) => r.status === "fulfilled" && r.value !== null)
      .map((r) => (r as PromiseFulfilledResult<Awaited<ReturnType<typeof scoreEvent>>>).value!)
      .filter((e) => e.brandFitScore >= minScore);

    return NextResponse.json({
      success: true,
      discovered: allRaw.length,
      unique: unique.length,
      scored: newEvents.length,
      events: newEvents,
      sources: {
        total: scraperPromises.length,
        enabled: enabledSources,
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message || "Scan failed" },
      { status: 500 }
    );
  }
}
