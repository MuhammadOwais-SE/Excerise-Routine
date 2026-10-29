import React from "react";

export function YouTubeNote({ className = "" }) {
  return (
    <p className={`text-[13px] leading-snug text-muted ${className}`}>
      Videos open on YouTube. Views are stored in your YouTube history and used per YouTube's Terms of Service.
    </p>
  );
}
