import type { ModuleStatus } from "@/modules/types";

const BADGE: Record<ModuleStatus, { glyph: string; className: string }> = {
  online: { glyph: "■", className: "text-signal border-signal" },
  beta: { glyph: "▲", className: "text-warn border-warn" },
  locked: { glyph: "[!]", className: "text-ink-muted border-line" },
};

export function StatusBadge({ status }: { status: ModuleStatus }) {
  const { glyph, className } = BADGE[status];
  return (
    <span
      className={`inline-block rounded-sm border px-1 text-label uppercase ${className}`}
    >
      {glyph} {status}
    </span>
  );
}
