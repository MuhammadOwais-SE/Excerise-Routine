import React from "react";
import { colors } from "../theme";
import { formatTime } from "../lib/dates";

const RADIUS = 54;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

// A big countdown ring. The whole ring is the start/pause button, so it is easy to hit
// with a sweaty thumb while the phone leans against a wall. The text inside says what a
// tap will do, so it never relies on an icon alone.
export function TimerRing({ remaining, total, caption, fill, onToggle }) {
  const progress = total > 0 ? Math.max(0, Math.min(1, 1 - remaining / total)) : 0;
  const size = "min(72vw, 36dvh, 280px)";

  return (
    <button
      type="button"
      onClick={onToggle}
      className="relative mx-auto block rounded-full"
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 120 120" className="absolute inset-0 w-full h-full -rotate-90" aria-hidden="true">
        <circle cx="60" cy="60" r={RADIUS} fill="none" stroke={colors.nightLine} strokeWidth="7" />
        <circle
          cx="60"
          cy="60"
          r={RADIUS}
          fill="none"
          stroke={fill}
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
          style={{ transition: "stroke-dashoffset 0.25s linear" }}
        />
      </svg>
      <span className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
        <span className="font-data font-semibold tabular-nums leading-none text-[clamp(44px,15vw,64px)]">
          {formatTime(remaining)}
        </span>
        <span className="mt-3 text-[15px] font-medium leading-snug" style={{ color: colors.onNightMuted }}>
          {caption}
        </span>
      </span>
    </button>
  );
}
