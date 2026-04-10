"use client";

import { useState, useEffect } from "react";
import { BeLoveEvent } from "@/lib/types";
import { mockEvents } from "@/lib/mock-events";
import { downloadAllICS, downloadICS, formatAttendance, scoreBg, cn, eventTypeIcon } from "@/lib/utils";
import { format } from "date-fns";
import {
  CheckCircle,
  Download,
  CalendarPlus,
  MapPin,
  Users,
  ExternalLink,
  Lightbulb,
  TriangleAlert,
  RefreshCw,
} from "lucide-react";

const STORAGE_KEY = "belove_events";

function loadEvents(): BeLoveEvent[] {
  if (typeof window === "undefined") return mockEvents;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return mockEvents;
}

function saveEvents(events: BeLoveEvent[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
}

export default function ApprovedPage() {
  const [events, setEvents] = useState<BeLoveEvent[]>([]);

  useEffect(() => {
    setEvents(loadEvents());
  }, []);

  function mutate(updated: BeLoveEvent[]) {
    setEvents(updated);
    saveEvents(updated);
  }

  const approved = events.filter((e) => e.status === "approved");

  function handleRemove(id: string) {
    mutate(events.map((e) => (e.id === id ? { ...e, status: "pending" as const } : e)));
  }

  function handleAddCalendar(event: BeLoveEvent) {
    downloadICS(event);
    mutate(events.map((e) => (e.id === event.id ? { ...e, calendarAdded: true } : e)));
  }

  function handleExportAll() {
    downloadAllICS(approved);
    mutate(events.map((e) => approved.find((a) => a.id === e.id) ? { ...e, calendarAdded: true } : e));
  }

  const totalReach = approved.reduce((s, e) => s + e.estimatedAttendance, 0);
  const avgScore = approved.length > 0
    ? (approved.reduce((s, e) => s + e.brandFitScore, 0) / approved.length).toFixed(1)
    : "—";

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Approved Events</h1>
          <p className="text-zinc-400 text-sm mt-0.5">
            {approved.length} event{approved.length !== 1 ? "s" : ""} ready for activation
          </p>
        </div>
        {approved.length > 0 && (
          <button
            onClick={handleExportAll}
            className="flex items-center gap-2 px-4 py-2 bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 text-sm rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            Export All to Calendar (.ics)
          </button>
        )}
      </div>

      {/* Summary stats */}
      {approved.length > 0 && (
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
            <p className="text-2xl font-bold text-emerald-400">{approved.length}</p>
            <p className="text-zinc-500 text-xs mt-0.5">Events Approved</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
            <p className="text-2xl font-bold text-blue-400">{formatAttendance(totalReach)}</p>
            <p className="text-zinc-500 text-xs mt-0.5">Total Reach</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
            <p className="text-2xl font-bold text-rose-400">{avgScore}</p>
            <p className="text-zinc-500 text-xs mt-0.5">Avg Brand Fit</p>
          </div>
        </div>
      )}

      {/* Events list */}
      {approved.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 text-center">
          <CheckCircle className="w-10 h-10 text-zinc-700 mx-auto mb-3" />
          <p className="text-zinc-400 text-sm font-medium">No approved events yet</p>
          <p className="text-zinc-600 text-xs mt-1">
            Go to Discover Events and approve events to see them here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {approved.map((event) => (
            <div
              key={event.id}
              className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden"
            >
              {/* Event header */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span>{eventTypeIcon(event.eventType)}</span>
                      <span className="text-zinc-500 text-xs">{event.eventType}</span>
                      {event.isRecurring && (
                        <span className="flex items-center gap-1 text-xs text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full px-2 py-0.5">
                          <RefreshCw className="w-3 h-3" />
                          {event.recurringPattern}
                        </span>
                      )}
                    </div>
                    <h3 className="text-white font-semibold text-base">{event.name}</h3>
                    <div className="flex items-center gap-4 mt-1.5 flex-wrap">
                      <span className="text-zinc-400 text-sm">
                        {format(new Date(event.date), "EEE, MMM d, yyyy · h:mm a")}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-1 flex-wrap">
                      <span className="flex items-center gap-1 text-zinc-500 text-xs">
                        <MapPin className="w-3 h-3" />
                        {event.address}
                      </span>
                      <span className="flex items-center gap-1 text-zinc-500 text-xs">
                        <Users className="w-3 h-3" />
                        ~{formatAttendance(event.estimatedAttendance)} attendees
                      </span>
                    </div>
                  </div>

                  {/* Score */}
                  <div
                    className={cn(
                      "text-xl font-bold w-12 h-12 rounded-xl border flex items-center justify-center flex-shrink-0",
                      scoreBg(event.brandFitScore)
                    )}
                  >
                    {event.brandFitScore}
                  </div>
                </div>

                {/* Activation idea */}
                <div className="mt-4 bg-zinc-800/50 rounded-lg p-3">
                  <p className="flex items-center gap-1.5 text-xs font-medium text-zinc-400 uppercase tracking-wide mb-1.5">
                    <Lightbulb className="w-3.5 h-3.5 text-yellow-400" />
                    Activation Idea
                  </p>
                  <p className="text-zinc-300 text-sm leading-relaxed">{event.activationIdea}</p>
                </div>

                {/* Permit notes */}
                <div className="mt-2 bg-amber-500/5 border border-amber-500/15 rounded-lg p-3">
                  <p className="flex items-center gap-1.5 text-xs font-medium text-amber-400/80 uppercase tracking-wide mb-1.5">
                    <TriangleAlert className="w-3.5 h-3.5" />
                    Logistics & Permits
                  </p>
                  <p className="text-zinc-400 text-xs leading-relaxed">{event.permitConsiderations}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="border-t border-zinc-800 px-5 py-3 flex items-center justify-between">
                <button
                  onClick={() => handleRemove(event.id)}
                  className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
                >
                  Move back to pending
                </button>
                <div className="flex items-center gap-2">
                  <a
                    href={event.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Source
                  </a>
                  <button
                    onClick={() => handleAddCalendar(event)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border transition-colors ${
                      event.calendarAdded
                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                        : "bg-blue-500/15 border-blue-500/30 text-blue-300 hover:bg-blue-500/25"
                    }`}
                  >
                    <CalendarPlus className="w-3.5 h-3.5" />
                    {event.calendarAdded ? "Added to Calendar" : "Add to Calendar"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
