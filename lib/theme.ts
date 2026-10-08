export type Theme = "green" | "amber";

export const THEMES: readonly Theme[] = ["green", "amber"];

const listeners = new Set<() => void>();

export function subscribeTheme(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getTheme(): Theme {
  return document.documentElement.dataset.theme === "amber" ? "amber" : "green";
}

export function getServerTheme(): Theme {
  return "green";
}

export function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  listeners.forEach((listener) => listener());
}
