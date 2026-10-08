# Indira Portal — handoff de diseño (EN-10)

Estética: consola cyberpunk / OS ficticio. No es un sitio web tradicional: se navega system → módulo → interfaz.

## Qué hay en esta carpeta

| Archivo | Para qué |
| --- | --- |
| `tokens.css` | Variables CSS de los dos temas (`green`, `amber`), espaciado, esquinas, estilos de texto y efectos CRT. Es la fuente de verdad. |
| `tailwind.theme.ts` | Los mismos tokens para Tailwind, apuntando a las variables de `tokens.css`. |
| `design-system.md` | Brand book: reglas de uso de color, tipografía, bordes, iconografía y anatomía de ventana de módulo. |
| `motion.md` | Patrones de animación (typewriter, glitch, window-open, boot-step) con ejemplo de GSAP. |

## Setup en Next.js

1. Importar `docs/design/tokens.css` en el CSS global (o moverlo a `app/`).
2. En `app/layout.tsx`, cargar las fuentes con `next/font` y poner el tema en `<html>`:

```tsx
import { VT323, IBM_Plex_Mono } from "next/font/google";

const vt323 = VT323({ weight: "400", subsets: ["latin"], variable: "--font-vt323" });
const plexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-plex-mono",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" data-theme="green" className={`${vt323.variable} ${plexMono.variable}`}>
      <body className="bg-void text-ink font-mono text-body">{children}</body>
    </html>
  );
}
```

3. Registrar `indiraTheme` en la config de Tailwind (ver comentario en `tailwind.theme.ts`).

## Pantallas a implementar (mockups ya diseñados)

1. **Shell:** barra de sistema arriba, registro de módulos a la izquierda, grilla de tiles de módulo (ONLINE / BETA / LOCKED), log del sistema a la derecha, barra de estado abajo.
2. **Boot screen:** nombre en `display-xl`, líneas de arranque con `OK` / `WARN [~]`, barra de carga con glifos, panel SYSTEM STATUS, `PRESS [ENTER] TO CONTINUE`.
3. **Módulo terminal:** ventana con borde `signal` y `glow-signal`, barra de título `MODULE://terminal`, historial de comandos, prompt con cursor y autocompletado fantasma.

Texto de ejemplo y estructura de cada pantalla: ver las pantallas "01 Boot screen", "02 Main shell" y "03 Terminal module" del canvas "Indira Portal Mockups" en Claude Design.

## Reglas que no hay que romper

- Todo en monoespaciada. `display-*` (VT323) solo para nombres de sistema y títulos de módulo.
- Esquinas rectas (`rounded-none`). `rounded-sm` solo en badges chicos, `rounded-dot` solo en leds de estado.
- `signal` es el único color de acción. Un relleno de `signal` o `glitch` lleva `text-on-signal` encima, nunca blanco.
- Cada estado lleva palabra o glifo además de color (`OK`, `WARN [~]`, `ERR [!]`).
- `glow-signal` solo en el elemento activo, uno por pantalla como máximo.
- Todo movimiento se desactiva con `prefers-reduced-motion`.
- Texto del sistema (boot, logs, errores) en inglés técnico; textos largos en español.

## Arquitectura

- Cada módulo es independiente y pluggable: una carpeta con su componente, su metadata (id, nombre, descripción, estado) y su registro en un manifest central. Agregar un módulo no debe tocar el core.
- Navegación tipo app (estado del sistema), no rutas de blog.
- Por ahora sin animaciones: GSAP queda para una task aparte usando `motion.md`.

## Prompt de arranque para Claude Code

```
Tarea: EN-10 de Notion (Indira Portal), armar el layout general de la home.
Estética: consola cyberpunk / OS ficticio. Leé docs/design/README.md, tokens.css y design-system.md antes de tocar nada.
Stack: Next.js + React + TypeScript, fuentes con next/font (VT323 e IBM Plex Mono), Tailwind.
Orden: 1) tokens y estilos globales (scanlines, viñeta, dos temas),
2) shell con barra de sistema y registro de módulos,
3) boot screen, 4) módulo terminal.
Cada módulo independiente y pluggable, registrado en un manifest central.
Sin animaciones todavía; GSAP queda para otra task. Mostrame el plan antes de escribir código.
```
