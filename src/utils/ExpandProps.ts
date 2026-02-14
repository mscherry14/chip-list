export type ExpandProps<T, E extends HTMLElement> = T &
  Omit<React.HTMLAttributes<E>, keyof T>;
