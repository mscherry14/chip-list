import { cx } from "../../utils/cx";
import type { ChipColor, ChipSize, ChipVariant } from "./Chip.types";
import styles from "./Chip.module.css";

interface IChipProps {
  label: React.ReactNode;

  selected?: boolean;
  onSelectChange?: () => void;

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
        className,
      )}
      onClick={onSelectChange}
    >
      {selected && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={cx(styles[`icon-size-${size}`])}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m4.5 12.75 6 6 9-13.5"
          />
        </svg>
      )}

      <span>{label}</span>
    </Component>
  );
};

export { Chip };
