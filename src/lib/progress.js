import { FOCUS } from "../data/exercises";
import { addDays, shortMonthDay, startOfWeekMonday, toDateKey } from "./dates";

export function getFocusKey(date) {
  const day = date.getDay();
  if (day === 1 || day === 4) return "upper";
  if (day === 2 || day === 5) return "lower";
  if (day === 3) return "mobility";
  return "rest";
}

// "future" | "none" | "partial" | "full"
export function getDayStatus(date, completions, today) {
  if (date.getTime() > today.getTime()) return "future";
  const required = FOCUS[getFocusKey(date)].exercises;
  const done = completions[toDateKey(date)] || [];
  const doneCount = required.filter((e) => done.includes(e.id)).length;
  if (doneCount === 0) return "none";
  return doneCount >= required.length ? "full" : "partial";
}

// A completed day adds to the streak. Today never breaks it while it is still in
// progress, and a skipped rest day is neutral, so a lazy Sunday does not wipe a streak.
export function computeCurrentStreak(completions, today) {
  let count = 0;
  for (let i = 0; i < 3650; i++) {
    const d = addDays(today, -i);
    const status = getDayStatus(d, completions, today);
    if (status === "full") {
      count++;
      continue;
    }
    if (i === 0) continue;
    if (getFocusKey(d) === "rest" && status === "none") continue;
    break;
  }
  return count;
}

export function buildDashboard(completions, today) {
  const numWeeks = 8;
  const gridStart = addDays(startOfWeekMonday(today), -(numWeeks - 1) * 7);
  const todayKey = toDateKey(today);

  const weeks = [];
  const flat = [];
  for (let w = 0; w < numWeeks; w++) {
    const days = [];
    for (let d = 0; d < 7; d++) {
      const date = addDays(gridStart, w * 7 + d);
      const dayObj = {
        date,
        status: getDayStatus(date, completions, today),
        focusKey: getFocusKey(date),
        isToday: toDateKey(date) === todayKey,
      };
      days.push(dayObj);
      flat.push(dayObj);
    }
    weeks.push({ label: shortMonthDay(days[0].date), days });
  }

  const current = computeCurrentStreak(completions, today);
  let longest = 0;
  let run = 0;
  let fullDays = 0;
  for (const day of flat) {
    if (day.status === "future") continue;
    if (day.status === "full") {
      fullDays++;
      run++;
      longest = Math.max(longest, run);
    } else if (day.isToday || (day.focusKey === "rest" && day.status === "none")) {
      // neutral, same rules as the current streak
    } else {
      run = 0;
    }
  }
  longest = Math.max(longest, current);

  return { weeks, current, longest, fullDays };
}
