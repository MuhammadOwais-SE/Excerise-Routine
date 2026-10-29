import React from "react";
import { colors } from "../theme";
import { addDays, longDate, startOfWeekMonday, toDateKey } from "../lib/dates";
import { getDayStatus, getFocusKey } from "../lib/progress";

const STATUS_WORDS = { full: "completed", partial: "partly done", none: "not done", future: "upcoming" };
const LETTERS = ["M", "T", "W", "T", "F", "S", "S"];

// The shape carries the meaning, not just the colour: filled = done, ring = partly done,
// faint dot = nothing logged.
function StatusDot({ status, isRest, selected }) {
  const base = "w-2 h-2 rounded-full mt-1 flex-shrink-0";
  const strong = selected ? "#FFFFFF" : isRest ? colors.steel : colors.pine;
  if (status === "full") {
    return <span className={base} style={{ backgroundColor: strong }} />;
  }
  if (status === "partial") {
    return <span className={base} style={{ boxShadow: `inset 0 0 0 2px ${strong}` }} />;
  }
  return <span className={base} style={{ backgroundColor: selected ? "rgba(255,255,255,0.35)" : colors.line }} />;
}

export function WeekStrip({ selectedKey, onSelect, completions, today }) {
  const monday = startOfWeekMonday(today);
  const todayKey = toDateKey(today);
  const days = Array.from({ length: 7 }, (_, i) => addDays(monday, i));

  // No grid gap. Each button owns its whole column, and the visible pill is inset by 3px
  // on each side. That keeps the look of a 6px gap but gives every day a tap area of at
  // least 44px wide, even on a 360px phone.
  return (
    <div className="grid grid-cols-7 -mx-[3px]">
      {days.map((d, i) => {
        const key = toDateKey(d);
        const isSelected = key === selectedKey;
        const isToday = key === todayKey;
        const status = getDayStatus(d, completions, today);
        const isRest = getFocusKey(d) === "rest";

        return (
          <button
            key={key}
            type="button"
            onClick={() => onSelect(d)}
            aria-pressed={isSelected}
            aria-current={isToday ? "date" : undefined}
            aria-label={`${longDate(d)}${isToday ? ", today" : ""}, ${STATUS_WORDS[status]}`}
            className="flex min-h-[64px] px-[3px]"
          >
            <span
              className="flex-1 rounded-2xl flex flex-col items-center justify-center gap-0.5 transition-colors"
              style={{
                backgroundColor: isSelected ? colors.pine : colors.surface,
                boxShadow:
                  isToday && !isSelected
                    ? `inset 0 0 0 2px ${colors.sun}`
                    : `inset 0 0 0 1px ${isSelected ? colors.pine : colors.line}`,
              }}
            >
              <span
                className="text-[12px] font-data font-semibold"
                style={{ color: isSelected ? colors.onPine : colors.muted }}
              >
                {LETTERS[i]}
              </span>
              <span
                className="text-[17px] font-data font-semibold leading-none"
                style={{ color: isSelected ? "#FFFFFF" : colors.ink }}
              >
                {d.getDate()}
              </span>
              <StatusDot status={status} isRest={isRest} selected={isSelected} />
            </span>
          </button>
        );
      })}
    </div>
  );
}
