# UbiCato · propuesta de implementación y mantenimiento

Reto FDI "¿Dónde es el evento?" · TECH MECH 2026

Los montos en bolivianos son **estimaciones del equipo** y hay que confirmarlos con cotizaciones antes
de presentarlos como definitivos.

## 1. Cómo se actualizan los eventos

| Fuente | Quién la actualiza | Cada cuánto | Trabajo manual |
|---|---|---|---|
| Agenda Universitaria (agenda.lpz.ucb.edu.bo) | Las unidades que ya cargan sus eventos ahí | Cada hora, automático | Ninguno |
| `eventos_extra.json` | El administrador de UbiCato | Cuando haga falta | Unos 5 minutos por evento |

La agenda oficial ya existe y ya se mantiene. Un script (`actualizar_agenda.py`) la lee cada hora, traduce
el lugar de cada evento a bloque y piso, y publica el resultado. Nadie tiene que cargar dos veces el
mismo evento.

Para los eventos que no están en la agenda, el administrador abre el icono de ajustes en la app, llena
el formulario, toca "Copiar para publicar" y pega el resultado en `eventos_extra.json`.

## 2. Cómo se actualiza el mapa

El mapa cambia poco: solo cuando se abre un bloque, se mueve una oficina o se cierra un camino.

| Cambio | Qué se edita en `index.html` | Tiempo estimado |
|---|---|---|
| Una oficina o aula cambia de piso | La lista `niveles` del bloque | 5 minutos |
| Se abre o se cierra un camino | `NODOS` y `CAMINOS` | 15 minutos |
| Se construye una rampa | El tercer valor del camino pasa de `'e'` a `'r'` | 5 minutos |
| Bloque nuevo | Un objeto nuevo en `BLOQUES` con su contorno | 1 hora |

Cada cambio se guarda en GitHub, así que queda el historial y se puede deshacer.

## 3. Quién lo administra

| Rol | Quién | Qué hace | Dedicación |
|---|---|---|---|
| Responsable | Carrera de Ingeniería Mecatrónica (o Marketing y Comunicación) | Decide qué se publica y aprueba cambios del mapa | 1 hora al mes |
| Administrador | Un auxiliar o becario | Carga eventos extra, corrige el mapa, repone códigos QR | 6 horas al mes |
| Soporte técnico | Sociedad científica o centro de estudiantes de la carrera | Atiende fallas y mejoras | Según necesidad |

## 4. Costo de mantenimiento mensual

Tope del reto: **Bs 500 al mes**.

| Concepto | Detalle | Bs al mes (estimado) |
|---|---|---|
| Alojamiento | GitHub Pages, plan gratuito | 0 |
| Sincronización de la agenda | GitHub Actions, gratuito en repositorios públicos | 0 |
| Mapas | Maqueta propia; no usa Google Maps ni otra API de pago | 0 |
| Dominio | Subdominio de la UCB (sin costo) o dominio propio prorrateado | 15 |
| Reposición de códigos QR | Unas 4 placas impresas y laminadas al mes | 60 |
| Administrador | Estipendio de auxiliar, 6 horas al mes | 300 |
| Imprevistos | Reserva | 75 |
| **Total** | | **450** |

Queda un margen de Bs 50 bajo el tope. Si el administrador es un becario que ya recibe apoyo de la
universidad, el costo en efectivo baja a unos Bs 150 al mes.

## 5. Costo de implementación inicial

| Concepto | Detalle | Bs (estimado) |
|---|---|---|
| Desarrollo | Hecho por el equipo durante la hackathon | 0 |
| Señalética QR | 20 placas (una por punto de partida), impresas y laminadas | 500 |
| Verificación en campo | Medio día recorriendo el campus para confirmar GPS, pisos y caminos | 0 |
| Dominio propio, primer año (opcional) | Solo si no se usa un subdominio de la UCB | 180 |
| **Total** | | **680** |

## 6. Riesgos y qué pasa si algo falla

| Riesgo | Consecuencia | Qué hace la app |
|---|---|---|
| La página de la agenda cambia de formato | El script deja de leer eventos | Sigue mostrando los últimos eventos guardados; hay que ajustar el script |
| No hay internet en el campus | No llega la agenda nueva | Abre desde la caché, con la maqueta y los últimos eventos |
| El GPS falla dentro de un bloque | La ubicación salta | El usuario elige "Estoy en…" o escanea un QR |
| El celular no tiene brújula | La flecha no se orienta sola | La cámara pasa a modo manual: se gira arrastrando |
| Se despega o se daña un QR | Ese punto queda sin código | Se reimprime desde la propia app |

## 7. Qué falta para pasar de prototipo a servicio

1. Publicar en HTTPS y probar cámara, brújula y GPS caminando por el campus.
2. Confirmar con Infraestructura los pisos marcados "por similitud" (F2, G1, G2, H, I y L).
3. Poner contraseña a la administración de eventos.
4. Modelar los campus de Arquitectura, Diseño y Medicina.
