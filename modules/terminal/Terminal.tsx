"use client";

import { useEffect, useRef, useState } from "react";
import { THEMES, setTheme, type Theme } from "@/lib/theme";
import type { ModuleProps } from "../types";

type Line = { kind: "in" | "out" | "err"; text: string };

const SUGGESTIONS = [
  "help",
  "modules",
  "theme green",
  "theme amber",
  "clear",
  "whoami",
  "about",
];

const BANNER: Line[] = [
  { kind: "out", text: "terminal ready. type 'help' for available commands." },
];

function run(raw: string, modules: ModuleProps["modules"]): Line[] | "clear" {
  const [cmd, ...args] = raw.trim().split(/\s+/);

  switch (cmd) {
    case "help":
      return [
        { kind: "out", text: "help      list commands" },
        { kind: "out", text: "modules   list registered modules" },
        { kind: "out", text: "theme     theme green | amber" },
        { kind: "out", text: "whoami    show current session" },
        { kind: "out", text: "about     about this system" },
        { kind: "out", text: "clear     clear the screen" },
      ];
    case "modules":
      return modules.map((m) => ({
        kind: "out" as const,
        text: `modules/${m.id}  [${m.status.toUpperCase()}]`,
      }));
    case "theme": {
      const theme = args[0] as Theme | undefined;
      if (theme && THEMES.includes(theme)) {
        setTheme(theme);
        return [{ kind: "out", text: `theme set: ${theme}` }];
      }
      return [{ kind: "err", text: "ERR [!] usage: theme green | amber" }];
    }
    case "whoami":
      return [{ kind: "out", text: "guest@indira // access level: read-only" }];
    case "about":
      return [
        { kind: "out", text: "Indira Portal (Nexaryx)" },
        { kind: "out", text: "// recovered system, reconstruction in progress" },
      ];
    case "clear":
      return "clear";
    default:
      return [{ kind: "err", text: `ERR [!] unknown command: ${cmd}` }];
  }
}

export function Terminal({ modules }: ModuleProps) {
  const [lines, setLines] = useState<Line[]>(BANNER);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const suggestion = input
    ? SUGGESTIONS.find((s) => s.startsWith(input) && s !== input)
    : undefined;
  const ghost = suggestion ? suggestion.slice(input.length) : "";

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  function submit() {
    if (!input.trim()) return;
    const result = run(input, modules);
    setLines((prev) =>
      result === "clear"
        ? []
        : [...prev, { kind: "in", text: input }, ...result],
    );
    setInput("");
  }

  return (
    <div
      className="flex h-full min-h-72 flex-col"
      onClick={() => inputRef.current?.focus()}
    >
      <div ref={scrollRef} className="flex-1 overflow-y-auto" role="log">
        {lines.map((line, i) => (
          <div
            key={i}
            className={line.kind === "err" ? "text-glitch" : "text-ink"}
          >
            {line.kind === "in" && <span className="text-signal">&gt; </span>}
            {line.kind === "out" && <span className="text-ink-muted">:: </span>}
            {line.text}
          </div>
        ))}
      </div>

      <div className="relative mt-3 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-signal">
        <div aria-hidden className="whitespace-pre">
          <span className="text-signal">&gt; </span>
          {input}
          <span className="text-signal">_</span>
          <span className="text-ink-muted">{ghost}</span>
        </div>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") submit();
            if ((e.key === "Tab" || e.key === "ArrowRight") && suggestion) {
              e.preventDefault();
              setInput(suggestion);
            }
          }}
          aria-label="terminal input"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          className="absolute inset-0 w-full cursor-text bg-transparent text-transparent caret-transparent outline-none"
        />
      </div>
    </div>
  );
}
