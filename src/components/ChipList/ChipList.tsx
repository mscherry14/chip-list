import { useRef, useCallback, useEffect } from "react";
import { Chip } from "../Chip/Chip";
import {
  ChipListPopover,
  ChipListPopoverTrigger,
  ChipListPopoverContent,
} from "../ChipListPopover/ChipListPopover";
import styles from "./ChipList.module.css";
import type { ChipID, ChipData } from "./ChipList.types";
import { useVisibleChips } from "./useVisibleChips";
import { useMultiSelect } from "./useMultiSelect";
import type { ChipStyle } from "../Chip/Chip.types";
import type { TriggerStyle } from "../ChipListPopover/ChipListPopover.types";

interface ChipListProps<T extends ChipData> {
  items: T[];
  chipStyle?: ChipStyle;
  triggerStyle?: TriggerStyle;
}

const ChipList = <T extends ChipData>({
  items,
  chipStyle,
  triggerStyle,
}: ChipListProps<T>) => {
  const chipRefs = useRef<(HTMLElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const moreButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    chipRefs.current.length = items.length;
  }, [items.length]);

  const visibleCount = useVisibleChips({
    containerRef: containerRef,
    chipRefs: chipRefs,
    moreButtonRef: moreButtonRef,
  });

  const { toggle, isSelected } = useMultiSelect<ChipID>();

  // remove if trigger not chip-styled (or/and we don't want it by default)
  if (!triggerStyle) {
    triggerStyle = chipStyle;
  }

  const defaultRenderChip = useCallback(
    (item: T) => (
      <Chip
        key={item.id}
        label={item.label}
        selected={isSelected(item.id)}
        onSelectChange={() => {
          toggle(item.id);
        }}
        variant={chipStyle?.variant}
        color={chipStyle?.color}
        size={chipStyle?.size}
      />
    ),
    [isSelected, toggle, chipStyle],
  );

  return (
    <>
      <div
        className={styles.chiplist}
        ref={(el) => {
          containerRef.current = el;
        }}
      >
        {items.slice(0, visibleCount).map(defaultRenderChip)}
        {visibleCount < items.length && (
          <ChipListPopover>
            <ChipListPopoverTrigger
              variant={triggerStyle?.variant}
              color={triggerStyle?.color}
              size={triggerStyle?.size}
            ></ChipListPopoverTrigger>
            <ChipListPopoverContent>
              {items.slice(visibleCount).map(defaultRenderChip)}
            </ChipListPopoverContent>
          </ChipListPopover>
        )}
      </div>

      <div className={styles.chiplist + " " + styles.measurable}>
        {items.map((item, index) => (
          <div
            ref={(el) => {
              chipRefs.current[index] = el;
            }}
            key={item.id}
          >
            {defaultRenderChip(item)}
          </div>
        ))}
        {
          <ChipListPopover>
            <ChipListPopoverTrigger
              ref={moreButtonRef}
            ></ChipListPopoverTrigger>
          </ChipListPopover>
        }
      </div>
    </>
  );
};

export { ChipList };
