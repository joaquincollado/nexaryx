"use client";

import { useEffect, useRef } from "react";

export type LogEntry = { id: number; text: string };

export function SystemLog({ entries }: { entries: LogEntry[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [entries]);

  return (
    <aside className="flex min-h-0 flex-col border-t border-line bg-panel p-3 lg:border-t-0 lg:border-l">
      <h2 className="mb-2 text-label uppercase text-ink-muted">System log</h2>
      <div
        ref={ref}
        role="log"
        className="max-h-48 flex-1 overflow-y-auto text-small lg:max-h-none"
      >
        {entries.map((entry) => (
          <div key={entry.id}>{entry.text}</div>
        ))}
      </div>
    </aside>
  );
}
