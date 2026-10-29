import React, { useEffect, useRef, useState } from "react";
import { Check, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "./Button";
import { TimerRing } from "./TimerRing";
import { VideoCard } from "./VideoCard";
import { useHoldTimer } from "../hooks/useHoldTimer";
import { useWakeLock } from "../hooks/useWakeLock";
import { haptic } from "../lib/device";
import { colors, tones } from "../theme";

// The stage scrolls on short phones. Fading its last few pixels shows there is more
// below instead of cutting a card in half. The bottom padding sits under the fade, so a
// fully scrolled stage looks untouched.
const SCROLL_FADE = "linear-gradient(to bottom, #000 calc(100% - 24px), transparent)";

function ringCaption(phase, totalSets, setsDone) {
  switch (phase) {
    case "running":
      return "Tap to pause";
    case "paused":
      return "Paused. Tap to resume";
    case "finished":
      return totalSets && setsDone < totalSets ? "Rest, then tap for the next set" : "Done";
    default:
      return "Tap to start";
  }
}

function SetDots({ total, done, fill }) {
  return (
    <div className="flex flex-col items-center gap-2" role="group" aria-label={`Sets: ${done} of ${total} done`}>
      <div className="flex items-center justify-center gap-2.5">
        {Array.from({ length: total }, (_, i) => {
          const complete = i < done;
          const current = i === done;
          return (
            <span
              key={i}
              className="grid place-items-center w-11 h-11 rounded-full font-data text-[16px] font-semibold"
              style={{
                backgroundColor: complete ? fill : "transparent",
                border: `2px solid ${complete || current ? fill : colors.nightLine}`,
                color: complete ? colors.night : colors.onNight,
              }}
            >
              {complete ? <Check size={20} strokeWidth={3} aria-hidden="true" /> : i + 1}
            </span>
          );
        })}
      </div>
      <p className="font-data text-[14px]" style={{ color: colors.onNightMuted }}>
        {done >= total ? `All ${total} sets done` : `Set ${done + 1} of ${total}`}
      </p>
    </div>
  );
}

// One exercise on screen. Keyed by exercise id, so its timer and set count start fresh.
function ExerciseStage({
  exercise,
  focusLabel,
  tone,
  isFirst,
  isLast,
  alreadyDone,
  finishLabel,
  onBack,
  onMarkDone,
  onNext,
}) {
  const t = tones[tone] || tones.pine;
  const totalSets = exercise.sets || 0;
  const hasTimer = Boolean(exercise.timerSeconds);
  const [setsDone, setSetsDone] = useState(alreadyDone ? totalSets : 0);

  const timer = useHoldTimer(exercise.timerSeconds || 0, {
    onFinish: () => {
      if (totalSets) setSetsDone((n) => Math.min(totalSets, n + 1));
    },
  });

  const repsMode = totalSets > 0 && !hasTimer;
  const setsPending = repsMode && setsDone < totalSets;

  let label = "Next exercise";
  if (setsPending) label = `Set ${setsDone + 1} done`;
  else if (isLast) label = finishLabel;

  const onPrimary = () => {
    haptic(12);
    if (setsPending) {
      setSetsDone((n) => n + 1);
      return;
    }
    onMarkDone(exercise.id);
    onNext();
  };

  const onSkip = () => {
    haptic(8);
    onNext();
  };

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div
        className="flex-1 min-h-0 overflow-y-auto px-5 pb-6"
        style={{ overscrollBehavior: "contain", WebkitMaskImage: SCROLL_FADE, maskImage: SCROLL_FADE }}
      >
        <p className="font-data text-[13px] font-semibold tracking-[0.14em] uppercase" style={{ color: colors.onNightMuted }}>
          {focusLabel}
        </p>
        <h2 className="mt-2 text-[32px] leading-[1.08] font-bold">{exercise.name}</h2>
        <p className="mt-2 font-data text-[15px]" style={{ color: colors.onNightMuted }}>
          {exercise.detail}
        </p>

        <div className="mt-7 space-y-6">
          {totalSets > 0 ? <SetDots total={totalSets} done={setsDone} fill={t.nightFill} /> : null}

          {hasTimer ? (
            <div>
              <TimerRing
                remaining={timer.remaining}
                total={exercise.timerSeconds}
                caption={ringCaption(timer.phase, totalSets, setsDone)}
                fill={t.nightFill}
                onToggle={timer.toggle}
              />
              {exercise.timerNote ? (
                <p className="mt-3 text-center text-[15px]" style={{ color: colors.onNightMuted }}>
                  {exercise.timerNote}
                </p>
              ) : null}
              <span className="sr-only" role="status">
                {timer.phase === "finished" ? "Timer finished" : ""}
              </span>
            </div>
          ) : (
            <p className="text-center text-[36px] leading-[1.12] font-bold text-balance py-2">
              {exercise.target || exercise.detail}
              {repsMode ? (
                <span className="block mt-1 text-[16px] font-medium" style={{ color: colors.onNightMuted }}>
                  per set
                </span>
              ) : null}
            </p>
          )}
        </div>

        <div className="mt-7 rounded-2xl p-4" style={{ backgroundColor: colors.nightRaised }}>
          <p className="text-[17px] leading-[1.55]">
            <span className="font-semibold">Form cue. </span>
            {exercise.cue}
          </p>
          {exercise.mod ? (
            <p className="mt-3 text-[15px] leading-relaxed" style={{ color: colors.onNightMuted }}>
              <span className="font-semibold">Beginner mod. </span>
              {exercise.mod}
            </p>
          ) : null}
        </div>

        <div className="mt-3">
          <VideoCard exercise={exercise} tone={tone} layout="row" />
        </div>

        <div className="mt-2 flex justify-center">
          <Button variant="ghostNight" size="md" onClick={onSkip}>
            Skip this exercise
          </Button>
        </div>
      </div>

      <div
        className="flex gap-3 px-4 pt-3"
        style={{
          paddingBottom: "max(env(safe-area-inset-bottom), 16px)",
          borderTop: `1px solid ${colors.nightLine}`,
        }}
      >
        <Button variant="night" size="xl" icon={ChevronLeft} disabled={isFirst} onClick={onBack}>
          Back
        </Button>
        <Button
          full
          variant="mint"
          tone={tone}
          size="xl"
          icon={setsPending || isLast ? Check : ChevronRight}
          iconAfter={!(setsPending || isLast)}
          onClick={onPrimary}
        >
          {label}
        </Button>
      </div>
    </div>
  );
}

function FinishPanel({ tone, allDone, doneCount, total, streak, nextUpText, onClose, onDoExtras }) {
  const t = tones[tone] || tones.pine;
  const isExtra = tone === "sun";

  let title = "Workout complete";
  let body = nextUpText;
  if (isExtra) {
    title = "Extras finished";
    body = `${doneCount} of ${total} extras done today.`;
  } else if (!allDone) {
    title = "Workout finished";
    body = `${doneCount} of ${total} done. Skipped exercises stay unchecked on Today.`;
  }

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="flex-1 min-h-0 overflow-y-auto px-6 flex flex-col items-center justify-center text-center">
        <span className="pop-in grid place-items-center w-24 h-24 rounded-full" style={{ backgroundColor: t.nightFill }}>
          <Check size={48} strokeWidth={3} color={colors.night} aria-hidden="true" />
        </span>
        <h2 className="mt-6 text-[32px] leading-[1.1] font-bold" role="status">
          {title}
        </h2>
        <p className="mt-3 text-[17px] leading-snug" style={{ color: colors.onNightMuted }}>
          {body}
        </p>
        {!isExtra && allDone ? (
          <p className="mt-5 font-data text-[17px] font-semibold" style={{ color: t.nightFill }}>
            {streak} day streak
          </p>
        ) : null}
      </div>
      <div className="px-4 pt-3 space-y-3" style={{ paddingBottom: "max(env(safe-area-inset-bottom), 16px)" }}>
        {!isExtra && allDone ? (
          <Button full size="xl" variant="mint" tone={tone} onClick={onDoExtras}>
            Do extra exercises
          </Button>
        ) : null}
        <Button full size="xl" variant={!isExtra && allDone ? "night" : "mint"} tone={tone} onClick={onClose}>
          {isExtra ? "Back to Extras" : "Back to Today"}
        </Button>
      </div>
    </div>
  );
}

// Full-screen guided mode. One exercise at a time, large type, big buttons at the bottom
// where a thumb can reach them. The screen stays awake while it is open.
export function WorkoutPlayer({
  tone = "pine",
  title,
  focusLabel,
  exercises,
  doneIds,
  startIndex = 0,
  streak,
  nextUpText,
  finishLabel = "Finish workout",
  onMarkDone,
  onClose,
  onDoExtras,
}) {
  const t = tones[tone] || tones.pine;
  const [index, setIndex] = useState(Math.min(Math.max(startIndex, 0), exercises.length - 1));
  const [finished, setFinished] = useState(false);
  const dialogRef = useRef(null);
  const closeRef = useRef(onClose);

  useWakeLock(true);

  useEffect(() => {
    closeRef.current = onClose;
  });

  useEffect(() => {
    const previous = document.activeElement;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    if (dialogRef.current) dialogRef.current.focus();
    const onKey = (e) => {
      if (e.key === "Escape") closeRef.current();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      if (previous && typeof previous.focus === "function") previous.focus();
    };
  }, []);

  const exercise = exercises[index];
  const doneCount = exercises.filter((e) => doneIds.includes(e.id)).length;
  const allDone = doneCount >= exercises.length;

  const goNext = () => {
    if (index + 1 < exercises.length) setIndex(index + 1);
    else setFinished(true);
  };

  return (
    <div
      ref={dialogRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="player-enter fixed inset-0 z-50 flex flex-col outline-none"
      style={{ backgroundColor: colors.night, color: colors.onNight, height: "100dvh" }}
    >
      <div className="mx-auto w-full max-w-md flex flex-col flex-1 min-h-0">
        <div className="px-4 pb-3" style={{ paddingTop: "max(env(safe-area-inset-top), 12px)" }}>
          <div className="flex items-center justify-between">
            <Button variant="ghostNight" size="md" icon={X} onClick={onClose} className="-ml-2">
              Close
            </Button>
            <span className="font-data text-[15px] font-semibold pr-1" style={{ color: colors.onNightMuted }}>
              {finished ? "Finished" : `${index + 1} of ${exercises.length}`}
            </span>
          </div>
          <div className="mt-2 flex gap-1.5" aria-hidden="true">
            {exercises.map((e, i) => (
              <span
                key={e.id}
                className="flex-1 rounded-full"
                style={{
                  height: !finished && i === index ? 8 : 6,
                  backgroundColor: doneIds.includes(e.id)
                    ? t.nightFill
                    : !finished && i === index
                    ? colors.onNight
                    : colors.nightLine,
                }}
              />
            ))}
          </div>
        </div>

        {finished ? (
          <FinishPanel
            tone={tone}
            allDone={allDone}
            doneCount={doneCount}
            total={exercises.length}
            streak={streak}
            nextUpText={nextUpText}
            onClose={onClose}
            onDoExtras={onDoExtras}
          />
        ) : (
          <ExerciseStage
            key={exercise.id}
            exercise={exercise}
            focusLabel={focusLabel}
            tone={tone}
            isFirst={index === 0}
            isLast={index === exercises.length - 1}
            alreadyDone={doneIds.includes(exercise.id)}
            finishLabel={finishLabel}
            onBack={() => setIndex(Math.max(0, index - 1))}
            onMarkDone={onMarkDone}
            onNext={goNext}
          />
        )}
      </div>
    </div>
  );
}
