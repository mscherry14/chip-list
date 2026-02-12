import { useLayoutEffect, useState } from "react";

interface Params<T> {
  items: T[];
  containerRef: React.RefObject<HTMLDivElement | null>;
  chipRefs: React.RefObject<(HTMLElement | null)[]>;
  moreButtonRef: React.RefObject<HTMLButtonElement | null>;
}

export function useVisibleChips<T>({
  items,
  containerRef,
  chipRefs,
  moreButtonRef,
}: Params<T>) {
  const [visibleCount, setVisibleCount] = useState(items.length);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const calculate = () => {
      const containerWidth = container.offsetWidth;

      let sum = 0;
      let count = 0;

      const moreWidth = moreButtonRef.current?.offsetWidth ?? 0;

      for (let i = 0; i < chipRefs.current.length; i++) {
        const el = chipRefs.current[i];
        if (!el) continue;

        const width = el.offsetWidth;
        //const gap = 0; TODO: gaps

        const remaining = items.length - (count + 1);

        const needMoreButton = remaining > 0;

        if (sum + width + (needMoreButton ? moreWidth : 0) > containerWidth) {
          break;
        }

        sum += width; //+ gap;
        count++;
      }

      setVisibleCount(count);
    };

    const observer = new ResizeObserver(calculate);
    observer.observe(container);

    calculate();

    return () => observer.disconnect();
  }, [items, containerRef, chipRefs, moreButtonRef]);

  return visibleCount;
}
