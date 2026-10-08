import type { ModuleDefinition } from "@/modules/types";
import { StatusBadge } from "./StatusBadge";

type Props = {
  modules: ModuleDefinition[];
  onOpen: (id: string) => void;
};

export function ModuleGrid({ modules, onOpen }: Props) {
  return (
    <div>
      <h2 className="mb-3 text-label uppercase text-ink-muted">
        Modules // select to open
      </h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {modules.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => onOpen(m.id)}
            className={`flex cursor-pointer flex-col items-start gap-2 border border-line bg-panel p-3 text-left hover:border-signal ${
              m.status === "locked" ? "text-ink-muted" : "text-ink"
            }`}
          >
            <span className="text-label uppercase text-ink-muted">
              MODULE://{m.id}
            </span>
            <span className="text-title">{m.name}</span>
            <span className="text-small text-ink-muted">{m.description}</span>
            <StatusBadge status={m.status} />
          </button>
        ))}
      </div>
    </div>
  );
}
