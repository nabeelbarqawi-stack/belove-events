"use client";

import { useState, useEffect } from "react";
import { BeLoveEvent } from "@/lib/types";
import { mockEvents } from "@/lib/mock-events";
import { downloadICS, downloadAllICS } from "@/lib/utils";
import StatsBar from "@/components/StatsBar";
import EventCard from "@/components/EventCard";
import { format } from "date-fns";
import { CalendarDays, RefreshCw, Download, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

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

export default function DashboardPage() {
  const [events, setEvents] = useState<BeLoveEvent[]>([]);
  const [scanning, setScanning] = useState(false);

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

  async function handleScan() {
    setScanning(true);
    await new Promise((r) => setTimeout(r, 2200));
    setScanning(false);
  }

  function handleExportAll() {
    const approved = events.filter((e) => e.status === "approved");
    if (approved.length > 0) downloadAllICS(approved);
  }

  // Top shortlist = pending events sorted by score, top 5 for dashboard
  const shortlist = events
    .filter((e) => e.status === "pending")
    .sort((a, b) => b.brandFitScore - a.brandFitScore)
    .slice(0, 5);

  const approved = events.filter((e) => e.status === "approved");

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-rose-400" />
            <span className="text-rose-400 text-xs font-medium uppercase tracking-wide">
              Weekly Digest
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white">Event Discovery</h1>
          <p className="text-zinc-400 text-sm mt-0.5">
            Week of {format(new Date(), "MMMM d, yyyy")} · Houston, TX
          </p>
        </div>
        <div className="flex items-center gap-2">
          {approved.length > 0 && (
            <button
              onClick={handleExportAll}
              className="flex items-center gap-2 px-3 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 text-sm rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              Export {approved.length} to Calendar
            </button>
          )}
          <button
            onClick={handleScan}
            disabled={scanning}
            className="flex items-center gap-2 px-3 py-2 bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 text-sm rounded-lg transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${scanning ? "animate-spin" : ""}`} />
            {scanning ? "Scanning..." : "Run Scan"}
          </button>
        </div>
      </div>

      {/* Stats */}
      <StatsBar events={events} />

      {/* Scanning state */}
      {scanning && (
        <div className="mt-4 bg-zinc-900 border border-zinc-800 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <RefreshCw className="w-4 h-4 text-rose-400 animate-spin" />
            <div>
              <p className="text-white text-sm font-medium">Scanning Houston events...</p>
              <p className="text-zinc-500 text-xs mt-0.5">
                Checking Eventbrite · Meetup · Houston365 · Do713 · Ticketmaster
              </p>
            </div>
          </div>
          <div className="mt-3 bg-zinc-800 rounded-full h-1.5 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full animate-pulse w-3/4" />
          </div>
        </div>
      )}

      {/* Top Shortlist */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-white font-semibold">Top Picks This Week</h2>
            <p className="text-zinc-500 text-xs mt-0.5">
              Highest brand fit scores · Pending your review
            </p>
          </div>
          <Link
            href="/discover"
            className="flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            View all <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {shortlist.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 text-center">
            <p className="text-zinc-500 text-sm">No pending events. Run a scan to discover new events.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {shortlist.map((event) => (
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
        )}
      </div>

      {/* Recently Approved */}
      {approved.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-white font-semibold">Approved Events</h2>
              <p className="text-zinc-500 text-xs mt-0.5">
                {approved.length} event{approved.length !== 1 ? "s" : ""} approved for activation
              </p>
            </div>
            <Link
              href="/approved"
              className="flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              Manage <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {approved.slice(0, 3).map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onAddCalendar={handleAddCalendar}
                showActions={false}
                compact
              />
            ))}
          </div>
        </div>
      )}

      {/* Quick tip */}
      <div className="mt-8 bg-gradient-to-br from-rose-500/10 to-pink-500/10 border border-rose-500/20 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <CalendarDays className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-white text-sm font-medium">How it works</p>
            <p className="text-zinc-400 text-xs mt-1 leading-relaxed">
              Events are automatically scored 1–10 for brand fit using AI. Review the shortlist,
              approve the events you want, then export them directly to your Google Calendar with
              activation notes pre-filled.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
