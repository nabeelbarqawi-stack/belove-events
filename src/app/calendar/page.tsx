"use client";

import { useState, useEffect } from "react";
import { BeLoveEvent } from "@/lib/types";
import { mockEvents } from "@/lib/mock-events";
import { downloadAllICS, downloadICS, formatAttendance, eventTypeIcon, cn } from "@/lib/utils";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth, addMonths, subMonths, isToday } from "date-fns";
import { ChevronLeft, ChevronRight, Download, CalendarPlus, MapPin, Users } from "lucide-react";

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

export default function CalendarPage() {
  const [events, setEvents] = useState<BeLoveEvent[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  useEffect(() => {
    setEvents(loadEvents());
  }, []);

  function mutate(updated: BeLoveEvent[]) {
    setEvents(updated);
    saveEvents(updated);
  }

  function handleAddCalendar(event: BeLoveEvent) {
    downloadICS(event);
    mutate(events.map((e) => (e.id === event.id ? { ...e, calendarAdded: true } : e)));
  }

  const approved = events.filter((e) => e.status === "approved");

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Pad start with empty cells
  const startDayOfWeek = monthStart.getDay();
  const paddedDays = [...Array(startDayOfWeek).fill(null), ...days];

  function eventsOnDay(day: Date) {
    return approved.filter((e) => isSameDay(new Date(e.date), day));
  }

  const selectedDayEvents = selectedDay ? eventsOnDay(selectedDay) : [];

  // Upcoming events (next 60 days)
  const upcoming = approved
    .filter((e) => new Date(e.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 6);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Calendar</h1>
          <p className="text-zinc-400 text-sm mt-0.5">
            {approved.length} approved events · {approved.filter(e => e.calendarAdded).length} added to calendar
          </p>
        </div>
        {approved.length > 0 && (
          <button
            onClick={() => downloadAllICS(approved)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/30 text-blue-300 text-sm rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            Export All (.ics)
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Calendar grid */}
        <div className="lg:col-span-3">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
            {/* Month nav */}
            <div className="flex items-center justify-between p-4 border-b border-zinc-800">
              <button
                onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <h2 className="text-white font-semibold text-sm">
                {format(currentMonth, "MMMM yyyy")}
              </h2>
              <button
                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 border-b border-zinc-800">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                <div key={d} className="py-2 text-center text-xs text-zinc-600 font-medium">
                  {d}
                </div>
              ))}
            </div>

            {/* Days grid */}
            <div className="grid grid-cols-7">
              {paddedDays.map((day, i) => {
                if (!day) {
                  return <div key={`empty-${i}`} className="h-14 border-b border-r border-zinc-800/50" />;
                }
                const dayEvents = eventsOnDay(day);
                const isSelected = selectedDay ? isSameDay(day, selectedDay) : false;
                const today = isToday(day);
                const inMonth = isSameMonth(day, currentMonth);

                return (
                  <button
                    key={day.toISOString()}
                    onClick={() => setSelectedDay(isSelected ? null : day)}
                    className={cn(
                      "h-14 p-1.5 text-left border-b border-r border-zinc-800/50 transition-colors relative",
                      !inMonth && "opacity-30",
                      isSelected && "bg-rose-500/10",
                      !isSelected && "hover:bg-zinc-800/50"
                    )}
                  >
                    <span
                      className={cn(
                        "text-xs w-6 h-6 flex items-center justify-center rounded-full",
                        today ? "bg-rose-500 text-white font-semibold" : "text-zinc-400"
                      )}
                    >
                      {format(day, "d")}
                    </span>
                    {dayEvents.length > 0 && (
                      <div className="flex flex-wrap gap-0.5 mt-0.5">
                        {dayEvents.slice(0, 2).map((e) => (
                          <span
                            key={e.id}
                            className="text-[9px] bg-rose-500/30 text-rose-300 rounded px-1 truncate max-w-full block"
                          >
                            {e.name.split(" ")[0]}
                          </span>
                        ))}
                        {dayEvents.length > 2 && (
                          <span className="text-[9px] text-zinc-600">+{dayEvents.length - 2}</span>
                        )}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected day events */}
          {selectedDay && (
            <div className="mt-3 bg-zinc-900 border border-zinc-800 rounded-xl p-4">
              <h3 className="text-white font-medium text-sm mb-3">
                {format(selectedDay, "EEEE, MMMM d")}
              </h3>
              {selectedDayEvents.length === 0 ? (
                <p className="text-zinc-500 text-sm">No approved events on this day.</p>
              ) : (
                <div className="space-y-2">
                  {selectedDayEvents.map((event) => (
                    <div key={event.id} className="flex items-center justify-between gap-3 bg-zinc-800 rounded-lg p-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{eventTypeIcon(event.eventType)}</span>
                          <p className="text-white text-sm font-medium truncate">{event.name}</p>
                        </div>
                        <p className="text-zinc-500 text-xs mt-0.5">{format(new Date(event.date), "h:mm a")} · {event.location}</p>
                      </div>
                      <button
                        onClick={() => handleAddCalendar(event)}
                        className={cn(
                          "flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg border transition-colors flex-shrink-0",
                          event.calendarAdded
                            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                            : "bg-blue-500/15 border-blue-500/30 text-blue-300"
                        )}
                      >
                        <CalendarPlus className="w-3 h-3" />
                        {event.calendarAdded ? "Added" : "Add"}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Upcoming sidebar */}
        <div className="lg:col-span-2">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-zinc-800">
              <h3 className="text-white font-semibold text-sm">Upcoming Events</h3>
              <p className="text-zinc-500 text-xs mt-0.5">Next activations</p>
            </div>
            {upcoming.length === 0 ? (
              <div className="p-6 text-center">
                <p className="text-zinc-500 text-sm">No upcoming approved events.</p>
              </div>
            ) : (
              <div className="divide-y divide-zinc-800">
                {upcoming.map((event) => (
                  <div key={event.id} className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium leading-snug line-clamp-1">
                          {event.name}
                        </p>
                        <p className="text-rose-400 text-xs mt-0.5 font-medium">
                          {format(new Date(event.date), "MMM d")}
                        </p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="flex items-center gap-1 text-zinc-500 text-xs">
                            <MapPin className="w-3 h-3" />
                            {event.location}
                          </span>
                          <span className="flex items-center gap-1 text-zinc-500 text-xs">
                            <Users className="w-3 h-3" />
                            {formatAttendance(event.estimatedAttendance)}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleAddCalendar(event)}
                        className={cn(
                          "p-1.5 rounded-lg border flex-shrink-0 transition-colors",
                          event.calendarAdded
                            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                            : "bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-blue-400"
                        )}
                        title={event.calendarAdded ? "Added" : "Add to Calendar"}
                      >
                        <CalendarPlus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
