// Progress lives in the browser's localStorage. These helpers never throw,
// so a blocked or corrupted store just means the app starts empty.
export function readStore(key) {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch (e) {
    return {};
  }
}

export function writeStore(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Could not save progress", e);
  }
}
