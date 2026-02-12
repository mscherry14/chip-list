import { useState, useCallback } from "react";

interface UseMultiSelectReturn<T> {
  selectedIds: Set<T>;
  toggle: (id: T) => void;
  isSelected: (id: T) => boolean;
}

export function useMultiSelect<T>(): UseMultiSelectReturn<T> {
  const [selectedIds, setSelectedIds] = useState<Set<T>>(
    new Set<T>(),
  );

  const toggle = useCallback((id: T) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const isSelected = useCallback(
    (id: T) => selectedIds.has(id),
    [selectedIds],
  );

  return {
    selectedIds,
    toggle,
    isSelected,
  };
}
