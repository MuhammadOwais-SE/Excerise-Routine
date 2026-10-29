import React from "react";
import { colors, tones } from "../theme";

// Every button in the app carries a text label. The icon is only an extra.
const SIZES = {
  md: "min-h-[48px] px-4 text-[15px]",
  lg: "min-h-[56px] px-5 text-[17px]",
  xl: "min-h-[64px] px-6 text-[18px]",
};

function variantStyle(variant, tone) {
  const t = tones[tone] || tones.pine;
  switch (variant) {
    case "soft":
      return { backgroundColor: t.soft, color: t.dark };
    case "light":
      return { backgroundColor: "#FFFFFF", color: colors.pineDark };
    case "outlineOnPine":
      return { backgroundColor: "transparent", color: "#FFFFFF", border: "1.5px solid rgba(255,255,255,0.55)" };
    case "mint":
      return { backgroundColor: t.nightFill, color: colors.night };
    case "night":
      return { backgroundColor: colors.nightRaised, color: colors.onNight };
    case "ghost":
      return { backgroundColor: "transparent", color: t.dark };
    case "ghostNight":
      return { backgroundColor: "transparent", color: colors.onNightMuted };
    default:
      return { backgroundColor: t.button, color: "#FFFFFF" };
  }
}

export function Button({
  variant = "solid",
  tone = "pine",
  size = "lg",
  full = false,
  icon: Icon,
  iconAfter = false,
  className = "",
  style,
  children,
  type = "button",
  ...rest
}) {
  const iconSize = size === "md" ? 18 : 20;
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-2xl font-semibold leading-tight transition-transform active:scale-[0.98] disabled:opacity-40 disabled:active:scale-100 ${SIZES[size]} ${full ? "w-full" : ""} ${className}`}
      style={{ ...variantStyle(variant, tone), ...style }}
      {...rest}
    >
      {Icon && !iconAfter ? <Icon size={iconSize} aria-hidden="true" /> : null}
      <span>{children}</span>
      {Icon && iconAfter ? <Icon size={iconSize} aria-hidden="true" /> : null}
    </button>
  );
}
