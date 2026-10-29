import React from "react";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "./Button";
import { InlineTimer } from "./InlineTimer";
import { VideoCard } from "./VideoCard";
import { colors, tones } from "../theme";

// One exercise in a list. The circle ticks it off, the rest of the row opens the
// details (timer, tutorial, form cue). Used for both the routine and the extras.
export function ExerciseRow({ exercise, done, onToggle, expanded, onToggleExpand, isLast, tone = "pine" }) {
  const t = tones[tone] || tones.pine;
  const panelId = `panel-${exercise.id}`;

  return (
    <div style={{ borderBottom: isLast ? "none" : `1px solid ${colors.line}` }}>
      <div className="flex items-center gap-1 py-1">
        <button
          type="button"
          role="checkbox"
          aria-checked={done}
          aria-label={exercise.name}
          onClick={onToggle}
          className="flex-shrink-0 w-12 h-12 -ml-2.5 grid place-items-center"
        >
          <span
            className="w-7 h-7 rounded-full border-2 grid place-items-center transition-colors"
            style={{
              borderColor: done ? t.solid : colors.checkbox,
              backgroundColor: done ? t.solid : "transparent",
            }}
          >
            {done && <Check size={16} color="#fff" strokeWidth={3} aria-hidden="true" />}
          </span>
        </button>
        <button
          type="button"
          onClick={onToggleExpand}
          aria-expanded={expanded}
          aria-controls={expanded ? panelId : undefined}
          className="flex-1 min-w-0 min-h-[56px] flex items-center justify-between text-left gap-2"
        >
          <span className="min-w-0">
            <span
              className="block text-[17px] font-semibold leading-snug truncate"
              style={{ color: colors.ink, textDecoration: "none" }}
            >
              {exercise.name}
            </span>
            <span className="block text-[14px] font-data text-muted">{exercise.detail}</span>
          </span>
          {expanded ? (
            <ChevronUp size={20} className="flex-shrink-0 text-muted" aria-hidden="true" />
          ) : (
            <ChevronDown size={20} className="flex-shrink-0 text-muted" aria-hidden="true" />
          )}
        </button>
      </div>
      {expanded && (
        <div id={panelId} className="pt-1 pb-5 space-y-3 panel-enter">
          {exercise.timerSeconds ? (
            <InlineTimer seconds={exercise.timerSeconds} note={exercise.timerNote} tone={tone} />
          ) : null}
          <VideoCard exercise={exercise} tone={tone} />
          <p className="text-[16px] leading-relaxed text-ink">
            <span className="font-semibold">Form cue. </span>
            {exercise.cue}
          </p>
          {exercise.mod ? (
            <p className="text-[15px] leading-relaxed text-muted">
              <span className="font-semibold">Beginner mod. </span>
              {exercise.mod}
            </p>
          ) : null}
          <Button full size="md" tone={tone} variant={done ? "soft" : "solid"} icon={Check} onClick={onToggle}>
            {done ? "Marked as done. Tap to undo" : "Mark as done"}
          </Button>
        </div>
      )}
    </div>
  );
}
