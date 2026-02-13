export type ChipColor =
  | "neutral"
  | "accent"
  | "error"
  | "info"
  | "success"
  | "warning";

export type ChipSize = "small" | "medium";

export type ChipVariant = "filled" | "outlined";

export type ChipStyle = {
  color?: ChipColor;
  variant?: ChipVariant;
  size?: ChipSize;
};