import React, { useState } from "react";
import { Flame } from "lucide-react";
import { Button } from "./Button";
import { Card } from "./Card";
import { Heatmap } from "./Heatmap";
import { ScreenShell } from "./ScreenShell";
import { DAY_NAMES, FOCUS, WEEK_ORDER } from "../data/exercises";
import { colors } from "../theme";

export function ProgressScreen({ dashboard, onReset }) {
  const [confirming, setConfirming] = useState(false);
  const { current, longest, fullDays, weeks } = dashboard;

  return (
    <ScreenShell title="Progress">
      <Card>
        <div className="flex items-center gap-4">
          <span
            className="grid place-items-center w-14 h-14 rounded-2xl flex-shrink-0"
            style={{ backgroundColor: colors.sunSoft }}
          >
            <Flame size={28} color={colors.sunIcon} aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="text-[24px] leading-tight font-bold text-ink">
              {current} day streak
            </p>
            <p className="mt-1 text-[15px] leading-snug text-muted">
              Best: {longest} {longest === 1 ? "day" : "days"}. {fullDays} {fullDays === 1 ? "day" : "days"} completed
              in the last 8 weeks.
            </p>
          </div>
        </div>
      </Card>

      <Card aria-labelledby="log-title">
        <h2 id="log-title" className="text-[20px] font-bold text-ink mb-4">
          Movement log
        </h2>
        <Heatmap weeks={weeks} fullDays={fullDays} />
      </Card>

      <Card aria-labelledby="plan-title">
        <h2 id="plan-title" className="text-[20px] font-bold text-ink">
          Weekly plan
        </h2>
        <ul className="mt-3">
          {WEEK_ORDER.map((fk, i) => (
            <li
              key={DAY_NAMES[i]}
              className="flex gap-4 py-3"
              style={{ borderTop: i === 0 ? "none" : `1px solid ${colors.line}` }}
            >
              <span className="w-10 flex-shrink-0 font-data text-[14px] font-semibold uppercase text-muted pt-0.5">
                {DAY_NAMES[i].slice(0, 3)}
              </span>
              <span className="min-w-0">
                <span className="block text-[16px] font-semibold text-ink">{FOCUS[fk].label}</span>
                <span className="block text-[14px] leading-snug text-muted">
                  {FOCUS[fk].exercises.map((e) => e.name).join(", ")}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </Card>

      <div className="px-1 pt-2">
        {confirming ? (
          <div className="rounded-2xl p-4 bg-surface" style={{ border: `1px solid ${colors.line}` }}>
            <p className="text-[16px] font-semibold text-ink">Clear all progress?</p>
            <p className="mt-1 text-[14px] text-muted">This removes your streak and movement log. It can't be undone.</p>
            <div className="mt-3 flex gap-3">
              <Button
                full
                size="md"
                onClick={() => {
                  onReset();
                  setConfirming(false);
                }}
                style={{ backgroundColor: "#8F2D2D", color: "#FFFFFF" }}
              >
                Yes, clear everything
              </Button>
              <Button variant="soft" size="md" onClick={() => setConfirming(false)}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <Button variant="ghost" size="md" onClick={() => setConfirming(true)} style={{ color: colors.muted }}>
            Reset all progress
          </Button>
        )}
      </div>
    </ScreenShell>
  );
}
