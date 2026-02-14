import { cx } from "../../utils/cx";
import type { ChipColor, ChipSize, ChipVariant } from "./Chip.types";
import styles from "./Chip.module.css";
import CheckIcon from "../../assets/CheckIcon";

interface ChipProps {
  label: React.ReactNode;

  selected?: boolean;
  onSelectChange?: () => void;

  disabled?: boolean;

  color?: ChipColor;
  variant?: ChipVariant;
  size?: ChipSize;

  className?: string;
}

const Chip: React.FC<ChipProps> = ({
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
        {
          [styles[`chip-button`]]: !!onSelectChange,
        },
        styles[`variant-${variant}`],
        styles[`size-${size}`],
        styles[`color-${color}`],
        {
          [styles.selected]: selected,
          [styles.disabled]: disabled,
        },
        className,
      )}
      onClick={onSelectChange}
    >
      {selected && <CheckIcon className={cx(styles[`icon-size-${size}`])} />}
      <span>{label}</span>
    </Component>
  );
};

export { Chip };
