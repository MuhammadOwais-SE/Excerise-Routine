import React from "react";
import { Check, Play } from "lucide-react";
import { Button } from "./Button";
import { colors } from "../theme";

// The big card at the top of Today. It always offers the single most useful next step:
// start, continue, do extras, or get back to today.
export function TodayHero({
  state, // "fresh" | "partial" | "done" | "past" | "future"
  eyebrow,
  title,
  meta,
  doneCount,
  total,
  isRest,
  walkLabel,
  onStart,
  onReview,
  onOpenExtras,
  onBackToToday,
}) {
  let buttons = null;
  if (state === "fresh" || state === "partial") {
    buttons = (
      <Button full size="xl" variant="light" icon={isRest ? Check : Play} onClick={onStart}>
        {isRest ? walkLabel : state === "partial" ? "Continue workout" : "Start workout"}
      </Button>
    );
  } else if (state === "done") {
    buttons = (
      <>
        <Button full size="xl" variant="light" onClick={onOpenExtras}>
          Do extra exercises
        </Button>
        {isRest ? null : (
          <Button full size="md" variant="outlineOnPine" onClick={onReview}>
            Review workout
          </Button>
        )}
      </>
    );
  } else {
    buttons = (
      <Button full size="xl" variant="light" onClick={onBackToToday}>
        Back to today
      </Button>
    );
  }

  return (
    <section
      aria-labelledby="hero-title"
      className="rounded-[28px] p-5 text-white"
      style={{
        background: "linear-gradient(155deg, #1F4B3D 0%, #2F6F5E 100%)",
        boxShadow: "0 18px 40px -22px rgba(31,75,61,0.75)",
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="font-data text-[13px] font-semibold tracking-[0.14em] uppercase" style={{ color: colors.onPine }}>
          {eyebrow}
        </p>
        {state === "done" ? (
          <span className="grid place-items-center w-9 h-9 rounded-full bg-white flex-shrink-0">
            <Check size={20} color={colors.pineDark} strokeWidth={3} aria-hidden="true" />
          </span>
        ) : null}
      </div>
      <h2 id="hero-title" className="mt-2 text-[28px] leading-[1.1] font-bold">
        {title}
      </h2>
      <p className="mt-2 text-[16px] leading-snug" style={{ color: colors.onPine }}>
        {meta}
      </p>

      {state !== "future" && !isRest ? (
        <div className="mt-4 flex gap-1.5" aria-hidden="true">
          {Array.from({ length: total }, (_, i) => (
            <span
              key={i}
              className="h-1.5 flex-1 rounded-full"
              style={{ backgroundColor: i < doneCount ? "#FFFFFF" : "rgba(255,255,255,0.28)" }}
            />
          ))}
        </div>
      ) : null}

      <div className="mt-5 space-y-2.5">{buttons}</div>
    </section>
  );
}
