import { useCallback, useEffect, useRef, useState } from "react";
import { beep, haptic, unlockAudio } from "../lib/device";

// Countdown that works against a real end time instead of subtracting once a second,
// so it stays accurate if the phone throttles the page or the screen locks.
// phase is one of: "idle" | "running" | "paused" | "finished"
export function useHoldTimer(seconds, { onFinish } = {}) {
  const [remaining, setRemaining] = useState(seconds);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  // Tracked on its own, so pausing in the first second still reads as "paused" even
  // though the displayed time has not dropped yet.
  const [paused, setPaused] = useState(false);
  const endAtRef = useRef(0);
  const runningRef = useRef(false);
  const onFinishRef = useRef(onFinish);

  useEffect(() => {
    onFinishRef.current = onFinish;
  });

  const finish = useCallback(() => {
    runningRef.current = false;
    setRunning(false);
    setPaused(false);
    setFinished(true);
    setRemaining(0);
    haptic([250, 120, 250]);
    beep();
    if (onFinishRef.current) onFinishRef.current();
  }, []);

  useEffect(() => {
    if (!running) return undefined;
    const tick = () => {
      if (!runningRef.current) return;
      const left = Math.max(0, Math.ceil((endAtRef.current - Date.now()) / 1000));
      setRemaining(left);
      if (left <= 0) finish();
    };
    const id = setInterval(tick, 250);
    const onVisible = () => {
      if (document.visibilityState === "visible") tick();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [running, finish]);

  useEffect(
    () => () => {
      runningRef.current = false;
    },
    []
  );

  const start = useCallback(() => {
    unlockAudio();
    const from = finished || remaining <= 0 ? seconds : remaining;
    setRemaining(from);
    setFinished(false);
    setPaused(false);
    endAtRef.current = Date.now() + from * 1000;
    runningRef.current = true;
    setRunning(true);
    haptic(10);
  }, [finished, remaining, seconds]);

  const pause = useCallback(() => {
    runningRef.current = false;
    setRunning(false);
    setPaused(true);
    haptic(10);
  }, []);

  const reset = useCallback(() => {
    runningRef.current = false;
    setRunning(false);
    setFinished(false);
    setPaused(false);
    setRemaining(seconds);
  }, [seconds]);

  const toggle = useCallback(() => {
    if (runningRef.current) pause();
    else start();
  }, [pause, start]);

  let phase = "idle";
  if (running) phase = "running";
  else if (finished) phase = "finished";
  else if (paused) phase = "paused";

  return { remaining, running, finished, phase, start, pause, reset, toggle };
}
