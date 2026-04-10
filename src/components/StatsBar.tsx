"use client";

import { BeLoveEvent } from "@/lib/types";
import { formatAttendance } from "@/lib/utils";
import { TrendingUp, CheckCircle, Clock, Users } from "lucide-react";

interface Props {
  events: BeLoveEvent[];
}

export default function StatsBar({ events }: Props) {
  const approved = events.filter((e) => e.status === "approved").length;
  const pending = events.filter((e) => e.status === "pending").length;
  const totalReach = events
    .filter((e) => e.status === "approved")
    .reduce((sum, e) => sum + e.estimatedAttendance, 0);
  const avgScore =
    events.length > 0
      ? (events.reduce((s, e) => s + e.brandFitScore, 0) / events.length).toFixed(1)
      : "0";

  const stats = [
    {
      label: "Total Events",
      value: events.length,
      icon: TrendingUp,
      color: "text-rose-400",
      bg: "bg-rose-500/10",
    },
    {
      label: "Approved",
      value: approved,
      icon: CheckCircle,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Pending Review",
      value: pending,
      icon: Clock,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
    },
    {
      label: "Approved Reach",
      value: formatAttendance(totalReach),
      icon: Users,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {stats.map(({ label, value, icon: Icon, color, bg }) => (
        <div
          key={label}
          className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex items-center gap-3"
        >
          <div className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center flex-shrink-0`}>
            <Icon className={`w-4 h-4 ${color}`} />
          </div>
          <div>
            <p className="text-white font-semibold text-lg leading-none">{value}</p>
            <p className="text-zinc-500 text-xs mt-0.5">{label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
