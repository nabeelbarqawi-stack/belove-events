"use client";

import { useState, useEffect } from "react";
import { BeLoveEvent, EventType } from "@/lib/types";
import { mockEvents } from "@/lib/mock-events";
import { eventTypeIcon, cn, formatAttendance } from "@/lib/utils";
import EventCard from "@/components/EventCard";
import { Search, SlidersHorizontal, X, MapPin, Building2 } from "lucide-react";
import { format, getMonth } from "date-fns";

const STORAGE_KEY = "belove_events";

function loadEvents(): BeLoveEvent[] {
  if (typeof window === "undefined") return mockEvents;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  localStorage.setItem(STORAGE_KEY, JSON.stringify(mockEvents));
  return mockEvents;
}

function saveEvents(events: BeLoveEvent[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
}

const EVENT_TYPES: EventType[] = [
  "Festival", "Concert", "Fitness", "Market", "Sports", "College", "Pop-up", "Community", "Other",
];

const MONTH_TABS = [
  { label: "All", value: "all" },
  { label: "April", value: "3" },   // month index 0-based
  { label: "May", value: "4" },
  { label: "June", value: "5" },
  { label: "July", value: "6" },
  { label: "August", value: "7" },
];

const VENUE_FILTERS = [
  { label: "All Venues", value: "all" },
  { label: "GRB Convention Center", value: "George R. Brown Convention Center" },
  { label: "Discovery Green", value: "Discovery Green Park" },
  { label: "Memorial Park", value: "Memorial Park" },
  { label: "Buffalo Bayou", value: "Buffalo Bayou" },
];

export default function DiscoverPage() {
  const [events, setEvents] = useState<BeLoveEvent[]>([]);
  const [query, setQuery] = useState("");
  const [monthTab, setMonthTab] = useState("all");
  const [typeFilter, setTypeFilter] = useState<EventType | "All">("All");
  const [venueFilter, setVenueFilter] = useState("all");
  const [minScore, setMinScore] = useState(0);
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "approved" | "skipped">("all");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setEvents(loadEvents());
  }, []);

  function mutate(updated: BeLoveEvent[]) {
    setEvents(updated);
    saveEvents(updated);
  }

  function handleApprove(id: string) {
    mutate(events.map((e) => (e.id === id ? { ...e, status: "approved" as const } : e)));
  }
  function handleSkip(id: string) {
    mutate(events.map((e) => (e.id === id ? { ...e, status: "skipped" as const } : e)));
  }
  function handleSave(id: string) {
    mutate(events.map((e) => (e.id === id ? { ...e, status: "saved" as const } : e)));
  }
  function handleAddCalendar(id: string) {
    mutate(events.map((e) => (e.id === id ? { ...e, calendarAdded: true } : e)));
  }

  const filtered = events.filter((e) => {
    const d = new Date(e.date);
    if (monthTab !== "all" && getMonth(d) !== Number(monthTab)) return false;
    if (query &&
        !e.name.toLowerCase().includes(query.toLowerCase()) &&
        !e.location.toLowerCase().includes(query.toLowerCase()) &&
        !e.source.toLowerCase().includes(query.toLowerCase())) return false;
    if (typeFilter !== "All" && e.eventType !== typeFilter) return false;
    if (venueFilter !== "all" && !e.location.includes(venueFilter)) return false;
    if (e.brandFitScore < minScore) return false;
    if (statusFilter !== "all" && e.status !== statusFilter) return false;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    const dateDiff = new Date(a.date).getTime() - new Date(b.date).getTime();
    if (dateDiff !== 0) return dateDiff;
    return b.brandFitScore - a.brandFitScore;
  });

  // Count events per month tab for badges
  function countForMonth(m: string) {
    if (m === "all") return events.filter(e => e.status !== "skipped").length;
    return events.filter(e => getMonth(new Date(e.date)) === Number(m) && e.status !== "skipped").length;
  }

  // Group by month for display
  const grouped: Record<string, BeLoveEvent[]> = {};
  for (const e of sorted) {
    const key = format(new Date(e.date), "MMMM yyyy");
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(e);
  }

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-white">Discover Events</h1>
        <p className="text-zinc-400 text-sm mt-0.5">
          {events.length} events · Houston, TX · Sorted by date
        </p>
      </div>

      {/* Month tabs */}
      <div className="flex gap-1.5 overflow-x-auto pb-2 mb-4 scrollbar-none">
        {MONTH_TABS.map(({ label, value }) => {
          const count = countForMonth(value);
          const active = monthTab === value;
          return (
            <button
              key={value}
              onClick={() => setMonthTab(value)}
              className={cn(
                "flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0",
                active
                  ? "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                  : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-zinc-200 hover:border-zinc-700"
              )}
            >
              {label}
              <span className={cn(
                "text-xs px-1.5 py-0.5 rounded-full font-normal",
                active ? "bg-rose-500/30 text-rose-200" : "bg-zinc-800 text-zinc-500"
              )}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Venue quick-filter pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-none">
        {VENUE_FILTERS.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setVenueFilter(venueFilter === value ? "all" : value)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs whitespace-nowrap border transition-colors flex-shrink-0",
              venueFilter === value
                ? "bg-blue-500/20 text-blue-300 border-blue-500/40"
                : "bg-zinc-900 text-zinc-500 border-zinc-800 hover:text-zinc-300 hover:border-zinc-700"
            )}
          >
            {value === "George R. Brown Convention Center" && <Building2 className="w-3 h-3" />}
            {value !== "all" && value !== "George R. Brown Convention Center" && <MapPin className="w-3 h-3" />}
            {label}
          </button>
        ))}
      </div>

      {/* Search + Filter bar */}
      <div className="flex gap-2 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search events, venues, sources..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-9 pr-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600"
          />
          {query && (
            <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2">
              <X className="w-3.5 h-3.5 text-zinc-500" />
            </button>
          )}
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={cn(
            "flex items-center gap-2 px-3 py-2 border rounded-lg text-sm transition-colors",
            showFilters
              ? "bg-rose-500/15 border-rose-500/30 text-rose-300"
              : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200"
          )}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span className="hidden sm:inline">Filters</span>
        </button>
      </div>

      {/* Filters panel */}
      {showFilters && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-4 space-y-4">
          <div>
            <p className="text-zinc-400 text-xs font-medium uppercase tracking-wide mb-2">Event Type</p>
            <div className="flex flex-wrap gap-2">
              {(["All", ...EVENT_TYPES] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t as EventType | "All")}
                  className={cn(
                    "text-xs px-3 py-1.5 rounded-full border transition-colors",
                    typeFilter === t
                      ? "bg-rose-500/20 border-rose-500/40 text-rose-300"
                      : "bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-zinc-200"
                  )}
                >
                  {t !== "All" && eventTypeIcon(t)} {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-zinc-400 text-xs font-medium uppercase tracking-wide mb-2">
              Min Brand Fit Score: <span className="text-white">{minScore > 0 ? `${minScore}+` : "Any"}</span>
            </p>
            <input
              type="range"
              min={0}
              max={9}
              value={minScore}
              onChange={(e) => setMinScore(Number(e.target.value))}
              className="w-full accent-rose-500"
            />
            <div className="flex justify-between text-xs text-zinc-600 mt-1">
              <span>Any</span><span>5+</span><span>7+</span><span>9+</span>
            </div>
          </div>

          <div>
            <p className="text-zinc-400 text-xs font-medium uppercase tracking-wide mb-2">Status</p>
            <div className="flex gap-2 flex-wrap">
              {(["all", "pending", "approved", "skipped"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={cn(
                    "text-xs px-3 py-1.5 rounded-full border capitalize transition-colors",
                    statusFilter === s
                      ? "bg-rose-500/20 border-rose-500/40 text-rose-300"
                      : "bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-zinc-200"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      <p className="text-zinc-600 text-xs mb-4">
        {sorted.length} event{sorted.length !== 1 ? "s" : ""} found
      </p>

      {sorted.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 text-center">
          <p className="text-zinc-500 text-sm">No events match your filters.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(grouped).map(([month, monthEvents]) => (
            <div key={month}>
              {/* Month header */}
              <div className="flex items-center gap-3 mb-3">
                <h2 className="text-white font-semibold text-sm">{month}</h2>
                <div className="flex-1 h-px bg-zinc-800" />
                <span className="text-zinc-600 text-xs">{monthEvents.length} events</span>
              </div>

              {/* Month summary row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                {[
                  { label: "Total Reach", value: formatAttendance(monthEvents.reduce((s, e) => s + e.estimatedAttendance, 0)) },
                  { label: "Avg Score", value: (monthEvents.reduce((s, e) => s + e.brandFitScore, 0) / monthEvents.length).toFixed(1) + "/10" },
                  { label: "High Viability", value: monthEvents.filter(e => e.samplingViability === "High").length },
                  { label: "Outdoor", value: monthEvents.filter(e => e.isOutdoor).length },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2">
                    <p className="text-white text-sm font-semibold">{value}</p>
                    <p className="text-zinc-600 text-xs">{label}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                {monthEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onApprove={handleApprove}
                    onSkip={handleSkip}
                    onSave={handleSave}
                    onAddCalendar={handleAddCalendar}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
