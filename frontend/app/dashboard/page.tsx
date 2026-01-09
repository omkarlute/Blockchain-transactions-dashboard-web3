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
        glass-card neon-border rounded-2xl p-6 hover-glow transition-all
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
   Main Dashboard Page
------------------------------------------------------------------------ */
export default function DashboardPage() {
  const [stats, setStats] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

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
    root.classList.toggle("dark", theme === "dark");
    try {
      localStorage.setItem("theme", theme);
    } catch {}
  }, [theme]);

  /* FETCH STATS (SAFE, NO SEEDING) */
  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/stats`
        );
        if (!res.ok) throw new Error("Stats unavailable");
        const json = await res.json();
        setStats(json.data);
      } catch {
        setStats(null); // graceful fallback
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const safe = (v: any) => (v === undefined || v === null ? "—" : v);

  /* LOADING UI */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-cyan-50 dark:from-slate-950 dark:to-slate-900">
        <div className="text-cyan-600 dark:text-cyan-300 text-lg">
          Loading dashboard…
        </div>
      </div>
    );
  }

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
        <div className="flex flex-col md:flex-row items-center justify-between">
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
            <button
              onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
              className="
                px-6 py-2.5 rounded-xl
                glass-card hover-glow
                font-semibold border border-cyan-400/40 dark:border-cyan-500/40
              "
            >
              {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>

            <Link
              href="/transactions"
              className="
                px-6 py-2.5 rounded-xl font-bold shadow-lg
                text-white
                bg-gradient-to-r from-cyan-600 to-purple-600
                hover:from-cyan-500 hover:to-purple-500
                transition-all
              "
            >
              View Transactions →
            </Link>
          </div>
        </div>

        {/* TOP STATS */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <NeonCard title="Total Transactions" value={safe(stats?.totalTransactions)} />
          <NeonCard title="Total Volume" value={`${safe(stats?.totalVolume)} ETH`} />
          <NeonCard title="Success Rate" value={`${safe(stats?.successRate)}%`} />
          <NeonCard title="Average Amount" value={`${safe(stats?.averageAmount)} ETH`} />
        </div>

        {/* STATUS STATS */}
        <div className="grid gap-8 md:grid-cols-3">
          <NeonCard title="Pending" value={safe(stats?.pendingCount)} />
          <NeonCard title="Confirmed" value={safe(stats?.confirmedCount)} />
          <NeonCard title="Failed" value={safe(stats?.failedCount)} />
        </div>
      </div>
    </div>
  );
}
