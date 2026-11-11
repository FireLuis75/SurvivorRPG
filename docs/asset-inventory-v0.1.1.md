# SurvivorRPG — Inventario gráfico v0.1.1

## Especificaciones generales

Perspectiva: superior 3/4.
Estilo: Pixel Art de fantasía medieval.
Tamaño base de casilla: 32 x 32 píxeles.
Formato de imágenes: PNG.
Transparencia: requerida en objetos independientes.
Interpolación: desactivada.

## Terreno

| Archivo | Dimensiones | Uso |
|---|---|---|
| grass-01.png | 32x32 | Césped principal |
| grass-02.png | 32x32 | Césped alternativo |
| grass-03.png | 32x32 | Césped con detalles |
| dirt-01.png | 32x32 | Camino principal |
| dirt-02.png | 32x32 | Camino alternativo |
| stone-path-01.png | 32x32 | Piedra principal |
| stone-path-02.png | 32x32 | Piedra alternativa |

## Vegetación

| Archivo | Dimensiones | Uso |
|---|---|---|
| tree-01.png | 64x64 | Árbol principal |
| tree-02.png | 64x64 | Árbol alternativo |
| grass-detail-01.png | 32x32 | Hierba decorativa |
| grass-detail-02.png | 32x32 | Hierba decorativa |
| flowers-01.png | 32x32 | Flores |

## Obstáculos

| Archivo | Dimensiones | Uso |
|---|---|---|
| rock-01.png | 40x32 | Roca principal |
| rock-02.png | 40x32 | Roca alternativa |

## Estructuras

| Archivo | Dimensiones | Uso |
|---|---|---|
| labyrinth-entrance.png | 128x96 | Entrada al laberinto |
| buff-altar.png | 80x80 | Altar mágico |

## Reglas de integración

Conservar las ubicaciones existentes.
Conservar inicialmente los rectángulos de colisión.
Separar suelo y objetos independientes.
Ordenar la profundidad de los objetos por su posición vertical.
Mantener el personaje visualmente anclado a los pies.
No utilizar recursos de terceros sin comprobar su licencia.

## Estado

Inventario definido.
Recursos PNG pendientes de creación.
