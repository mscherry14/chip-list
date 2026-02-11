import { cx } from "../../utils/cx";
import type { ChipColor, ChipSize, ChipVariant } from "./Chip.types";
import styles from "./Chip.module.css";

interface IChipProps {
  label: React.ReactNode;

  selected?: boolean;
  onSelectChange?: (selected: boolean) => void;

  disabled?: boolean;

  color?: ChipColor;
  variant?: ChipVariant;
  size?: ChipSize;

  className?: string;
}

const Chip: React.FC<IChipProps> = ({
  label,

  selected,
  onSelectChange,
  disabled,
  color = "neutral",
  variant = "filled",
  size = "medium",

  className,
}) => {
  const Component: React.ElementType = onSelectChange ? "button" : "div";

  return (
    <Component
      className={cx(
        styles.chip,
        styles[`variant-${variant}`],
        styles[`size-${size}`],
        styles[`color-${color}`],
        {
          [styles.selected]: selected,
          [styles.disabled]: disabled,
        },
        className
      )}
    >
      <span>{label}</span>
    </Component>
  );
};

export { Chip };
