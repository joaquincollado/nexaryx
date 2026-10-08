import type { ModuleDefinition } from "@/modules/types";

type Props = {
  module: ModuleDefinition;
  modules: ModuleDefinition[];
  onClose: () => void;
};

export function ModuleWindow({ module: mod, modules, onClose }: Props) {
  const Body = mod.component;

  return (
    <section
      aria-label={mod.name}
      className="flex h-full min-h-96 flex-col border border-signal bg-panel shadow-glow-signal"
    >
      <div className="flex items-center justify-between border-b border-line px-3 py-1 text-label uppercase text-ink-muted">
        <span>MODULE://{mod.id}</span>
        <span className="flex gap-2">
          <button
            type="button"
            onClick={onClose}
            aria-label="Minimize module"
            className="cursor-pointer hover:text-signal"
          >
            [_]
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close module"
            className="cursor-pointer hover:text-signal"
          >
            [x]
          </button>
        </span>
      </div>
      <div className="min-h-0 flex-1 p-3">
        {Body ? (
          <Body modules={modules} />
        ) : (
          <p className="text-warn">
            WARN [~] interface not available in this build.
          </p>
        )}
      </div>
      <div className="border-t border-line px-3 py-1 text-small text-ink-muted">
        {`${mod.name} // ${mod.status.toUpperCase()}`}
      </div>
    </section>
  );
}
