// Single source of truth for colors. tailwind.config.js imports this, so the same
// names work as classes (bg-pine, text-muted, border-line) and in inline styles.
export const colors = {
  canvas: "#F4F7F3",
  surface: "#FFFFFF",
  line: "#E1E8DE",
  checkbox: "#7C8F87",
  ink: "#16231F",
  muted: "#5C6F68",
  pine: "#2F6F5E",
  pineDark: "#1F4B3D",
  pineSoft: "#DCEAE3",
  sun: "#C97A2E",
  // Flame icon on the soft amber chip (3:1 against sunSoft, which plain sun does not reach)
  sunIcon: "#B8691F",
  sunDark: "#8A5A26",
  sunSoft: "#F4E3CE",
  steel: "#5E7A8C",
  heat0: "#E7ECE4",
  heat1: "#9CC9B0",
  heat2: "#6FA98C",
  heat3: "#2F6F5E",
  // Workout player (dark, easy to read from a distance)
  night: "#10201B",
  nightRaised: "#1A2E27",
  nightLine: "#2A4339",
  onNight: "#F4F7F3",
  onNightMuted: "#A9BDB5",
  mint: "#7FD1B0",
  sunLight: "#F0A95B",
  // Muted text on the pine hero card
  onPine: "#DCEFE6",
};

// Two accent families. Required routine uses pine, optional extras use sun.
export const tones = {
  pine: {
    solid: colors.pine,
    button: colors.pine,
    dark: colors.pineDark,
    soft: colors.pineSoft,
    nightFill: colors.mint,
  },
  sun: {
    solid: colors.sun,
    button: colors.sunDark,
    dark: colors.sunDark,
    soft: colors.sunSoft,
    nightFill: colors.sunLight,
  },
};

export const cardShadow = "0 1px 2px rgba(22,35,31,0.04), 0 10px 28px -14px rgba(22,35,31,0.16)";
