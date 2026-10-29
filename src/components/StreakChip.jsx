import React from "react";
import { Flame } from "lucide-react";
import { colors } from "../theme";

export function StreakChip({ streak }) {
  return (
    <div
      className="flex items-center gap-1.5 rounded-full px-3.5 py-2 flex-shrink-0"
      style={{ backgroundColor: colors.sunSoft }}
      role="img"
      aria-label={`${streak} day streak`}
    >
      <Flame size={18} color={colors.sunIcon} aria-hidden="true" />
      <span className="font-data font-semibold text-[15px]" style={{ color: colors.sunDark }}>
        {streak}
      </span>
      <span className="text-[14px] font-medium" style={{ color: colors.sunDark }}>
        day streak
      </span>
    </div>
  );
}
