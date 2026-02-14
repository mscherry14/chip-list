import { useLayoutEffect, useState } from "react";

interface UseVisibleChipsParams {
  containerRef: React.RefObject<HTMLDivElement | null>;
  chipRefs: React.RefObject<(HTMLElement | null)[]>;
  moreButtonRef: React.RefObject<HTMLButtonElement | null>;
}

export function useVisibleChips({
  containerRef,
  chipRefs,
  moreButtonRef,
}: UseVisibleChipsParams) : number {
  const [visibleCount, setVisibleCount] = useState(chipRefs.current.length);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const calculate = () => {
      const containerWidth = container.offsetWidth;
      const gap = (() => {
        if (chipRefs.current?.length < 2) return 0;

        const first = chipRefs.current[0];
        const second = chipRefs.current[1];

        if (!first || !second) return 0;
        const firstRect = first.getBoundingClientRect();
        const secondRect = second.getBoundingClientRect();

        return secondRect.left - firstRect.right;
      })();

      let sum = 0;
      let count = 0;

      const moreWidth = moreButtonRef.current?.getBoundingClientRect().width ?? 0;

      for (let i = 0; i < chipRefs.current.length; i++) {
        const el = chipRefs.current[i];
        if (!el) continue;

        const width = el.getBoundingClientRect().width;

        const remaining = chipRefs.current?.length - (count + 1);

        const needMoreButton = remaining > 0;

        if (
          sum + width + (needMoreButton ? moreWidth + gap : 0) >
          containerWidth
        ) {
          break;
        }

        sum += width + gap;
        count++;
      }

      setVisibleCount(count);
    };

    const observer = new ResizeObserver(calculate);
    observer.observe(container);

    calculate();

    return () => observer.disconnect();
  }, [containerRef, chipRefs, moreButtonRef]);

  return visibleCount;
}
