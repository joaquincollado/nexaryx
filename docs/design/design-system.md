Indira Portal (alias Nexaryx) es un portal a un sistema ficticio: la interfaz es un sistema operativo de consola cyberpunk, no un sitio web. Todo elemento tiene que sentirse parte de ese OS (UI diegética): módulos en ventanas, prompts, logs, barra de sistema.

## Fundamentos de contenido

- La voz del sistema es corta, técnica y en tercera persona del sistema: "boot sequence complete", "module loaded", "access denied". Sin signos de exclamación, sin emojis.
- Los mensajes de sistema (boot, logs, errores) van en inglés técnico. Los textos de lectura larga (dev logs, descripciones de proyectos) pueden ir en español; la voz sigue seca y concreta.
- Los labels van en MAYÚSCULAS con el estilo `label`. Los comandos y rutas van en minúscula: `open projects`, `modules/terminal`.
- Cada estado lleva palabra o glifo además de color: `OK`, `WARN`, `ERR`, `[!]`, `[~]`. Nunca solo un punto de color.
- Prefijos para dar contexto diegético: `>` para input del usuario, `::` para salida del sistema, `//` para comentarios y lore.

## Fundamentos visuales

- **Fondo y superficies.** La pantalla es `void`. Las ventanas de módulo y la barra de sistema son `panel`, con borde de 1px en `line`. Nunca uses gradientes de fondo ni blanco.
- **Color.** `ink` es el texto, `ink-muted` lo secundario, `signal` es el único color de acción: prompt, cursor, link, foco, selección. `glitch` es error y efectos de canal; `warn` es advertencia. Un relleno de `signal` o `glitch` lleva `on-signal` encima, nunca blanco.
- **Temas.** `green` es el default. `amber` es la variante fósforo ámbar (`data-theme="amber"`); mismos nombres de token, así que nada se reescribe al cambiar de tema.
- **Tipografía.** Todo en monoespaciada. `display-xl` y `display-md` (VT323) solo para nombres de sistema y títulos de módulo. Todo lo demás en IBM Plex Mono con `title`, `body`, `small`, `label`. No mezcles otras familias.
- **Espaciado.** Escala de 4px: `space-1` a `space-5`. Las ventanas usan `space-3` de padding; la grilla de módulos usa `space-3` de gap.
- **Esquinas.** `radius-0` en todo. `radius-sm` solo en badges chicos; `radius-dot` solo para leds de estado.
- **Bordes y grilla.** Bordes de 1px en `line`. Las grillas decorativas de fondo usan `line` al 30% de opacidad, una celda cada `space-5`.
- **Efectos CRT.** Overlay de scanlines fijo sobre toda la pantalla: `repeating-linear-gradient(to bottom, transparent 0 2px, var(--scanline) 2px 3px)`, con `pointer-events: none`. Viñeta opcional en `void`. El resplandor `glow-signal` va solo en el elemento activo; nunca en texto de párrafo.
- **Foco.** Anillo sólido de 2px en `signal` con offset de 2px, siempre visible (más de 14:1 sobre `void` y `panel`).
- **Imágenes.** Si hay imágenes, en monocromo teñido con `signal` o en dithering; nunca fotos a color sin tratar.
- **Movimiento.** Los patrones están en la sección Motion patterns. Todo se desactiva con `prefers-reduced-motion`.

## Iconografía

- No hay librería de íconos. Se usan glifos de texto: `>`, `_`, `[ ]`, `[x]`, `[!]`, `[~]`, `::`, `//`, `■`, `▲`, y caracteres de box-drawing (`┌ ─ ┐ │ └ ┘`) para marcos.
- Los glifos heredan el color del texto (`ink`, `signal`, `glitch`, `warn`). Nada de emojis.

## Anatomía de una ventana de módulo

- Marco: borde 1px `line`, fondo `panel`, `radius-0`. Ventana activa: borde `signal` y `glow-signal`.
- Barra de título: `label` en `ink-muted`, formato `MODULE://nombre`, con controles como glifos `[_] [x]` a la derecha.
- Contenido: `body` en `ink`, padding `space-3`. Prompt: `>` en `signal` seguido del cursor.
- Barra de estado inferior: `small` en `ink-muted`, separada con `//`.
