import React from "react";
import { Activity, Dumbbell, Plus } from "lucide-react";
import { colors } from "../theme";

const TABS = [
  { id: "today", label: "Today", icon: Dumbbell },
  { id: "extras", label: "Extras", icon: Plus },
  { id: "progress", label: "Progress", icon: Activity },
];

// Bottom navigation, within thumb reach. Every tab has a text label.
export function TabBar({ active, onChange }) {
  return (
    <nav
      aria-label="Main"
      className="fixed bottom-0 inset-x-0 z-40"
      style={{
        backgroundColor: "rgba(255,255,255,0.94)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderTop: `1px solid ${colors.line}`,
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <div className="mx-auto max-w-xl grid grid-cols-3">
        {TABS.map(({ id, label, icon: Icon }) => {
          const isActive = id === active;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              aria-current={isActive ? "page" : undefined}
              className="min-h-[68px] flex flex-col items-center justify-center gap-1"
            >
              <span
                className="grid place-items-center w-16 h-8 rounded-full transition-colors"
                style={{ backgroundColor: isActive ? colors.pineSoft : "transparent" }}
              >
                <Icon size={22} color={isActive ? colors.pineDark : colors.muted} aria-hidden="true" />
              </span>
              <span
                className="text-[13px] leading-none"
                style={{ color: isActive ? colors.pineDark : colors.muted, fontWeight: isActive ? 700 : 500 }}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
