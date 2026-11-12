# UbiCato · guion de la demostración

Dura unos 4 minutos. Abre la app en tamaño de celular antes de empezar.

Si presentas desde la computadora, la cámara corre en modo simulación: la flecha se gira arrastrando.
Para mostrar la cámara y la brújula reales hace falta un celular con la app publicada en HTTPS.

| # | Qué dices | Qué haces en la app |
|---|---|---|
| 1 | "Saber dónde es un evento en la UCB hoy depende de preguntar. UbiCato lo resuelve en el celular, sin instalar nada." | Muestra la maqueta. Gírala con el dedo. |
| 2 | "Los eventos no los cargamos nosotros: salen solos de la Agenda Universitaria, cada hora." | Pestaña **Eventos**. Señala "En curso" y la hora de actualización. |
| 3 | "Estoy en el ingreso y quiero llegar a la hackathon en el Coliseo." | En *Tech Mech Hackathon* toca **Llévame**. Lee: minutos, metros, escaleras y pasos. |
| 4 | "Si voy en silla de ruedas o con carga, pido una ruta sin gradas." | Marca **Evitar gradas**. La ruta cambia y pasa por las rampas. |
| 5 | "La Meca Gala es en el Paraninfo, piso 5 del Bloque D. La app también navega entre pisos." | Eventos → *Meca Gala* → **Ver en el mapa**. El bloque se abre por pisos. |
| 6 | "Si no conozco el campus, sigo la flecha con la cámara." | En la ruta toca **Con cámara**. Gira la vista y toca **Llegué a…** para avanzar. |
| 7 | "¿Cómo sabe dónde estoy? Por GPS, o escaneando el QR pegado en cada punto." | Icono QR → elige *Bloque K* → **Estoy en este punto**. |
| 8 | "También sirve para el día a día: busco un aula o una oficina." | Lupa → escribe `D17` y luego `Kardex`. |
| 9 | "Y me dice a qué hora salir para llegar a clases." | Pestaña **Mi horario** → **Cargar horario de ejemplo**. |
| 10 | "Mantenerlo cuesta unos Bs 450 al mes, bajo el tope de Bs 500: el alojamiento es gratis y la agenda se actualiza sola." | Muestra la tabla de `PROPUESTA_MANTENIMIENTO.md`. |

## Cómo cumple el reto

| Mínimo esperado | Cómo lo cubre UbiCato |
|---|---|
| Mapa con al menos 6 puntos y caminos con distancia | Maqueta 3D con 16 puntos y 56 nodos de camino; distancias en metros |
| Ruta más corta entre dos puntos | Dijkstra sobre el grafo de caminos, por tiempo a pie |
| Al menos 3 eventos con fecha, lugar y "cómo llegar" | Eventos reales de la agenda, cada uno con **Llévame** |
| Propuesta de implementación y mantenimiento | `docs/PROPUESTA_MANTENIMIENTO.md` |

| Valor agregado | Cómo lo cubre |
|---|---|
| Ubicación en tiempo real | GPS calibrado con 14 puntos medidos, y puntos QR |
| Navegación entre pisos | Despiece del bloque por pisos e instrucción de cuántos subir |
| Accesibilidad | Ruta sin gradas, por rampas y ascensores |
| Integración con el calendario de la UCB | Agenda Universitaria cada hora; recordatorio `.ics` para clases |

## Preguntas probables

- **¿De dónde salen las distancias?** Del plano oficial, escalado con 14 puntos GPS medidos en el campus. Error medio: unos 5 m.
- **¿Funciona sin internet?** Sí, después de la primera visita. Sin conexión muestra los últimos eventos guardados.
- **¿Qué falta?** Probar cámara, brújula y GPS caminando por el campus, y confirmar los pisos de algunos bloques.
