import React from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import { Button } from "./Button";
import { useHoldTimer } from "../hooks/useHoldTimer";
import { useWakeLock } from "../hooks/useWakeLock";
import { tones } from "../theme";
import { formatTime } from "../lib/dates";

const STATUS = { idle: "Ready", running: "Hold", paused: "Paused", finished: "Done" };

// The timer inside an expanded exercise row. Keeps the screen on while it runs.
export function InlineTimer({ seconds, note, tone = "pine" }) {
  const t = tones[tone] || tones.pine;
  const timer = useHoldTimer(seconds);
  useWakeLock(timer.running);

  const pct = Math.max(0, Math.min(100, (1 - timer.remaining / seconds) * 100));
  const startLabel = { idle: "Start timer", running: "Pause", paused: "Resume", finished: "Start again" }[timer.phase];

  return (
    <div className="rounded-2xl p-4 space-y-3" style={{ backgroundColor: t.soft }}>
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-data text-[32px] leading-none font-semibold tabular-nums" style={{ color: t.dark }}>
          {formatTime(timer.remaining)}
        </span>
        <span className="text-[14px] font-medium text-right" style={{ color: t.dark }}>
          {STATUS[timer.phase]}
          {note ? `, ${note}` : ""}
        </span>
      </div>
      <div className="h-2 rounded-full overflow-hidden bg-white">
        <div
          className="h-full rounded-full"
          style={{ width: `${pct}%`, backgroundColor: t.solid, transition: "width 0.25s linear" }}
        />
      </div>
      <div className="flex gap-2">
        <Button
          full
          size="md"
          tone={tone}
          icon={timer.running ? Pause : Play}
          onClick={timer.toggle}
        >
          {startLabel}
        </Button>
        <Button variant="light" size="md" tone={tone} icon={RotateCcw} onClick={timer.reset} style={{ color: t.dark }}>
          Reset
        </Button>
      </div>
      <span className="sr-only" role="status">
        {timer.phase === "finished" ? "Timer finished" : ""}
      </span>
    </div>
  );
}
