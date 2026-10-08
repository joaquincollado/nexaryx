export function StatusBar({ openName }: { openName: string | null }) {
  return (
    <footer className="border-t border-line bg-panel px-3 py-2 text-small text-ink-muted">
      SYS ONLINE // SESSION: guest // ACTIVE: {openName ?? "none"}
    </footer>
  );
}
