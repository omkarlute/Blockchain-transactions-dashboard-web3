"use client";

import "../styles/neon-theme.css";
import { useEffect, useState } from "react";
import Link from "next/link";

/* ---------------------------------------------------------------------
   Reusable Neon Glass Card
------------------------------------------------------------------------ */
function NeonCard({
  title,
  value,
  accent,
}: {
  title: string;
  value: any;
  accent?: string;
}) {
  return (
    <div
      className="
        glass-card neon-border rounded-2xl p-6 hover-glow transition-all duration-300
        text-slate-900 dark:text-white
      "
      style={{
        boxShadow: accent ? `0 0 22px ${accent}` : undefined,
      }}
    >
      <div className="text-sm font-semibold text-cyan-700 dark:text-cyan-300 mb-2">
        {title}
      </div>

      <div
        className="
          text-3xl font-black
          bg-gradient-to-r from-cyan-600 to-purple-600
          dark:from-cyan-300 dark:to-purple-300
          bg-clip-text text-transparent
        "
      >
        {value}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------
   Main Dashboard Page (UI-ONLY, NO API CALLS)
------------------------------------------------------------------------ */
export default function DashboardPage() {
  /* THEME TOGGLE */
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "dark";
    return (
      (localStorage.getItem("theme") as "light" | "dark") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light")
    );
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    try {
      localStorage.setItem("theme", theme);
    } catch {}
  }, [theme]);

  /* STATIC DASHBOARD STATS (SAFE PLACEHOLDERS) */
  const stats = {
    totalTransactions: "—",
    totalVolume: "—",
    successRate: "—",
    averageAmount: "—",
    pendingCount: "—",
    confirmedCount: "—",
    failedCount: "—",
  };

  /* MAIN UI */
  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-slate-50 via-cyan-50 to-purple-50
        dark:from-slate-950 dark:via-purple-950 dark:to-slate-950
        text-slate-900 dark:text-white
      "
    >
      <div className="container mx-auto px-4 py-12 space-y-12">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row items-center justify-between slide-up">
          <div>
            <h1
              className="
                text-5xl font-black
                bg-gradient-to-r from-cyan-600 to-purple-600
                dark:from-cyan-400 dark:to-purple-400
                bg-clip-text text-transparent
              "
            >
              Dashboard
            </h1>

            <p className="text-cyan-700 dark:text-cyan-300/70 mt-2 text-lg">
              Overview of your blockchain activity
            </p>
          </div>

          <div className="flex items-center gap-4 mt-6 md:mt-0">
            {/* Theme Toggle */}
            <button
              onClick={() =>
                setTheme((t) => (t === "light" ? "dark" : "light"))
              }
              className="
                px-6 py-2.5 rounded-xl
                glass-card hover-glow
                font-semibold border border-cyan-400/40 dark:border-cyan-500/40
                transition-all
              "
            >
              {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>

            {/* View Transactions */}
            <Link
              href="/transactions"
              className="
                px-6 py-2.5 rounded-xl font-bold shadow-lg
                text-white
                bg-gradient-to-r from-cyan-600 to-purple-600
                hover:from-cyan-500 hover:to-purple-500
                transition-all
              "
              style={{ boxShadow: "0 0 25px rgba(6,182,212,0.45)" }}
            >
              View Transactions →
            </Link>
          </div>
        </div>

        {/* TOP STATS */}
        <div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 slide-up"
          style={{ animationDelay: "0.1s" }}
        >
          <NeonCard title="Total Transactions" value={stats.totalTransactions} />
          <NeonCard
            title="Total Volume"
            value={`${stats.totalVolume} ETH`}
            accent="rgba(168,85,247,0.35)"
          />
          <NeonCard
            title="Success Rate"
            value={`${stats.successRate}%`}
            accent="rgba(34,197,94,0.4)"
          />
          <NeonCard
            title="Average Amount"
            value={`${stats.averageAmount} ETH`}
            accent="rgba(236,72,153,0.35)"
          />
        </div>

        {/* BOTTOM STATUS CARDS */}
        <div
          className="grid gap-8 md:grid-cols-3 slide-up"
          style={{ animationDelay: "0.2s" }}
        >
          <NeonCard
            title="Pending"
            value={stats.pendingCount}
            accent="rgba(234,179,8,0.45)"
          />
          <NeonCard
            title="Confirmed"
            value={stats.confirmedCount}
            accent="rgba(34,197,94,0.45)"
          />
          <NeonCard
            title="Failed"
            value={stats.failedCount}
            accent="rgba(239,68,68,0.5)"
          />
        </div>
      </div>
    </div>
  );
}
