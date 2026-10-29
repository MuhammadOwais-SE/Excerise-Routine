import React, { useState } from "react";
import { ExternalLink, Play, Search } from "lucide-react";
import { colors, tones } from "../theme";
import { youtubeSearchUrl, youtubeThumbUrl, youtubeWatchUrl } from "../lib/device";

// A tutorial link that opens YouTube in a new tab. Exercises with a pinned video get a
// thumbnail. Exercises without one, or whose preview fails to load, get a search link,
// which cannot go stale.
//   layout "card": big thumbnail, used inside the exercise list
//   layout "row":  compact thumbnail row, used on the dark workout player
export function VideoCard({ exercise, tone = "pine", layout = "card" }) {
  const [thumbFailed, setThumbFailed] = useState(false);
  const t = tones[tone] || tones.pine;
  const night = layout === "row";
  const hasVideo = Boolean(exercise.videoId);
  if (!hasVideo && !exercise.searchQuery) return null;

  const searchUrl = youtubeSearchUrl(exercise.searchQuery || `${exercise.name} proper form tutorial`);

  if (hasVideo && !thumbFailed && night) {
    return (
      <a
        href={youtubeWatchUrl(exercise.videoId)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 rounded-2xl p-2.5 pr-4 min-h-[76px]"
        style={{ backgroundColor: colors.nightRaised, color: colors.onNight }}
      >
        <span className="relative block w-[112px] flex-shrink-0 aspect-video rounded-xl overflow-hidden bg-black">
          <img
            src={youtubeThumbUrl(exercise.videoId)}
            alt=""
            loading="lazy"
            onError={() => setThumbFailed(true)}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <span className="absolute inset-0 grid place-items-center" style={{ backgroundColor: "rgba(0,0,0,0.25)" }}>
            <span className="grid place-items-center w-9 h-9 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.92)" }}>
              <Play size={16} color={colors.ink} fill={colors.ink} aria-hidden="true" />
            </span>
          </span>
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[16px] font-semibold leading-tight">Watch the tutorial</span>
          <span className="block text-[14px] mt-0.5" style={{ color: colors.onNightMuted }}>
            Opens YouTube
          </span>
        </span>
        <ExternalLink size={18} className="flex-shrink-0" style={{ color: colors.onNightMuted }} aria-hidden="true" />
      </a>
    );
  }

  if (hasVideo && !thumbFailed) {
    return (
      <div>
        <a
          href={youtubeWatchUrl(exercise.videoId)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Watch the ${exercise.name} tutorial on YouTube, opens in a new tab`}
          className="relative block w-full aspect-video rounded-2xl overflow-hidden bg-black"
        >
          <img
            src={youtubeThumbUrl(exercise.videoId)}
            alt=""
            loading="lazy"
            onError={() => setThumbFailed(true)}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <span className="absolute inset-0 grid place-items-center" style={{ backgroundColor: "rgba(0,0,0,0.18)" }}>
            <span className="grid place-items-center w-14 h-14 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.94)" }}>
              <Play size={22} color={colors.ink} fill={colors.ink} aria-hidden="true" />
            </span>
          </span>
          <span
            className="absolute bottom-0 left-0 right-0 px-3.5 py-2.5 text-[14px] font-medium text-white truncate"
            style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.78))" }}
          >
            Watch the tutorial on YouTube
          </span>
        </a>
        <a
          href={searchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center min-h-[48px] text-[14px] underline"
          style={{ color: colors.muted }}
        >
          Prefer a different tutorial? Search YouTube
        </a>
      </div>
    );
  }

  const label = hasVideo
    ? "Preview unavailable. Search YouTube instead"
    : `Find a ${exercise.name.toLowerCase()} tutorial on YouTube`;

  return (
    <a
      href={searchUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 rounded-2xl px-4 py-3 min-h-[56px]"
      style={night ? { backgroundColor: colors.nightRaised, color: colors.onNight } : { backgroundColor: t.soft, color: t.dark }}
    >
      <Search size={20} className="flex-shrink-0" aria-hidden="true" />
      <span className="text-[15px] font-medium leading-snug">{label}</span>
      <ExternalLink size={16} className="flex-shrink-0 ml-auto" aria-hidden="true" />
    </a>
  );
}
