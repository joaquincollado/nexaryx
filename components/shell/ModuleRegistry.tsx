import type { ModuleDefinition } from "@/modules/types";
import { StatusBadge } from "./StatusBadge";

type Props = {
  modules: ModuleDefinition[];
  activeId: string | null;
  onOpen: (id: string) => void;
};

export function ModuleRegistry({ modules, activeId, onOpen }: Props) {
  return (
    <nav
      aria-label="Module registry"
      className="border-b border-line bg-panel p-3 lg:border-r lg:border-b-0"
    >
      <h2 className="mb-2 text-label uppercase text-ink-muted">Registry</h2>
      <ul className="space-y-1">
        {modules.map((m) => (
          <li key={m.id}>
            <button
              type="button"
              onClick={() => onOpen(m.id)}
              aria-current={m.id === activeId ? "true" : undefined}
              className={`flex w-full cursor-pointer flex-col items-start py-1 text-left hover:text-signal ${
                m.id === activeId ? "text-signal" : "text-ink"
              }`}
            >
              <span>
                {m.id === activeId ? "> " : "  "}
                {m.id}
              </span>
              <StatusBadge status={m.status} />
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
