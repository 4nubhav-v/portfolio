"use client";

import { useEffect, useState } from "react";

/**
 * PulseConnector
 * ----------------
 * A standalone connector-only component: a line with a comet-style
 * trailing streak continuously sweeping from start -> end, plus a ping
 * ripple at the end when the streak arrives. Renders NO node boxes —
 * drop your own divs on either side.
 *
 * Theme support: all default colors are Tailwind `dark:` pairs, so the
 * component automatically adapts to Tailwind's class-based dark mode
 * (i.e. a `dark` class on <html> or an ancestor). A minimal ThemeToggle
 * is included at the bottom for local testing/demo purposes — swap it
 * for your app's existing theme toggle if you have one.
 *
 * Usage:
 *
 *   <div className="flex items-center gap-2">
 *     <div className="w-24 h-24 rounded-2xl bg-indigo-500">A</div>
 *     <PulseConnector orientation="horizontal" length={160} />
 *     <div className="w-24 h-24 rounded-2xl bg-emerald-500">B</div>
 *   </div>
 *
 *   <div className="flex flex-col items-center gap-2">
 *     <div className="w-24 h-24 rounded-2xl bg-indigo-500">A</div>
 *     <PulseConnector orientation="vertical" length={160} />
 *     <div className="w-24 h-24 rounded-2xl bg-emerald-500">B</div>
 *   </div>
 *
 * Dependencies: React + Tailwind CSS only (no extra packages).
 * Requires Tailwind's dark mode strategy set to "class" for dark: variants
 * to respond to a toggle instead of the OS preference:
 *   // tailwind.config.js
 *   module.exports = { darkMode: "class", ... }
 */

export type PulseConnectorOrientation = "horizontal" | "vertical";

export interface PulseConnectorProps {
  /** Direction the pulse travels in. Default: "horizontal". */
  orientation?: PulseConnectorOrientation;
  /** Length of the connector line in pixels. Default: 160. */
  length?: number;
  /** Length of the trailing streak in pixels. Default: 56. */
  streakLength?: number;
  /** Thickness of the track/streak in pixels. Default: 4. */
  thickness?: number;
  /** Number of streaks traveling along the line at once. Default: 1. */
  streakCount?: number;
  /** Time (ms) for one streak to travel start -> end. Default: 1800. */
  durationMs?: number;
  /** Tailwind color classes for the line track (supports dark: pairs). */
  trackColorClassName?: string;
  /** Tailwind color classes for the streak's leading edge (supports dark: pairs). */
  streakColorClassName?: string;
  /** Tailwind color classes for the end-arrival ping (supports dark: pairs). */
  pingColorClassName?: string;
  /** Show the arrowhead pointing toward the end node. Default: true. */
  showArrow?: boolean;
  /** Show the ping ripple when the streak arrives at the end. Default: true. */
  /** Extra classes applied to the outer wrapper. */
  className?: string;
}

export default function PulseConnector({
  orientation = "horizontal",
  length = 160,
  streakLength = 56,
  thickness = 4,
  streakCount = 1,
  durationMs = 3600,
  trackColorClassName = "bg-neutral-400 dark:bg-neutral-800",
  streakColorClassName = "bg-green-500 dark:bg-cyan-400",
  showArrow = true,
  className = "",
}: PulseConnectorProps) {
  const staggerMs = durationMs / streakCount;
  const isHorizontal = orientation === "horizontal";

  // Trigger the end-of-line ping every time a streak completes its travel.

  const trackSizeStyle = isHorizontal ? { width: length } : { height: length };

  return (
    <div
      className={`relative flex items-center justify-center ${
        isHorizontal ? "flex-row" : "flex-col"
      } ${className}`}
      style={trackSizeStyle}
    >
      {/* Local keyframes. The streak travels a full extra `streakLength` off each
          end so it sweeps fully into and out of view (comet effect via gradient,
          not a fixed dot). */}
      <style>{`
        @keyframes sweep-horizontal {
          0%   { transform: translateX(-100%); opacity: 0; }
          8%   { opacity: 1; }
          92%  { opacity: 1; }
          100% { transform: translateX(${length + streakLength}px); opacity: 0; }
        }
        @keyframes sweep-vertical {
          0%   { transform: translateY(-100%); opacity: 0; }
          8%   { opacity: 1; }
          92%  { opacity: 1; }
          100% { transform: translateY(${length + streakLength}px); opacity: 0; }
        }
      `}</style>

      {/* Track line */}
      <div
        className={`relative overflow-hidden rounded-full ${trackColorClassName}`}
        style={
          isHorizontal
            ? { width: length, height: thickness }
            : { height: length, width: thickness }
        }
      >
        {Array.from({ length: streakCount }).map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full ${
              isHorizontal ? "top-0 left-0 h-full" : "top-0 left-0 w-full"
            }`}
            style={{
              ...(isHorizontal
                ? { width: streakLength, height: thickness }
                : { height: streakLength, width: thickness }),
              animation: `${isHorizontal ? "sweep-horizontal" : "sweep-vertical"} ${durationMs}ms linear infinite`,
              animationDelay: `${i * staggerMs}ms`,
              background: isHorizontal
                ? `linear-gradient(to right, transparent, currentColor)`
                : `linear-gradient(to bottom, transparent, currentColor)`,
            }}
          >
            {/* currentColor source — keeps the gradient theme-aware via Tailwind's dark: text color pairing */}
            <span
              className={`sr-only ${streakColorClassName.replace(/bg-/g, "text-")}`}
            />
          </div>
        ))}
      </div>

      {/* Arrowhead pointing toward the end node — reuses the track color */}
      {showArrow &&
        (isHorizontal ? (
          <div
            className={`-ml-px h-0 w-0 border-t-[6px] border-b-[6px] border-l-8 border-t-transparent border-b-transparent ${trackColorClassName
              .split(" ")
              .map((c) => c.replace("bg-", "border-l-"))
              .join(" ")}`}
          />
        ) : (
          <div
            className={`-mt-px h-0 w-0 border-t-8 border-r-[6px] border-l-[6px] border-r-transparent border-l-transparent ${trackColorClassName
              .split(" ")
              .map((c) => c.replace("bg-", "border-t-"))
              .join(" ")}`}
          />
        ))}
    </div>
  );
}

/**
 * ThemeToggle (optional demo helper)
 * -----------------------------------
 * Minimal light/dark toggle for testing PulseConnector's theme support.
 * Toggles a `dark` class on <html>. Replace with your app's real theme
 * provider (e.g. next-themes) in production — this is intentionally bare.
 */
export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return (
    <button
      type="button"
      onClick={() => setIsDark((prev) => !prev)}
      className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
    >
      {isDark ? "☀ Light mode" : "🌙 Dark mode"}
    </button>
  );
}
