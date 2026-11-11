# SurvivorRPG — Dirección artística v0.1.1

## Concepto
RPG de supervivencia de fantasía medieval con estética Pixel Art 2.5D.

## Perspectiva
Vista superior de tres cuartos (3/4), sin proyección isométrica.
La profundidad se simula mediante sombras, capas y orden de dibujo.

## Resolución
Mundo inicial: 2048 x 1536.
Tamaño de casilla: 32 x 32 píxeles.
Configuración Phaser: pixelArt y roundPixels activados.

## Personaje
Sprite base propuesto: 32 x 48 píxeles.
Cuatro direcciones: arriba, abajo, izquierda y derecha.
Animación inicial: cuatro fotogramas por dirección.
El punto de referencia visual estará situado en los pies.

## Entorno
Bosque de fantasía medieval.
Suelo de césped con variaciones.
Caminos de tierra y piedra.
Árboles, rocas, vegetación y ruinas.
Laberinto y altar conservan sus ubicaciones iniciales.

## Capas
Suelo: terreno y caminos.
Elementos inferiores: sombras y detalles del suelo.
Elementos dinámicos: personaje, árboles y estructuras.
Elementos superiores: copas y partes elevadas.
Interfaz: siempre visible por encima del mundo.

## Compatibilidad
Conservar controles WASD, flechas y joystick virtual.
Conservar cámara, límites y velocidad de movimiento.
Mantener inicialmente los rectángulos de colisión existentes.
No incorporar física adicional en esta actualización.

## Requisitos
Recursos gráficos originales o con licencias compatibles.
Mantener coherencia de escala y paleta.
Evitar filtros que difuminen los píxeles.
Priorizar rendimiento en navegadores y móviles.

## Estado
Especificación inicial para SurvivorRPG v0.1.1.
