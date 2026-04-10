"use client";

import { useState, useCallback } from "react";
import { BeLoveEvent, EventStatus } from "./types";
import { mockEvents } from "./mock-events";

// Simple in-memory store with localStorage persistence
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
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  } catch {}
}

let _events: BeLoveEvent[] = mockEvents;
let _listeners: Array<() => void> = [];

function notify() {
  _listeners.forEach((fn) => fn());
}

export function initStore() {
  _events = loadEvents();
}

export function getEvents() {
  return _events;
}

export function updateEventStatus(id: string, status: EventStatus) {
  _events = _events.map((e) =>
    e.id === id ? { ...e, status, calendarAdded: status === "approved" ? e.calendarAdded : e.calendarAdded } : e
  );
  saveEvents(_events);
  notify();
}

export function markCalendarAdded(id: string) {
  _events = _events.map((e) =>
    e.id === id ? { ...e, calendarAdded: true } : e
  );
  saveEvents(_events);
  notify();
}

export function addEvents(newEvents: BeLoveEvent[]) {
  _events = [..._events, ...newEvents];
  saveEvents(_events);
  notify();
}

export function resetToMock() {
  _events = [...mockEvents];
  saveEvents(_events);
  notify();
}

export function subscribe(fn: () => void) {
  _listeners.push(fn);
  return () => {
    _listeners = _listeners.filter((l) => l !== fn);
  };
}

// React hook
export function useEvents() {
  const [events, setEvents] = useState<BeLoveEvent[]>(() => {
    if (typeof window !== "undefined") {
      return loadEvents();
    }
    return mockEvents;
  });

  const refresh = useCallback(() => {
    setEvents([..._events]);
  }, []);

  return { events, refresh };
}
