"use client";

import { useSyncExternalStore } from "react";
import {
  getServerTheme,
  getTheme,
  setTheme,
  subscribeTheme,
} from "@/lib/theme";

export function SystemBar() {
  const theme = useSyncExternalStore(subscribeTheme, getTheme, getServerTheme);

  return (
    <header className="flex items-center justify-between border-b border-line bg-panel px-3 py-2">
      <span className="text-label uppercase">
        <span className="text-signal">■</span> INDIRA PORTAL // NEXARYX
      </span>
      <button
        type="button"
        onClick={() => setTheme(theme === "green" ? "amber" : "green")}
        className="cursor-pointer text-label uppercase text-ink-muted hover:text-signal"
      >
        [THEME: {theme}]
      </button>
    </header>
  );
}
