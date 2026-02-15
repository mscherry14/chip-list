import { cx } from "../../utils/cx";
import type { ChipColor, ChipSize, ChipVariant } from "./Chip.types";
import styles from "./Chip.module.css";
import CheckIcon from "../../assets/CheckIcon";
import type { ExpandProps } from "../../utils/ExpandProps";

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

const Chip: React.FC<ExpandProps<ChipProps, HTMLElement>> = ({
  label,

  selected,
  onSelectChange,
  disabled,
  color = "neutral",
  variant = "filled",
  size = "medium",

  className,
  ...props
}) => {
  const Component: React.ElementType = onSelectChange ? "button" : "div";

  const handleKeyDown : React.KeyboardEventHandler<HTMLElement> = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (onSelectChange) onSelectChange();
    }
  }

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
      onKeyDown={onSelectChange ? handleKeyDown : undefined}
      {...props}
    >
      {selected && <CheckIcon className={cx(styles[`icon-size-${size}`])} />}
      <span>{label}</span>
    </Component>
  );
};

export { Chip };
