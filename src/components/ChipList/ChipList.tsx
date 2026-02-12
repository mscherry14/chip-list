import { useRef } from "react";
import { Chip } from "../Chip/Chip";
import {
  ChipListPopover,
  ChipListPopoverTrigger,
  ChipListPopoverContent,
} from "../ChipListPopover/ChipListPopover";
import styles from "./ChipList.module.css";
import { useVisibleChips } from "./useVisibleChips";

export interface ChipData {
  id: number | string;
  label: string;
}

interface IChipListProps<T extends ChipData> {
  items: T[];
}

const ChipList = <T extends ChipData>({ items }: IChipListProps<T>) => {
  const chipRefs = useRef<(HTMLElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const moreButtonRef = useRef<HTMLButtonElement>(null);

  const visibleCount = useVisibleChips({
    items: items,
    containerRef: containerRef,
    chipRefs: chipRefs,
    moreButtonRef: moreButtonRef,
  });

  //TODO: gaps
  return (
    <div
      className={styles.chiplist}
      ref={(el) => {
        containerRef.current = el;
      }}
    >
      <div className={styles.chiplist}>
        {items.slice(0, visibleCount).map((item, index) => (
          <Chip key={item.id} label={item.label} selected={index % 2 == 0} variant="filled" color="neutral"/>
        ))}
        {visibleCount < items.length && (
          <ChipListPopover>
            <ChipListPopoverTrigger variant="filled"></ChipListPopoverTrigger>
            <ChipListPopoverContent>
              {items.slice(visibleCount).map((item, index) => (
                <Chip key={item.id} label={item.label} selected={index % 2 == 0}  variant="filled" color="neutral"/>
              ))}
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
            <Chip label={item.label} selected={index % 2 == 0}  variant="filled" color="neutral"/>
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
    </div>
  );
};

export { ChipList };