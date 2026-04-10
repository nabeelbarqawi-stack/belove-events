"use client";

import { BeLoveEvent } from "@/lib/types";
import {
  cn,
  scoreBg,
  viabilityColor,
  statusConfig,
  formatAttendance,
  eventTypeIcon,
  downloadICS,
} from "@/lib/utils";
import { format } from "date-fns";
import {
  MapPin,
  Users,
  ExternalLink,
  CalendarPlus,
  Check,
  X,
  Bookmark,
  Sun,
  RefreshCw,
  Lightbulb,
  TriangleAlert,
} from "lucide-react";
import { useState } from "react";

interface Props {
  event: BeLoveEvent;
  onApprove?: (id: string) => void;
  onSkip?: (id: string) => void;
  onSave?: (id: string) => void;
  onAddCalendar?: (id: string) => void;
  showActions?: boolean;
  compact?: boolean;
}

export default function EventCard({
  event,
  onApprove,
  onSkip,
  onSave,
  onAddCalendar,
  showActions = true,
  compact = false,
}: Props) {
  const [expanded, setExpanded] = useState(false);
  const status = statusConfig(event.status);

  function handleCalendar() {
    downloadICS(event);
    onAddCalendar?.(event.id);
  }

  return (
    <div
      className={cn(
        "bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden transition-all hover:border-zinc-700",
        event.status === "skipped" && "opacity-50"
      )}
    >
      {/* Header row */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-base">{eventTypeIcon(event.eventType)}</span>
              <span className="text-zinc-400 text-xs">{event.eventType}</span>
              {event.isRecurring && (
                <span className="flex items-center gap-1 text-xs text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full px-2 py-0.5">
                  <RefreshCw className="w-3 h-3" />
                  {event.recurringPattern || "Recurring"}
                </span>
              )}
              {event.isOutdoor && (
                <span className="flex items-center gap-1 text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-full px-2 py-0.5">
                  <Sun className="w-3 h-3" />
                  Outdoor
                </span>
              )}
            </div>
            <h3 className="text-white font-semibold text-sm leading-snug line-clamp-1">
              {event.name}
            </h3>
            <div className="flex items-center gap-3 mt-1.5 flex-wrap">
              <span className="text-zinc-400 text-xs">
                {format(new Date(event.date), "MMM d, yyyy · h:mm a")}
              </span>
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

          {/* Score */}
          <div className="flex flex-col items-end gap-2 flex-shrink-0">
            <div
              className={cn(
                "text-lg font-bold w-10 h-10 rounded-lg border flex items-center justify-center",
                scoreBg(event.brandFitScore)
              )}
            >
              {event.brandFitScore}
            </div>
            <span
              className={cn(
                "text-xs px-2 py-0.5 rounded-full border",
                status.color
              )}
            >
              {status.label}
            </span>
          </div>
        </div>

        {/* Reasoning snippet */}
        {!compact && (
          <p className="text-zinc-400 text-xs mt-2 leading-relaxed line-clamp-2">
            {event.reasoning}
          </p>
        )}

        {/* Badges */}
        <div className="flex items-center gap-2 mt-2 flex-wrap">
          <span
            className={cn(
              "text-xs px-2 py-0.5 rounded-full border",
              viabilityColor(event.samplingViability)
            )}
          >
            {event.samplingViability} Viability
          </span>
          <span className="text-zinc-500 text-xs">{event.source}</span>
          {event.calendarAdded && (
            <span className="flex items-center gap-1 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2 py-0.5">
              <Check className="w-3 h-3" /> Calendar Added
            </span>
          )}
        </div>
      </div>

      {/* Expanded details */}
      {expanded && (
        <div className="border-t border-zinc-800 px-4 py-3 space-y-3">
          <div>
            <p className="text-zinc-500 text-xs font-medium uppercase tracking-wide mb-1">
              Audience Fit
            </p>
            <p className="text-zinc-300 text-xs">{event.audienceFit}</p>
          </div>
          <div>
            <p className="text-zinc-500 text-xs font-medium uppercase tracking-wide mb-1 flex items-center gap-1">
              <Lightbulb className="w-3 h-3" /> Activation Idea
            </p>
            <p className="text-zinc-300 text-xs leading-relaxed">
              {event.activationIdea}
            </p>
          </div>
          <div>
            <p className="text-zinc-500 text-xs font-medium uppercase tracking-wide mb-1 flex items-center gap-1">
              <TriangleAlert className="w-3 h-3" /> Logistics & Permits
            </p>
            <p className="text-zinc-300 text-xs leading-relaxed">
              {event.permitConsiderations}
            </p>
          </div>
          <div>
            <p className="text-zinc-500 text-xs font-medium uppercase tracking-wide mb-1">
              Address
            </p>
            <p className="text-zinc-300 text-xs">{event.address}</p>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="border-t border-zinc-800 px-4 py-2.5 flex flex-wrap items-center justify-between gap-2">
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          {expanded ? "Hide details" : "View details"}
        </button>

        <div className="flex items-center gap-1.5">
          <a
            href={event.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 text-zinc-500 hover:text-zinc-300 transition-colors"
            title="Open source"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {showActions && event.status !== "skipped" && (
            <>
              <button
                onClick={handleCalendar}
                className="p-1.5 text-zinc-500 hover:text-blue-400 transition-colors"
                title="Add to Calendar"
              >
                <CalendarPlus className="w-3.5 h-3.5" />
              </button>

              {event.status !== "saved" && event.status !== "approved" && (
                <button
                  onClick={() => onSave?.(event.id)}
                  className="p-1.5 text-zinc-500 hover:text-blue-400 transition-colors"
                  title="Save for later"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                </button>
              )}

              {event.status !== "approved" && (
                <button
                  onClick={() => onApprove?.(event.id)}
                  className="flex items-center gap-1 px-2.5 py-1 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs rounded-lg transition-colors"
                >
                  <Check className="w-3 h-3" /> Approve
                </button>
              )}

              {event.status !== "approved" && (
                <button
                  onClick={() => onSkip?.(event.id)}
                  className="flex items-center gap-1 px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-400 text-xs rounded-lg transition-colors"
                >
                  <X className="w-3 h-3" /> Skip
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
