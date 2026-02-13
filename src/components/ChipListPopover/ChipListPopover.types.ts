export type TriggerColor =
  | "neutral"
  | "accent"
  | "error"
  | "info"
  | "success"
  | "warning";
export type TriggerVariant = "filled" | "outlined";
export type TriggerSize = "small" | "medium";
export type TriggerStyle = {
  color?: TriggerColor;
  variant?: TriggerVariant;
  size?: TriggerSize;
};
