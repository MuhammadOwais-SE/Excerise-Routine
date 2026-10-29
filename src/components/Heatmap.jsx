import React from "react";
import { colors } from "../theme";
import { toDateKey } from "../lib/dates";

const COLUMNS = { gridTemplateColumns: "48px repeat(7, 1fr)" };

function cellColor(day) {
  if (day.status === "future") return colors.canvas;
  if (day.status === "none") return colors.heat0;
  if (day.status === "full") return day.focusKey === "rest" ? colors.steel : colors.heat3;
  return colors.heat1;
}

const LEGEND = [
  { label: "None", color: colors.heat0 },
  { label: "Partial", color: colors.heat1 },
  { label: "Done", color: colors.heat3 },
  { label: "Rest day", color: colors.steel },
];

export function Heatmap({ weeks, fullDays }) {
  return (
    <div>
      <div role="img" aria-label={`Movement log for the last 8 weeks, ${fullDays} completed days`} className="space-y-1.5">
        {weeks.map((week) => (
          <div key={week.label} className="grid items-center gap-1.5" style={COLUMNS}>
            <span className="font-data text-[12px] text-muted">{week.label}</span>
            {week.days.map((day) => (
              <div
                key={toDateKey(day.date)}
                title={toDateKey(day.date)}
                className="aspect-square rounded-lg"
                style={{
                  backgroundColor: cellColor(day),
                  outline: day.isToday ? `2px solid ${colors.sun}` : "none",
                  outlineOffset: "1px",
                }}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="grid gap-1.5 mt-2" style={COLUMNS} aria-hidden="true">
        <span />
        {["M", "T", "W", "T", "F", "S", "S"].map((l, i) => (
          <span key={i} className="text-center font-data text-[12px] text-muted">
            {l}
          </span>
        ))}
      </div>
      <ul className="flex flex-wrap gap-x-4 gap-y-1.5 mt-4 text-[13px] text-muted">
        {LEGEND.map((item) => (
          <li key={item.label} className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-[4px] inline-block" style={{ backgroundColor: item.color }} />
            {item.label}
          </li>
        ))}
        <li className="flex items-center gap-1.5">
          <span
            className="w-3 h-3 rounded-[4px] inline-block"
            style={{ backgroundColor: colors.canvas, outline: `2px solid ${colors.sun}`, outlineOffset: "0px" }}
          />
          Today
        </li>
      </ul>
    </div>
  );
}
