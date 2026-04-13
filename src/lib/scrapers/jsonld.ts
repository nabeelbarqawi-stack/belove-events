/**
 * Generic JSON-LD event scraper.
 * Most modern event sites embed schema.org/Event data as JSON-LD.
 * This works for: Houston365, Do713, CultureMap, Discovery Green,
 * Miller Outdoor Theatre, Space Center Houston, and many more.
 */
import { RawEvent } from "./types";

function extractJsonLd(html: string): RawEvent[] {
  const events: RawEvent[] = [];
  const regex = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match;

  while ((match = regex.exec(html)) !== null) {
    try {
      const raw = match[1].trim();
      const parsed = JSON.parse(raw);
      const items: Record<string, unknown>[] = Array.isArray(parsed)
        ? parsed
        : parsed["@graph"]
        ? parsed["@graph"]
        : [parsed];

      for (const item of items) {
        if (item["@type"] !== "Event") continue;

        const location = item.location as Record<string, unknown> | undefined;
        const locationName =
          (location?.name as string) ||
          (location?.["@type"] === "Place" ? (location?.name as string) : undefined) ||
          "Houston";

        const addressObj = location?.address as Record<string, string> | string | undefined;
        const address =
          typeof addressObj === "string"
            ? addressObj
            : addressObj
            ? `${addressObj.streetAddress || ""} ${addressObj.addressLocality || "Houston"}, ${addressObj.addressRegion || "TX"} ${addressObj.postalCode || ""}`.trim()
            : "Houston, TX";

        const organizer = item.organizer as Record<string, string> | undefined;

        events.push({
          name: (item.name as string) || "Untitled Event",
          date: (item.startDate as string) || "",
          endDate: (item.endDate as string) || undefined,
          location: locationName,
          address,
          description:
            (item.description as string) ||
            (item.about as string) ||
            "",
          url: (item.url as string) || (item["@id"] as string) || "",
          source: organizer?.name || "Web",
          estimatedAttendance: undefined,
          imageUrl:
            typeof item.image === "string"
              ? item.image
              : Array.isArray(item.image)
              ? (item.image[0] as string)
              : (item.image as Record<string, string>)?.url || undefined,
        });
      }
    } catch {
      // skip malformed JSON-LD
    }
  }

  return events;
}

async function fetchAndParse(url: string, sourceName: string): Promise<RawEvent[]> {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml",
      },
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) return [];
    const html = await res.text();
    const events = extractJsonLd(html);

    // Tag all events with the correct source name
    return events.map((e) => ({ ...e, source: sourceName }));
  } catch {
    return [];
  }
}

// ── Individual site scrapers ───────────────────────────────────────────────

export async function scrapeHouston365(): Promise<RawEvent[]> {
  return fetchAndParse("https://houston365.com/events/", "Houston365");
}

export async function scrapeDo713(): Promise<RawEvent[]> {
  return fetchAndParse("https://do713.com/", "Do713");
}

export async function scrapeCultureMap(): Promise<RawEvent[]> {
  return fetchAndParse("https://houston.culturemap.com/", "CultureMap Houston");
}

export async function scrapeDiscoveryGreen(): Promise<RawEvent[]> {
  return fetchAndParse("https://www.discoverygreen.com/calendar", "Discovery Green");
}

export async function scrapeMillerOutdoor(): Promise<RawEvent[]> {
  return fetchAndParse("https://milleroutdoortheatre.com/performance/", "Miller Outdoor Theatre");
}

export async function scrapeVisitHouston(): Promise<RawEvent[]> {
  return fetchAndParse("https://www.visithoustontx.com/events/", "Visit Houston");
}

export async function scrapeHoustonPress(): Promise<RawEvent[]> {
  return fetchAndParse("https://www.houstonpress.com/calendar/", "Houston Press");
}

export async function scrapeSpaceCenter(): Promise<RawEvent[]> {
  return fetchAndParse("https://www.spacecenter.org/events/", "Space Center Houston");
}

export async function scrapeHoustonZoo(): Promise<RawEvent[]> {
  return fetchAndParse("https://www.houstonzoo.org/events/", "Houston Zoo");
}

export async function scrapeHMNS(): Promise<RawEvent[]> {
  return fetchAndParse(
    "https://www.hmns.org/events/",
    "Houston Museum of Natural Science"
  );
}

export async function scrapeNRGPark(): Promise<RawEvent[]> {
  return fetchAndParse("https://www.nrgpark.com/events/", "NRG Park");
}

export async function scrapeBayouCityEvents(): Promise<RawEvent[]> {
  return fetchAndParse("https://www.houstonfirst.com/events/", "Houston First");
}

export async function scrapeAllevents(): Promise<RawEvent[]> {
  return fetchAndParse("https://allevents.in/houston/", "AllEvents.in");
}

export async function scrapeMeetup(city = "houston"): Promise<RawEvent[]> {
  // Meetup's public events page (no auth needed for basic scraping)
  return fetchAndParse(`https://www.meetup.com/find/?location=us--tx--${city}&source=EVENTS`, "Meetup");
}
