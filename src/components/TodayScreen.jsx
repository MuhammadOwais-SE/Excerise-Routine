import React, { useState } from "react";
import { Card } from "./Card";
import { ExerciseRow } from "./ExerciseRow";
import { ScreenShell } from "./ScreenShell";
import { StreakChip } from "./StreakChip";
import { TodayHero } from "./TodayHero";
import { WeekStrip } from "./WeekStrip";
import { YouTubeNote } from "./YouTubeNote";
import { FOCUS } from "../data/exercises";
import { addDays, longDate, toDateKey, weekdayName } from "../lib/dates";
import { getFocusKey } from "../lib/progress";
import { colors } from "../theme";

export function TodayScreen({
  today,
  selectedDate,
  completions,
  streak,
  onSelectDay,
  onBackToToday,
  onToggleExercise,
  onStartWorkout,
  onOpenExtras,
}) {
  const [expandedId, setExpandedId] = useState(null);

  const todayKey = toDateKey(today);
  const selectedKey = toDateKey(selectedDate);
  const isToday = selectedKey === todayKey;
  const isFuture = selectedDate.getTime() > today.getTime();
  const focusKey = getFocusKey(selectedDate);
  const focus = FOCUS[focusKey];
  const isRest = focusKey === "rest";
  const exercises = focus.exercises;
  const total = exercises.length;
  const doneIds = completions[selectedKey] || [];
  const doneCount = exercises.filter((e) => doneIds.includes(e.id)).length;
  const allDone = !isFuture && doneCount >= total;
  const firstUndone = Math.max(0, exercises.findIndex((e) => !doneIds.includes(e.id)));

  const tomorrow = addDays(today, 1);

  let state = "fresh";
  if (isFuture) state = "future";
  else if (!isToday) state = "past";
  else if (allDone) state = "done";
  else if (doneCount > 0) state = "partial";

  let eyebrow = "Today";
  let title = focus.label;
  let meta = `${total} ${total === 1 ? "exercise" : "exercises"} · ${focus.duration}`;
  if (state === "partial") meta = `${doneCount} of ${total} done · ${focus.duration}`;
  if (state === "done") {
    title = "All done for today";
    meta = `Up next: ${FOCUS[getFocusKey(tomorrow)].label} on ${weekdayName(tomorrow)}.`;
  }
  if (state === "past") {
    eyebrow = weekdayName(selectedDate);
    meta = allDone ? "All done" : `${doneCount} of ${total} done`;
  }
  if (state === "future") {
    eyebrow = weekdayName(selectedDate);
    meta = `Coming up · ${focus.duration}`;
  }

  return (
    <ScreenShell title={longDate(selectedDate)} right={<StreakChip streak={streak} />}>
      <WeekStrip selectedKey={selectedKey} onSelect={onSelectDay} completions={completions} today={today} />

      <TodayHero
        state={state}
        eyebrow={eyebrow}
        title={title}
        meta={meta}
        doneCount={doneCount}
        total={total}
        isRest={isRest}
        walkLabel="Mark walk as done"
        onStart={() => (isRest ? onToggleExercise(exercises[0].id) : onStartWorkout(firstUndone))}
        onReview={() => onStartWorkout(0)}
        onOpenExtras={onOpenExtras}
        onBackToToday={onBackToToday}
      />

      {isFuture ? (
        <Card>
          <h2 className="text-[20px] font-bold text-ink">{focus.label}</h2>
          <p className="mt-1 text-[15px] text-muted">This day hasn't arrived yet. Here is what is planned.</p>
          <ul className="mt-3 divide-y" style={{ borderColor: colors.line }}>
            {exercises.map((ex) => (
              <li key={ex.id} className="py-3" style={{ borderColor: colors.line }}>
                <span className="block text-[17px] font-semibold text-ink">{ex.name}</span>
                <span className="block text-[14px] font-data text-muted">{ex.detail}</span>
              </li>
            ))}
          </ul>
        </Card>
      ) : (
        <Card>
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="text-[20px] font-bold text-ink">Exercises</h2>
            <span className="font-data text-[14px] text-muted">
              {doneCount} of {total} done
            </span>
          </div>
          <div className="mt-1">
            {exercises.map((ex, i) => (
              <ExerciseRow
                key={ex.id}
                exercise={ex}
                done={doneIds.includes(ex.id)}
                onToggle={() => onToggleExercise(ex.id)}
                expanded={expandedId === ex.id}
                onToggleExpand={() => setExpandedId(expandedId === ex.id ? null : ex.id)}
                isLast={i === exercises.length - 1}
              />
            ))}
          </div>
        </Card>
      )}

      <YouTubeNote className="px-1" />
    </ScreenShell>
  );
}
