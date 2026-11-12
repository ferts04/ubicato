# UbiCato

Web app para celular que muestra los eventos de la UCB La Paz (campus Obrajes) sobre una maqueta 3D
y guía a pie por la ruta más rápida hasta el lugar del evento, con escaleras, rampas y pisos.

Reto FDI "¿Dónde es el evento?" · TECH MECH 2026.

Esta carpeta es la versión unificada de los tres proyectos del equipo. Es lo que se publica y se presenta.

## Qué hace

| Función | Dónde está en la app |
|---|---|
| Maqueta 3D del campus con 16 puntos (14 bloques, Ágora y Atrio) y sus caminos | Pestaña **Mapa** |
| Ruta más rápida entre dos puntos (Dijkstra), con metros, minutos, escaleras, rampas y pisos | Botón **Llévame** |
| Ruta sin gradas para silla de ruedas o carga | Casilla **Evitar gradas** en la ruta |
| Eventos reales de la Agenda Universitaria, con estado (En curso, Hoy, Próximos) | Pestaña **Eventos** |
| Eventos ordenados por cercanía | Pestaña **Cerca de ti** |
| Guía con la cámara: flecha que apunta al siguiente tramo, orientada con la brújula | Pestaña **Cámara** |
| Horario de clases, hora de salida y recordatorio de calendario | Pestaña **Mi horario** |
| Buscador de aulas, oficinas y servicios (D17, Kardex, Caja…) | Lupa, arriba |
| Puntos QR: cada punto del campus tiene un código que abre la app ubicada ahí | Icono QR, arriba |
| Agregar eventos que no están en la agenda | Icono de ajustes, arriba |
| Ubicación por GPS, con aviso de llegada | Botón **GPS** |
| Se instala como app y abre sin internet después de la primera visita | Menú del navegador → "Instalar" |

## Cómo ejecutarla

Tiene que servirse por HTTP; abrir `index.html` con doble clic no carga la agenda.

```bash
python -m http.server 8765
```

Luego abre `http://localhost:8765/` en el navegador, en tamaño de celular.

La cámara, la brújula y el GPS solo funcionan en `localhost` o en un sitio con HTTPS. Para probarlos en un
celular hay que publicar la carpeta (ver abajo).

## Cómo publicarla

Sube el contenido de esta carpeta a la raíz de un repositorio de GitHub y activa GitHub Pages
(Settings → Pages → rama `main`). La carpeta `.github/` debe quedar en la raíz del repositorio para que
la agenda se actualice sola cada hora.

Después de publicar, abre el icono QR de la app y toca **Imprimir todos**: los códigos ya salen con la
dirección pública.

## Archivos

| Archivo | Para qué sirve |
|---|---|
| `index.html` | Toda la app: HTML, CSS y JavaScript en un solo archivo. Sin instalación ni build. |
| `eventos.json` | Eventos vigentes de la Agenda Universitaria. Lo genera el script; no se edita a mano. |
| `eventos_extra.json` | Eventos que no están en la agenda. Se edita a mano, con el mismo formato. |
| `actualizar_agenda.py` | Genera `eventos.json` desde https://agenda.lpz.ucb.edu.bo/ (solo Python estándar). |
| `.github/workflows/agenda.yml` | Ejecuta el script cada hora en GitHub y guarda el cambio. |
| `manifest.webmanifest`, `sw.js`, `icon-*.png` | Instalación como app y funcionamiento sin internet. |
| `docs/PROPUESTA_MANTENIMIENTO.md` | Propuesta de implementación, mantenimiento y presupuesto que pide el reto. |
| `docs/GUION_DEMO.md` | Pasos sugeridos para la demostración. |
| `capturas/` | Capturas de pantalla de la app. |

Bibliotecas externas, cargadas por CDN con versión fija: `three@0.147.0` (maqueta 3D) y
`qrcode-generator@1.4.4` (códigos QR). No subir la versión de three sin revisar: `examples/js` ya no existe
en versiones posteriores.

## Qué salió de cada proyecto

| Proyecto original | Qué se usó | Qué no se usó y por qué |
|---|---|---|
| **UbiCato** (maqueta 3D) | Es la base: maqueta, caminos, Dijkstra, pisos, agenda, horario y diseño. | — |
| **UCB Navigator AR** | Las coordenadas GPS de los 14 bloques, que calibran el GPS y la brújula. La idea de los puntos QR y del buscador de dependencias. | Su flecha AR apuntaba en línea recta al bloque, sin seguir los caminos. El calibrador de 4 esquinas queda como herramienta aparte. |
| **Ubicato PWA** (Gael) | La vista de cámara que sigue la ruta tramo a tramo, los estados de los eventos, compartir, el aviso de llegada por GPS, la instalación como app y la administración de eventos. | Su mapa 2D y su editor de caminos: se pidió conservar la maqueta 3D. Sus coordenadas suponían que el plano mira al norte. |

### Dos datos que cambiaron al unir

- **Escala.** La maqueta suponía 2,2 m por unidad del plano. Al ajustarla con los 14 puntos GPS salió
  1,42 m por unidad (campus de unos 142 m de ancho), con un error medio de 4,6 m. Las distancias y los
  tiempos ahora usan ese valor.
- **Norte.** El plano oficial está girado unos 24° respecto del norte. El ajuste lo corrige; sin eso la
  flecha de la cámara apuntaría mal.

## Datos editables

Todo está al inicio de `index.html`, en el bloque **DATOS EDITABLES**: `BLOQUES` (pisos y qué hay en
cada uno), `NODOS` y `CAMINOS` (grafo, con `'e'` para escalera y `'r'` para rampa), `REFERENCIAS_GPS`
(coordenadas medidas) y las constantes de velocidad y tiempos.

Para depurar desde la consola del navegador existe `window.UCB`.

## Enlaces directos

- `?desde=pK` abre la app ubicada en un punto (es lo que lleva cada QR).
- `?ir=ag245` abre la app con la ruta a un evento.
- `?bloque=D&piso=5&lugar=Paraninfo` abre la app con la ruta a un lugar.

## Lo que se probó y lo que falta

Probado en el navegador, en tamaño de celular, sin errores en consola: rutas a los 16 puntos, ruta sin
gradas, lectura de la agenda, filtros de eventos, buscador, generación de QR, enlaces directos, alta y
baja de eventos, horario, cambio de campus, vista de cámara en modo simulación y GPS con posiciones
simuladas (dentro del campus, llegada al destino y fuera del campus). El script de la agenda se ejecutó
contra la página real.

Falta probar en el campus, con un celular y la app publicada en HTTPS:

- La cámara real y la brújula (en computadora solo corre el modo simulación).
- El GPS real. La calibración sale de 14 puntos medidos y falta confirmarla caminando.
- El flujo de GitHub Actions, que nunca se ejecutó en GitHub.

Supuestos que siguen en pie:

- Los pisos de F2, G1, G2, H, I y L están puestos por similitud; el reparto D1–D30 de a 6 por piso es una
  suposición acordada.
- El terreno es plano: las escaleras se dibujan como peldaños sobre suelo llano.
- El ingreso vehicular oeste no se verificó en el campus.
- Al Bloque L no hay ruta sin gradas desde el ingreso principal: solo se llega sin gradas por el ingreso vehicular este (sur). La app lo avisa.
- Arquitectura, Diseño y Medicina son solo un bloque de referencia, sin pisos ni rutas.
- La agenda no publica hora de fin: un evento de hoy que ya empezó figura "En curso" hasta el fin del día.
- "Meca Gala" en `eventos_extra.json` tiene fecha y hora de ejemplo.
- La administración de eventos no tiene contraseña: lo que se agrega queda solo en ese celular hasta que
  alguien lo copia a `eventos_extra.json`.

## Datos personales

El material original incluía un PDF de horarios de una estudiante con su registro y carnet. No está en
esta carpeta y no debe subirse a ningún repositorio. El horario de ejemplo usa solo siglas de materias
y aulas.
