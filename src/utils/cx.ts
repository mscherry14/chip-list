type ClassValue =
  | string
  | undefined
  | null
  | false
  | Record<string, boolean | undefined | null>;

export function cx(...args: ClassValue[]): string {
  const classes: string[] = [];

  for (const arg of args) {
    if (!arg) continue;

    if (typeof arg === "string") {
      classes.push(arg);
      continue;
    }

    if (typeof arg === "object") {
      for (const key in arg) {
        if (arg[key]) classes.push(key);
      }
    }
  }

  return classes.join(" ");
}
