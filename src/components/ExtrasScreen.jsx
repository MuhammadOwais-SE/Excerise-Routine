import React, { useState } from "react";
import { Play } from "lucide-react";
import { Button } from "./Button";
import { Card } from "./Card";
import { ExerciseRow } from "./ExerciseRow";
import { ScreenShell } from "./ScreenShell";
import { YouTubeNote } from "./YouTubeNote";
import { EXTRA_EXERCISES } from "../data/exercises";
import { colors } from "../theme";

// Optional exercises for when there is time left. Always logged against today, and never
// counted toward the streak or the movement log.
export function ExtrasScreen({ extraDoneIds, onToggle, onStart }) {
  const [expandedId, setExpandedId] = useState(null);
  const total = EXTRA_EXERCISES.length;
  const doneCount = EXTRA_EXERCISES.filter((e) => extraDoneIds.includes(e.id)).length;
  const firstUndone = Math.max(0, EXTRA_EXERCISES.findIndex((e) => !extraDoneIds.includes(e.id)));
  const allDone = doneCount >= total;

  return (
    <ScreenShell title="Extras">
      <section
        aria-labelledby="extras-hero-title"
        className="rounded-[28px] p-5"
        style={{ backgroundColor: colors.sunSoft, border: `1.5px dashed ${colors.sun}` }}
      >
        <h2 id="extras-hero-title" className="text-[22px] leading-tight font-bold" style={{ color: colors.sunDark }}>
          Only if you have time left
        </h2>
        <p className="mt-2 text-[16px] leading-snug" style={{ color: colors.sunDark }}>
          These are optional and don't count toward your streak or movement log.
        </p>
        <div className="mt-4 flex gap-1.5" aria-hidden="true">
          {EXTRA_EXERCISES.map((e) => (
            <span
              key={e.id}
              className="h-1.5 flex-1 rounded-full"
              style={{ backgroundColor: extraDoneIds.includes(e.id) ? colors.sunDark : "rgba(138,90,38,0.22)" }}
            />
          ))}
        </div>
        <p className="mt-2 font-data text-[14px]" style={{ color: colors.sunDark }}>
          {doneCount} of {total} done today
        </p>
        <div className="mt-4">
          <Button full size="xl" tone="sun" icon={Play} onClick={() => onStart(allDone ? 0 : firstUndone)}>
            {allDone ? "Run extras again" : doneCount > 0 ? "Continue extras" : "Start extras"}
          </Button>
        </div>
      </section>

      <Card>
        <h2 className="text-[20px] font-bold text-ink">All extras</h2>
        <div className="mt-1">
          {EXTRA_EXERCISES.map((ex, i) => (
            <ExerciseRow
              key={ex.id}
              exercise={ex}
              tone="sun"
              done={extraDoneIds.includes(ex.id)}
              onToggle={() => onToggle(ex.id)}
              expanded={expandedId === ex.id}
              onToggleExpand={() => setExpandedId(expandedId === ex.id ? null : ex.id)}
              isLast={i === EXTRA_EXERCISES.length - 1}
            />
          ))}
        </div>
      </Card>

      <YouTubeNote className="px-1" />
    </ScreenShell>
  );
}
