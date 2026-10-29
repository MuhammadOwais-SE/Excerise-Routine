import React from "react";

// Shared page frame: safe-area padding, room for the bottom tab bar, one heading.
export function ScreenShell({ eyebrow = "Uptime", title, right = null, children }) {
  return (
    <main
      className="mx-auto max-w-xl px-4"
      style={{
        paddingTop: "calc(env(safe-area-inset-top) + 18px)",
        paddingBottom: "calc(68px + env(safe-area-inset-bottom) + 28px)",
      }}
    >
      <header className="mb-5">
        <div className="flex items-center justify-between gap-3 min-h-[40px]">
          <p className="font-data text-[13px] font-semibold tracking-[0.14em] uppercase text-pine">{eyebrow}</p>
          {right}
        </div>
        <h1 className="mt-1 text-[30px] leading-[1.1] font-bold tracking-tight text-ink">{title}</h1>
      </header>
      <div className="space-y-5">{children}</div>
    </main>
  );
}
