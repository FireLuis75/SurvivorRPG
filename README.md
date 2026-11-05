# SurvivorRPG

SurvivorRPG es un videojuego web RPG de supervivencia y exploracion, con una direccion artistica Pixel Art 2.5D.

Desarrollado por FireLuis75 utilizando Phaser, React y TypeScript.

## Version actual

- Version: 0.1.0
- Nombre: El primer espadachin
- Estado: Prototipo alfa local

## Caracteristicas implementadas

- Escenario explorable de 2048 x 1536 pixeles.
- Movimiento mediante WASD y flechas del teclado.
- Joystick virtual para dispositivos tactiles.
- Movimiento diagonal normalizado.
- Camara con seguimiento del personaje.
- Limites del escenario.
- Colisiones con arboles, rocas, laberinto y altar.
- Adaptacion horizontal mediante Phaser.Scale.EXPAND.

Los graficos actuales son provisionales.

## Tecnologias

- Phaser 4
- React 19
- TypeScript
- Vite
- Node.js 24.22.2

## Instalacion

Clonar el repositorio:

`git clone https://github.com/FireLuis75/SurvivorRPG.git`

Entrar al proyecto:

`cd SurvivorRPG`

Instalar dependencias:

`npm ci`

## Desarrollo

Iniciar el servidor:

`npm run dev-nolog`

Abrir la direccion local indicada por Vite.

## Produccion

Compilar:

`npm run build-nolog`

Iniciar vista previa:

`npx vite preview --config vite/config.prod.mjs --logLevel info`

## Controles

| Control | Accion |
|---------|--------|
| W / Arriba | Mover hacia arriba |
| S / Abajo | Mover hacia abajo |
| A / Izquierda | Mover hacia la izquierda |
| D / Derecha | Mover hacia la derecha |
| Combinaciones direccionales | Movimiento diagonal |
| Joystick virtual | Movimiento tactil |

## Validaciones de la version 0.1.0

Se superaron 15 pruebas funcionales y tecnicas.

Se verificaron compilacion, movimiento, camara, limites, colisiones, controles, estabilidad y ejecucion de produccion.

La prueba en telefono fisico permanece pendiente.

## Proximas funcionalidades

- Graficos Pixel Art 2.5D definitivos.
- Animaciones de personajes.
- Sistema de combate y enemigos.
- Experiencia, niveles y habilidades.
- Armas y equipamiento.
- Laberintos, jefes y progresion por pisos.

## Creditos

SurvivorRPG es desarrollado por FireLuis75.

Proyecto basado inicialmente en la plantilla oficial Phaser React TypeScript:

https://github.com/phaserjs/template-react-ts

Se conserva el archivo LICENSE original y las atribuciones correspondientes.

## Licencia

Consultar el archivo LICENSE incluido en el repositorio.
