import { RawEvent } from "./types";

export async function scrapeTicketmaster(apiKey: string): Promise<RawEvent[]> {
  if (!apiKey) return [];

  try {
    const params = new URLSearchParams({
      apikey: apiKey,
      city: "Houston",
      stateCode: "TX",
      countryCode: "US",
      size: "50",
      sort: "date,asc",
      startDateTime: new Date().toISOString().replace(/\.\d{3}Z$/, "Z"),
    });

    const res = await fetch(
      `https://app.ticketmaster.com/discovery/v2/events.json?${params}`,
      { signal: AbortSignal.timeout(8000) }
    );

    if (!res.ok) return [];
    const data = await res.json();
    const events = data._embedded?.events || [];

    return events.map((e: Record<string, unknown>) => {
      const venues = (e._embedded as Record<string, unknown>)?.venues as Record<string, unknown>[] | undefined;
      const venue = venues?.[0];
      const city = (venue?.city as Record<string, string>)?.name || "Houston";
      const state = (venue?.state as Record<string, string>)?.stateCode || "TX";
      const address = (venue?.address as Record<string, string>)?.line1 || "";
      const postalCode = (venue?.postalCode as string) || "";

      const dates = e.dates as Record<string, unknown> | undefined;
      const start = dates?.start as Record<string, string> | undefined;
      const end = dates?.end as Record<string, string> | undefined;

      const images = e.images as Record<string, unknown>[] | undefined;
      const image = images?.find((i) => (i.ratio as string) === "16_9" && (i.width as number) > 500);

      return {
        name: (e.name as string) || "Untitled Event",
        date: start?.localDate && start?.localTime
          ? `${start.localDate}T${start.localTime}`
          : start?.localDate || "",
        endDate: end?.localDate ? `${end.localDate}T${end.localTime || "23:59:00"}` : undefined,
        location: (venue?.name as string) || "Houston",
        address: address
          ? `${address}, ${city}, ${state} ${postalCode}`.trim()
          : `${city}, ${state}`,
        description: (e.info as string) || (e.pleaseNote as string) || "",
        url: (e.url as string) || "",
        source: "Ticketmaster",
        estimatedAttendance: undefined,
        imageUrl: image ? (image.url as string) : undefined,
      };
    });
  } catch {
    return [];
  }
}
