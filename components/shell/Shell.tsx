"use client";

import { useState } from "react";
import { MODULES } from "@/modules/manifest";
import { BootScreen } from "./BootScreen";
import { ModuleGrid } from "./ModuleGrid";
import { ModuleRegistry } from "./ModuleRegistry";
import { ModuleWindow } from "./ModuleWindow";
import { StatusBar } from "./StatusBar";
import { SystemBar } from "./SystemBar";
import { SystemLog, type LogEntry } from "./SystemLog";

const INITIAL_LOG: LogEntry[] = [
  { id: 0, text: ":: boot sequence complete" },
  { id: 1, text: `:: ${MODULES.length} modules registered` },
];

export function Shell() {
  const [booted, setBooted] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);
  const [log, setLog] = useState<LogEntry[]>(INITIAL_LOG);

  function addLog(text: string) {
    setLog((prev) => [...prev, { id: prev.length, text }]);
  }

  function openModule(id: string) {
    const mod = MODULES.find((m) => m.id === id);
    if (!mod) return;
    if (mod.status === "locked") {
      addLog(`:: [!] access denied: modules/${id}`);
      return;
    }
    setOpenId(id);
    addLog(`:: module loaded: ${id}`);
  }

  function closeModule() {
    if (openId) addLog(`:: module closed: ${openId}`);
    setOpenId(null);
  }

  if (!booted) return <BootScreen onContinue={() => setBooted(true)} />;

  const openMod = MODULES.find((m) => m.id === openId) ?? null;

  return (
    <div className="flex min-h-dvh flex-col lg:h-dvh">
      <SystemBar />
      <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[220px_1fr_280px]">
        <ModuleRegistry
          modules={MODULES}
          activeId={openId}
          onOpen={openModule}
        />
        <main className="min-h-0 overflow-y-auto p-3">
          {openMod ? (
            <ModuleWindow
              module={openMod}
              modules={MODULES}
              onClose={closeModule}
            />
          ) : (
            <ModuleGrid modules={MODULES} onOpen={openModule} />
          )}
        </main>
        <SystemLog entries={log} />
      </div>
      <StatusBar openName={openMod?.name ?? null} />
    </div>
  );
}
