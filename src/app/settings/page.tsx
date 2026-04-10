"use client";

import { useState } from "react";
import { mockEvents } from "@/lib/mock-events";
import {
  Settings,
  Bell,
  MapPin,
  Sparkles,
  RefreshCw,
  CheckCircle,
  Key,
} from "lucide-react";

const STORAGE_KEY = "belove_events";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [city, setCity] = useState("Houston, TX");
  const [minScore, setMinScore] = useState(7);
  const [minAttendance, setMinAttendance] = useState(500);
  const [emailDigest, setEmailDigest] = useState(true);
  const [weeklyRun, setWeeklyRun] = useState(true);
  const [sources, setSources] = useState({
    eventbrite: true,
    meetup: true,
    ticketmaster: true,
    houston365: true,
    do713: true,
    culturemap: true,
    facebook: false,
  });

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  function handleReset() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockEvents));
    window.location.href = "/";
  }

  function toggleSource(key: keyof typeof sources) {
    setSources((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  const sourceList: { key: keyof typeof sources; label: string; tag: string; disabled?: boolean }[] = [
    { key: "eventbrite", label: "Eventbrite", tag: "API" },
    { key: "meetup", label: "Meetup", tag: "API" },
    { key: "ticketmaster", label: "Ticketmaster", tag: "API" },
    { key: "houston365", label: "Houston365.com", tag: "Scrape" },
    { key: "do713", label: "Do713.com", tag: "Scrape" },
    { key: "culturemap", label: "CultureMap Houston", tag: "Scrape" },
    { key: "facebook", label: "Facebook Events", tag: "Scrape", disabled: true },
  ];

  return (
    <div className="p-4 sm:p-6 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-zinc-400 text-sm mt-0.5">Configure your event discovery preferences</p>
      </div>

      <div className="space-y-5">
        {/* Location */}
        <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-4 h-4 text-rose-400" />
            <h2 className="text-white font-medium text-sm">Location</h2>
          </div>
          <div>
            <label className="text-zinc-400 text-xs mb-1.5 block">Target City</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
            />
          </div>
        </section>

        {/* Scoring Thresholds */}
        <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-rose-400" />
            <h2 className="text-white font-medium text-sm">Scoring Thresholds</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-zinc-400 text-xs mb-1.5 block">
                Minimum Brand Fit Score: <span className="text-white font-medium">{minScore}/10</span>
              </label>
              <input
                type="range"
                min={1}
                max={10}
                value={minScore}
                onChange={(e) => setMinScore(Number(e.target.value))}
                className="w-full accent-rose-500"
              />
              <div className="flex justify-between text-xs text-zinc-600 mt-1">
                <span>1 (Any)</span>
                <span>5 (Moderate)</span>
                <span>7 (Good)</span>
                <span>10 (Perfect)</span>
              </div>
            </div>
            <div>
              <label className="text-zinc-400 text-xs mb-1.5 block">
                Minimum Attendance: <span className="text-white font-medium">{minAttendance.toLocaleString()}+</span>
              </label>
              <input
                type="range"
                min={100}
                max={10000}
                step={100}
                value={minAttendance}
                onChange={(e) => setMinAttendance(Number(e.target.value))}
                className="w-full accent-rose-500"
              />
              <div className="flex justify-between text-xs text-zinc-600 mt-1">
                <span>100</span>
                <span>2,500</span>
                <span>5,000</span>
                <span>10,000+</span>
              </div>
            </div>
          </div>
        </section>

        {/* Data Sources */}
        <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Key className="w-4 h-4 text-rose-400" />
            <h2 className="text-white font-medium text-sm">Data Sources</h2>
          </div>
          <div className="space-y-2">
            {sourceList.map(({ key, label, tag, disabled }) => (
              <div key={key} className="flex items-center justify-between py-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-zinc-300 text-sm">{label}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded text-xs ${
                    tag === "API"
                      ? "bg-blue-500/15 text-blue-400 border border-blue-500/20"
                      : "bg-purple-500/15 text-purple-400 border border-purple-500/20"
                  }`}>
                    {tag}
                  </span>
                  {disabled && (
                    <span className="text-xs text-zinc-600">(requires login)</span>
                  )}
                </div>
                <button
                  onClick={() => !disabled && toggleSource(key as keyof typeof sources)}
                  disabled={disabled}
                  className={`relative w-10 h-5 rounded-full transition-colors ${
                    sources[key as keyof typeof sources] && !disabled
                      ? "bg-rose-500"
                      : "bg-zinc-700"
                  } ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                      sources[key as keyof typeof sources] && !disabled ? "translate-x-5" : ""
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Automation */}
        <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <RefreshCw className="w-4 h-4 text-rose-400" />
            <h2 className="text-white font-medium text-sm">Automation</h2>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-300 text-sm">Weekly Auto-Scan</p>
                <p className="text-zinc-600 text-xs">Run discovery every Monday at 8AM</p>
              </div>
              <button
                onClick={() => setWeeklyRun(!weeklyRun)}
                className={`relative w-10 h-5 rounded-full transition-colors ${weeklyRun ? "bg-rose-500" : "bg-zinc-700"}`}
              >
                <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${weeklyRun ? "translate-x-5" : ""}`} />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-300 text-sm">Weekly Email Digest</p>
                <p className="text-zinc-600 text-xs">Send top 10 events to your inbox</p>
              </div>
              <button
                onClick={() => setEmailDigest(!emailDigest)}
                className={`relative w-10 h-5 rounded-full transition-colors ${emailDigest ? "bg-rose-500" : "bg-zinc-700"}`}
              >
                <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${emailDigest ? "translate-x-5" : ""}`} />
              </button>
            </div>
            {emailDigest && (
              <div>
                <label className="text-zinc-400 text-xs mb-1.5 block">Email Address</label>
                <input
                  type="email"
                  placeholder="you@belove.com"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
                />
              </div>
            )}
          </div>
        </section>

        {/* Notifications */}
        <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-4 h-4 text-rose-400" />
            <h2 className="text-white font-medium text-sm">Brand Profile</h2>
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-zinc-400 text-xs mb-1.5 block">Brand Name</label>
              <input
                type="text"
                defaultValue="Be Love"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-zinc-500"
              />
            </div>
            <div>
              <label className="text-zinc-400 text-xs mb-1.5 block">Target Audience</label>
              <input
                type="text"
                defaultValue="Health-conscious adults 21–35, wellness-oriented"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-zinc-500"
              />
            </div>
            <div>
              <label className="text-zinc-400 text-xs mb-1.5 block">Brand Values (used for AI scoring)</label>
              <textarea
                rows={3}
                defaultValue="Health, love, wellness, community, natural ingredients, active lifestyle"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-zinc-500 resize-none"
              />
            </div>
          </div>
        </section>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 text-sm rounded-lg transition-colors"
          >
            {saved ? (
              <>
                <CheckCircle className="w-4 h-4" />
                Saved!
              </>
            ) : (
              <>
                <Settings className="w-4 h-4" />
                Save Settings
              </>
            )}
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-400 text-sm rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Reset Demo Data
          </button>
        </div>
      </div>
    </div>
  );
}
