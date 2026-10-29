import { useEffect, useState } from "react";
import { startOfDay, toDateKey } from "../lib/dates";

// Re-reads the date when the app comes back to the foreground, so a phone that
// kept the app open overnight rolls over to the new day without a reload.
export function useToday() {
  const [today, setToday] = useState(() => startOfDay());
  useEffect(() => {
    const refresh = () => {
      const now = startOfDay();
      setToday((prev) => (toDateKey(prev) === toDateKey(now) ? prev : now));
    };
    const id = setInterval(refresh, 30000);
    document.addEventListener("visibilitychange", refresh);
    window.addEventListener("focus", refresh);
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", refresh);
      window.removeEventListener("focus", refresh);
    };
  }, []);
  return today;
}
