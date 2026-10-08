# Motion patterns

Los tokens no tienen familia de motion; estos son los patrones del sistema. Pensados para GSAP o CSS puro. Todos se desactivan con `prefers-reduced-motion: reduce` (el contenido aparece de una, el cursor queda fijo).

| Patrón | Duración | Easing | Uso |
| --- | --- | --- | --- |
| `typewriter` | 30ms por carácter | `steps(1)` | Líneas de boot, respuestas de terminal. Pausa de 200ms entre líneas. |
| `cursor-blink` | 530ms on / 530ms off | `steps(1)` | Cursor `_` al final del prompt, en `signal`. |
| `flicker` | 80ms, máximo 3 pulsos | `none` | Opacidad 0.85 a 1 al montar un módulo. Solo al entrar, nunca en loop. |
| `glitch` | 120ms, 2 a 3 cuadros | `none` | Desplazamiento horizontal de ±2px con copias en `glitch` y `signal`. Solo en errores y transiciones de sistema, no más de una vez cada 8s. |
| `window-open` | 160ms + barrido de 240ms | `power2.out` | Ventana que abre como encendido de CRT: `scaleY` de 0.02 a 1, luego una línea de scanline que barre de arriba a abajo. |
| `boot-step` | 180ms por línea | `none` | Líneas de arranque con `OK` / `WARN` que aparecen una a una. |

Ejemplo con GSAP:

```ts
gsap.timeline()
  .from(win, { scaleY: 0.02, duration: 0.16, ease: "power2.out", transformOrigin: "50% 50%" })
  .from(sweep, { yPercent: -100, duration: 0.24, ease: "none" }, "<0.04");
```

Regla de oro: un solo efecto fuerte por pantalla (`glitch` o `window-open`), el resto queda quieto para que el sistema se sienta estable.
