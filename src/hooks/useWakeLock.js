import { useEffect } from "react";

// Keeps the screen on while `active` is true. The browser drops the lock whenever
// the page is hidden, so it is requested again when the page comes back.
export function useWakeLock(active) {
  useEffect(() => {
    if (!active || typeof navigator === "undefined" || !("wakeLock" in navigator)) return undefined;
    let lock = null;
    let cancelled = false;

    const acquire = async () => {
      if (lock || cancelled || document.visibilityState !== "visible") return;
      try {
        const next = await navigator.wakeLock.request("screen");
        if (cancelled) {
          next.release().catch(() => {});
          return;
        }
        lock = next;
        next.addEventListener("release", () => {
          if (lock === next) lock = null;
        });
      } catch (e) {
        lock = null;
      }
    };

    const onVisible = () => {
      if (document.visibilityState === "visible") acquire();
    };

    acquire();
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      cancelled = true;
      document.removeEventListener("visibilitychange", onVisible);
      const held = lock;
      lock = null;
      if (held) {
        try {
          const p = held.release();
          if (p && typeof p.catch === "function") p.catch(() => {});
        } catch (e) {
          // already released
        }
      }
    };
  }, [active]);
}
