import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { BeLoveEvent, EventStatus } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function scoreColor(score: number): string {
  if (score >= 9) return "text-emerald-400";
  if (score >= 7) return "text-lime-400";
  if (score >= 5) return "text-yellow-400";
  return "text-red-400";
}

export function scoreBg(score: number): string {
  if (score >= 9) return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
  if (score >= 7) return "bg-lime-500/20 text-lime-300 border-lime-500/30";
  if (score >= 5) return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
  return "bg-red-500/20 text-red-300 border-red-500/30";
}

export function viabilityColor(v: string): string {
  if (v === "High") return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
  if (v === "Medium") return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
  return "bg-red-500/20 text-red-300 border-red-500/30";
}

export function statusConfig(status: EventStatus) {
  const map = {
    pending: { label: "Pending", color: "bg-zinc-700 text-zinc-300" },
    approved: { label: "Approved", color: "bg-emerald-500/20 text-emerald-300" },
    skipped: { label: "Skipped", color: "bg-zinc-700/50 text-zinc-500" },
    saved: { label: "Saved", color: "bg-blue-500/20 text-blue-300" },
  };
  return map[status];
}

export function formatAttendance(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(0)}K`;
  return n.toString();
}

export function eventTypeIcon(type: string): string {
  const map: Record<string, string> = {
    Festival: "🎪",
    Concert: "🎵",
    Fitness: "🏃",
    Market: "🛒",
    Sports: "⚽",
    College: "🎓",
    "Pop-up": "✨",
    Community: "🤝",
    Other: "📅",
  };
  return map[type] || "📅";
}

export function generateCalendarEntry(event: BeLoveEvent): string {
  const start = new Date(event.date);
  const end = event.endDate ? new Date(event.endDate) : new Date(start.getTime() + 4 * 60 * 60 * 1000);

  const pad = (n: number) => String(n).padStart(2, "0");
  const fmt = (d: Date) =>
    `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;

  const notes = [
    `WHY WE CHOSE THIS:`,
    event.reasoning,
    ``,
    `BRAND FIT SCORE: ${event.brandFitScore}/10`,
    `AUDIENCE: ${event.audienceFit}`,
    ``,
    `ACTIVATION IDEA:`,
    event.activationIdea,
    ``,
    `LOGISTICS:`,
    event.permitConsiderations,
  ].join("\\n");

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//BeLove Events//EN",
    "BEGIN:VEVENT",
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:🥤 [SAMPLING] ${event.name}`,
    `LOCATION:${event.address}`,
    `DESCRIPTION:${notes}`,
    `URL:${event.sourceUrl}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  return ics;
}

export function downloadICS(event: BeLoveEvent) {
  const ics = generateCalendarEntry(event);
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${event.name.replace(/\s+/g, "_")}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}

export function downloadAllICS(events: BeLoveEvent[]) {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//BeLove Events//EN",
  ];

  for (const event of events) {
    const start = new Date(event.date);
    const end = event.endDate
      ? new Date(event.endDate)
      : new Date(start.getTime() + 4 * 60 * 60 * 1000);

    const pad = (n: number) => String(n).padStart(2, "0");
    const fmt = (d: Date) =>
      `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;

    const notes = [
      `WHY WE CHOSE THIS:`,
      event.reasoning,
      ``,
      `BRAND FIT SCORE: ${event.brandFitScore}/10`,
      `AUDIENCE: ${event.audienceFit}`,
      ``,
      `ACTIVATION IDEA:`,
      event.activationIdea,
      ``,
      `LOGISTICS:`,
      event.permitConsiderations,
    ].join("\\n");

    lines.push(
      "BEGIN:VEVENT",
      `DTSTART:${fmt(start)}`,
      `DTEND:${fmt(end)}`,
      `SUMMARY:🥤 [SAMPLING] ${event.name}`,
      `LOCATION:${event.address}`,
      `DESCRIPTION:${notes}`,
      `URL:${event.sourceUrl}`,
      "END:VEVENT"
    );
  }

  lines.push("END:VCALENDAR");

  const blob = new Blob([lines.join("\r\n")], {
    type: "text/calendar;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "BeLove_Approved_Events.ics";
  a.click();
  URL.revokeObjectURL(url);
}
