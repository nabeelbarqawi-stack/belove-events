"use client";

import { useState, useEffect } from "react";
import { mockEvents } from "@/lib/mock-events";
import {
  Settings,
  Bell,
  MapPin,
  Sparkles,
  RefreshCw,
  CheckCircle,
  Key,
  Globe,
  Eye,
  EyeOff,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "belove_events";
const SETTINGS_KEY = "belove_settings";

interface SourceDef {
  key: string;
  label: string;
  tag: "API" | "Scrape";
  url: string;
  requiresKey?: boolean;
  disabled?: boolean;
  note?: string;
}

const ALL_SOURCES: SourceDef[] = [
  // APIs
  { key: "eventbrite",    label: "Eventbrite",                    tag: "API",    url: "https://www.eventbrite.com/platform/api", requiresKey: true },
  { key: "ticketmaster",  label: "Ticketmaster",                  tag: "API",    url: "https://developer.ticketmaster.com/",     requiresKey: true },
  // Free scrapers
  { key: "houston365",    label: "Houston365.com",                tag: "Scrape", url: "https://houston365.com/events/" },
  { key: "do713",         label: "Do713.com",                     tag: "Scrape", url: "https://do713.com/" },
  { key: "culturemap",    label: "CultureMap Houston",            tag: "Scrape", url: "https://houston.culturemap.com/" },
  { key: "discoverygreen",label: "Discovery Green",               tag: "Scrape", url: "https://www.discoverygreen.com/calendar" },
  { key: "miller",        label: "Miller Outdoor Theatre",        tag: "Scrape", url: "https://milleroutdoortheatre.com/performance/" },
  { key: "visithouston",  label: "Visit Houston",                 tag: "Scrape", url: "https://www.visithoustontx.com/events/" },
  { key: "houstonpress",  label: "Houston Press",                 tag: "Scrape", url: "https://www.houstonpress.com/calendar/" },
  { key: "spacecenter",   label: "Space Center Houston",          tag: "Scrape", url: "https://www.spacecenter.org/events/" },
  { key: "houstonzoo",    label: "Houston Zoo",                   tag: "Scrape", url: "https://www.houstonzoo.org/events/" },
  { key: "hmns",          label: "Houston Museum of Natural Sci.",tag: "Scrape", url: "https://www.hmns.org/events/" },
  { key: "nrgpark",       label: "NRG Park",                      tag: "Scrape", url: "https://www.nrgpark.com/events/" },
  { key: "houstonfirst",  label: "Houston First / GRB",           tag: "Scrape", url: "https://www.houstonfirst.com/events/" },
  { key: "allevents",     label: "AllEvents.in Houston",          tag: "Scrape", url: "https://allevents.in/houston/" },
  { key: "meetup",        label: "Meetup",                        tag: "Scrape", url: "https://www.meetup.com/find/?location=us--tx--houston" },
  { key: "facebook",      label: "Facebook Events",               tag: "Scrape", url: "https://www.facebook.com/events/", disabled: true, note: "Requires login" },
];

function loadSettings() {
  if (typeof window === "undefined") return null;
  try {
    const s = localStorage.getItem(SETTINGS_KEY);
    return s ? JSON.parse(s) : null;
  } catch { return null; }
}

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [city, setCity] = useState("Houston, TX");
  const [minScore, setMinScore] = useState(6);
  const [minAttendance, setMinAttendance] = useState(500);
  const [emailDigest, setEmailDigest] = useState(false);
  const [email, setEmail] = useState("");
  const [weeklyRun, setWeeklyRun] = useState(false);
  const [enabledSources, setEnabledSources] = useState<Record<string, boolean>>(
    Object.fromEntries(ALL_SOURCES.filter(s => !s.disabled).map(s => [s.key, true]))
  );
  const [eventbriteKey, setEventbriteKey] = useState("");
  const [ticketmasterKey, setTicketmasterKey] = useState("");
  const [showEbKey, setShowEbKey] = useState(false);
  const [showTmKey, setShowTmKey] = useState(false);

  useEffect(() => {
    const saved = loadSettings();
    if (!saved) return;
    if (saved.city) setCity(saved.city);
    if (saved.minScore) setMinScore(saved.minScore);
    if (saved.minAttendance) setMinAttendance(saved.minAttendance);
    if (saved.emailDigest !== undefined) setEmailDigest(saved.emailDigest);
    if (saved.email) setEmail(saved.email);
    if (saved.weeklyRun !== undefined) setWeeklyRun(saved.weeklyRun);
    if (saved.enabledSources) setEnabledSources(saved.enabledSources);
    if (saved.eventbriteKey) setEventbriteKey(saved.eventbriteKey);
    if (saved.ticketmasterKey) setTicketmasterKey(saved.ticketmasterKey);
  }, []);

  function handleSave() {
    const settings = { city, minScore, minAttendance, emailDigest, email, weeklyRun, enabledSources, eventbriteKey, ticketmasterKey };
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  function handleReset() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockEvents));
    window.location.href = "/";
  }

  function toggleSource(key: string) {
    setEnabledSources(prev => ({ ...prev, [key]: !prev[key] }));
  }

  const apiSources = ALL_SOURCES.filter(s => s.tag === "API");
  const scrapeSources = ALL_SOURCES.filter(s => s.tag === "Scrape");
  const enabledCount = Object.values(enabledSources).filter(Boolean).length;

  return (
    <div className="p-4 sm:p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-zinc-400 text-sm mt-0.5">Configure event discovery, data sources, and API keys</p>
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
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-zinc-500"
            />
          </div>
        </section>

        {/* API Keys */}
        <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-1">
            <Key className="w-4 h-4 text-rose-400" />
            <h2 className="text-white font-medium text-sm">API Keys</h2>
          </div>
          <p className="text-zinc-500 text-xs mb-4">
            Optional — enables richer event data from official APIs. Free tiers available.
          </p>

          {apiSources.map(({ key, label, url }) => {
            const isEb = key === "eventbrite";
            const val = isEb ? eventbriteKey : ticketmasterKey;
            const setVal = isEb ? setEventbriteKey : setTicketmasterKey;
            const show = isEb ? showEbKey : showTmKey;
            const setShow = isEb ? setShowEbKey : setShowTmKey;

            return (
              <div key={key} className="mb-3">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-zinc-300 text-xs font-medium">{label} API Key</label>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300"
                  >
                    Get key <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="relative">
                  <input
                    type={show ? "text" : "password"}
                    value={val}
                    onChange={(e) => setVal(e.target.value)}
                    placeholder={`Paste your ${label} key...`}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 pr-9 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-500 font-mono"
                  />
                  <button
                    onClick={() => setShow(!show)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-400"
                  >
                    {show ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            );
          })}

          <div className="mt-3 bg-zinc-800/50 border border-zinc-700/50 rounded-lg p-3">
            <p className="text-zinc-400 text-xs font-medium mb-1">For Vercel deployment:</p>
            <p className="text-zinc-500 text-xs">
              Add <code className="bg-zinc-700 px-1 rounded text-zinc-300">ANTHROPIC_API_KEY</code>,{" "}
              <code className="bg-zinc-700 px-1 rounded text-zinc-300">EVENTBRITE_API_KEY</code>, and{" "}
              <code className="bg-zinc-700 px-1 rounded text-zinc-300">TICKETMASTER_API_KEY</code>{" "}
              in your{" "}
              <a href="https://vercel.com/dashboard" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                Vercel project settings → Environment Variables
              </a>
              .
            </p>
          </div>
        </section>

        {/* Data Sources */}
        <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-rose-400" />
              <h2 className="text-white font-medium text-sm">Data Sources</h2>
            </div>
            <span className="text-zinc-500 text-xs">{enabledCount} enabled</span>
          </div>
          <p className="text-zinc-500 text-xs mb-4">
            Scrape sources require no API key and are enabled by default.
          </p>

          <div className="space-y-1">
            <p className="text-zinc-600 text-xs uppercase tracking-wide font-medium mb-2">Web Scrapers (Free)</p>
            {scrapeSources.map(({ key, label, url, disabled, note }) => (
              <div key={key} className="flex items-center justify-between py-1.5">
                <div className="flex items-center gap-2 min-w-0">
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-300 text-sm hover:text-white truncate"
                  >
                    {label}
                  </a>
                  {note && <span className="text-zinc-600 text-xs flex-shrink-0">({note})</span>}
                </div>
                <button
                  onClick={() => !disabled && toggleSource(key)}
                  disabled={disabled}
                  className={cn(
                    "relative w-9 h-5 rounded-full transition-colors flex-shrink-0",
                    !disabled && enabledSources[key] ? "bg-rose-500" : "bg-zinc-700",
                    disabled && "opacity-40 cursor-not-allowed"
                  )}
                >
                  <span className={cn(
                    "absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform",
                    !disabled && enabledSources[key] ? "translate-x-4" : ""
                  )} />
                </button>
              </div>
            ))}
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
              <input type="range" min={1} max={10} value={minScore}
                onChange={(e) => setMinScore(Number(e.target.value))}
                className="w-full accent-rose-500" />
              <div className="flex justify-between text-xs text-zinc-600 mt-1">
                <span>1 (Any)</span><span>5</span><span>7</span><span>10 (Perfect)</span>
              </div>
            </div>
            <div>
              <label className="text-zinc-400 text-xs mb-1.5 block">
                Minimum Attendance: <span className="text-white font-medium">{minAttendance.toLocaleString()}+</span>
              </label>
              <input type="range" min={100} max={10000} step={100} value={minAttendance}
                onChange={(e) => setMinAttendance(Number(e.target.value))}
                className="w-full accent-rose-500" />
              <div className="flex justify-between text-xs text-zinc-600 mt-1">
                <span>100</span><span>2,500</span><span>5,000</span><span>10,000+</span>
              </div>
            </div>
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
              <button onClick={() => setWeeklyRun(!weeklyRun)}
                className={cn("relative w-9 h-5 rounded-full transition-colors", weeklyRun ? "bg-rose-500" : "bg-zinc-700")}>
                <span className={cn("absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform", weeklyRun ? "translate-x-4" : "")} />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-300 text-sm">Weekly Email Digest</p>
                <p className="text-zinc-600 text-xs">Send top 10 events to your inbox</p>
              </div>
              <button onClick={() => setEmailDigest(!emailDigest)}
                className={cn("relative w-9 h-5 rounded-full transition-colors", emailDigest ? "bg-rose-500" : "bg-zinc-700")}>
                <span className={cn("absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform", emailDigest ? "translate-x-4" : "")} />
              </button>
            </div>
            {emailDigest && (
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="you@belove.com"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500" />
            )}
          </div>
        </section>

        {/* Brand Profile */}
        <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-4 h-4 text-rose-400" />
            <h2 className="text-white font-medium text-sm">Brand Profile</h2>
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-zinc-400 text-xs mb-1.5 block">Brand Name</label>
              <input type="text" defaultValue="Be Love"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-zinc-500" />
            </div>
            <div>
              <label className="text-zinc-400 text-xs mb-1.5 block">Target Audience</label>
              <input type="text" defaultValue="Health-conscious adults 21–35, wellness-oriented"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-zinc-500" />
            </div>
            <div>
              <label className="text-zinc-400 text-xs mb-1.5 block">Brand Values (used for AI scoring)</label>
              <textarea rows={3} defaultValue="Health, love, wellness, community, natural ingredients, active lifestyle"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-zinc-500 resize-none" />
            </div>
          </div>
        </section>

        {/* Actions */}
        <div className="flex items-center gap-3 flex-wrap">
          <button onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 text-sm rounded-lg transition-colors">
            {saved ? <><CheckCircle className="w-4 h-4" />Saved!</> : <><Settings className="w-4 h-4" />Save Settings</>}
          </button>
          <button onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-400 text-sm rounded-lg transition-colors">
            <RefreshCw className="w-4 h-4" />Reset Demo Data
          </button>
        </div>
      </div>
    </div>
  );
}
