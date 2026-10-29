import React, { useEffect, useMemo, useRef, useState } from "react";
import { ExtrasScreen } from "./components/ExtrasScreen";
import { ProgressScreen } from "./components/ProgressScreen";
import { TabBar } from "./components/TabBar";
import { TodayScreen } from "./components/TodayScreen";
import { WorkoutPlayer } from "./components/WorkoutPlayer";
import { EXTRA_EXERCISES, FOCUS } from "./data/exercises";
import { useToday } from "./hooks/useToday";
import { addDays, startOfWeekMonday, toDateKey, weekdayName } from "./lib/dates";
import { buildDashboard, getFocusKey } from "./lib/progress";
import { readStore, writeStore } from "./lib/storage";

const STORAGE_KEY = "uptime-completions";
const EXTRA_STORAGE_KEY = "uptime-extra-completions";

export default function App() {
  const today = useToday();
  const [completions, setCompletions] = useState(() => readStore(STORAGE_KEY));
  const [extraCompletions, setExtraCompletions] = useState(() => readStore(EXTRA_STORAGE_KEY));
  const [tab, setTab] = useState("today");
  const [picked, setPicked] = useState(null);
  const [player, setPlayer] = useState(null);
  const appRef = useRef(null);
  const playerCount = useRef(0);

  useEffect(() => {
    writeStore(STORAGE_KEY, completions);
  }, [completions]);

  useEffect(() => {
    writeStore(EXTRA_STORAGE_KEY, extraCompletions);
  }, [extraCompletions]);

  // The Android back button should close the workout, not leave the app. Opening the
  // player adds one history entry, and going back removes it.
  useEffect(() => {
    if (window.history.state && window.history.state.uptimePlayer) {
      window.history.replaceState(null, "");
    }
    const onPop = () => setPlayer(null);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // While the workout is open, the page behind it is switched off for screen readers
  // and keyboards.
  useEffect(() => {
    if (appRef.current) appRef.current.inert = Boolean(player);
  }, [player]);

  useEffect(() => {
    try {
      window.scrollTo(0, 0);
    } catch (e) {
      // not available in every environment
    }
  }, [tab]);

  const todayKey = toDateKey(today);
  const weekStartKey = toDateKey(startOfWeekMonday(today));
  // A picked day only counts while it is still in the current week, so the view
  // falls back to today after the week rolls over.
  const selectedDate = picked && toDateKey(startOfWeekMonday(picked)) === weekStartKey ? picked : today;

  const dashboard = useMemo(() => buildDashboard(completions, today), [completions, today]);

  const makeToggle = (setter, dayKey) => (id) =>
    setter((prev) => {
      const current = new Set(prev[dayKey] || []);
      if (current.has(id)) current.delete(id);
      else current.add(id);
      return { ...prev, [dayKey]: Array.from(current) };
    });

  const makeMarkDone = (setter, dayKey) => (id) =>
    setter((prev) => {
      const current = prev[dayKey] || [];
      return current.includes(id) ? prev : { ...prev, [dayKey]: [...current, id] };
    });

  const openPlayer = (kind, startIndex) => {
    try {
      window.history.pushState({ uptimePlayer: true }, "");
    } catch (e) {
      // history is optional, the Close button still works
    }
    playerCount.current += 1;
    setPlayer({
      id: playerCount.current,
      kind,
      dayKey: todayKey,
      focusKey: getFocusKey(today),
      startIndex,
    });
  };

  const closePlayer = () => {
    if (window.history.state && window.history.state.uptimePlayer) window.history.back();
    else setPlayer(null);
  };

  const tomorrow = addDays(today, 1);
  const nextUpText = `Up next: ${FOCUS[getFocusKey(tomorrow)].label} on ${weekdayName(tomorrow)}.`;

  const isExtraPlayer = player && player.kind === "extra";
  const playerExercises = player ? (isExtraPlayer ? EXTRA_EXERCISES : FOCUS[player.focusKey].exercises) : [];
  const playerDoneIds = player ? ((isExtraPlayer ? extraCompletions : completions)[player.dayKey] || []) : [];

  return (
    <div className="min-h-dvh bg-canvas text-ink">
      <div ref={appRef}>
        {tab === "today" && (
          <TodayScreen
            today={today}
            selectedDate={selectedDate}
            completions={completions}
            streak={dashboard.current}
            onSelectDay={(d) => setPicked(toDateKey(d) === todayKey ? null : d)}
            onBackToToday={() => setPicked(null)}
            onToggleExercise={makeToggle(setCompletions, toDateKey(selectedDate))}
            onStartWorkout={(startIndex) => openPlayer("main", startIndex)}
            onOpenExtras={() => setTab("extras")}
          />
        )}
        {tab === "extras" && (
          <ExtrasScreen
            extraDoneIds={extraCompletions[todayKey] || []}
            onToggle={makeToggle(setExtraCompletions, todayKey)}
            onStart={(startIndex) => openPlayer("extra", startIndex)}
          />
        )}
        {tab === "progress" && (
          <ProgressScreen
            dashboard={dashboard}
            onReset={() => {
              setCompletions({});
              setExtraCompletions({});
            }}
          />
        )}
        <TabBar active={tab} onChange={setTab} />
      </div>

      {player && (
        <WorkoutPlayer
          key={player.id}
          tone={isExtraPlayer ? "sun" : "pine"}
          title={isExtraPlayer ? "Extra exercises" : "Workout"}
          focusLabel={isExtraPlayer ? "Extra exercises" : FOCUS[player.focusKey].label}
          exercises={playerExercises}
          doneIds={playerDoneIds}
          startIndex={player.startIndex}
          streak={dashboard.current}
          nextUpText={nextUpText}
          finishLabel={isExtraPlayer ? "Finish extras" : "Finish workout"}
          onMarkDone={
            isExtraPlayer
              ? makeMarkDone(setExtraCompletions, player.dayKey)
              : makeMarkDone(setCompletions, player.dayKey)
          }
          onClose={closePlayer}
          onDoExtras={() => {
            closePlayer();
            setTab("extras");
          }}
        />
      )}
    </div>
  );
}
