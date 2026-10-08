"use client";

import { useEffect } from "react";

const BOOT_LINES = [
  { status: "OK", text: "kernel loaded" },
  { status: "OK", text: "module registry mounted" },
  { status: "OK", text: "display driver: crt-phosphor" },
  { status: "WARN [~]", text: "cascade-engine running in beta" },
  { status: "OK", text: "boot sequence complete" },
];

export function BootScreen({ onContinue }: { onContinue: () => void }) {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Enter") onContinue();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onContinue]);

  return (
    <main className="mx-auto flex min-h-dvh max-w-4xl flex-col justify-center gap-6 p-5">
      <h1 className="font-display text-display-xl text-signal">
        INDIRA PORTAL
      </h1>

      <ul className="space-y-1">
        {BOOT_LINES.map((line) => (
          <li key={line.text}>
            <span
              className={`inline-block w-20 ${
                line.status === "OK" ? "text-signal" : "text-warn"
              }`}
            >
              {line.status}
            </span>
            :: {line.text}
          </li>
        ))}
      </ul>

      <p aria-label="Loading 100%">
        <span aria-hidden>[██████████████████████] 100%</span>
      </p>

      <section className="border border-line bg-panel p-3">
        <h2 className="mb-2 text-label uppercase text-ink-muted">
          System status
        </h2>
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 text-small">
          <dt className="text-ink-muted">CORE</dt>
          <dd>ONLINE</dd>
          <dt className="text-ink-muted">MODULES</dt>
          <dd>4 registered</dd>
          <dt className="text-ink-muted">DISPLAY</dt>
          <dd>OK</dd>
        </dl>
      </section>

      <button
        type="button"
        onClick={onContinue}
        className="cursor-pointer self-start text-signal"
      >
        PRESS [ENTER] TO CONTINUE_
      </button>
    </main>
  );
}
