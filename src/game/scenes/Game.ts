
import { EventBus } from '../EventBus';
import * as Phaser from 'phaser';

export class Game extends Phaser.Scene {
    private player!: Phaser.GameObjects.Graphics;
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

    private wasd!: {
        up: Phaser.Input.Keyboard.Key;
        down: Phaser.Input.Keyboard.Key;
        left: Phaser.Input.Keyboard.Key;
        right: Phaser.Input.Keyboard.Key;
    };

    private obstacles: Phaser.Geom.Rectangle[] = [];

    private joystickDirection = new Phaser.Math.Vector2(0, 0);
    private joystickPointerId: number | null = null;

    private readonly worldWidth = 2048;
    private readonly worldHeight = 1536;
    private readonly playerSpeed = 170;

    constructor() {
        super('Game');
    }

    create() {
        this.obstacles = [];
        this.joystickDirection.set(0, 0);
        this.joystickPointerId = null;

        const tileSize = 32;
        const columns = this.worldWidth / tileSize;
        const rows = this.worldHeight / tileSize;

        this.cameras.main.setBackgroundColor('#203c2b');

        const map = this.add.graphics();

        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < columns; x++) {
                const verticalPath =
                    x >= 14 && x <= 17 &&
                    y >= 3 && y <= 20;

                const horizontalPath =
                    y >= 15 && y <= 17 &&
                    x >= 10 && x <= 23;

                const isPath = verticalPath || horizontalPath;

                const color = isPath
                    ? (x + y) % 3 === 0
                        ? 0x9f977a
                        : 0x888268
                    : (x * 7 + y * 11) % 5 < 2
                        ? 0x376b43
                        : 0x305c3b;

                map.fillStyle(color);

                map.fillRect(
                    x * tileSize,
                    y * tileSize,
                    tileSize,
                    tileSize
                );

                if (
                    !isPath &&
                    (x * 13 + y * 7) % 4 === 0
                ) {
                    map.fillStyle(0x4c8251);

                    map.fillRect(
                        x * tileSize + 8,
                        y * tileSize + 10,
                        6,
                        5
                    );
                }

                if (
                    isPath &&
                    (x + y * 3) % 4 === 0
                ) {
                    map.fillStyle(0xbbb096);

                    map.fillRect(
                        x * tileSize + 6,
                        y * tileSize + 20,
                        12,
                        3
                    );
                }
            }
        }

        const trees = [
            [2, 3],
            [5, 4],
            [8, 3],
            [23, 3],
            [27, 5],
            [3, 10],
            [7, 12],
            [25, 11],
            [28, 14],
            [3, 19],
            [7, 21],
            [26, 20]
        ];

        for (const [x, y] of trees) {
            const px = x * tileSize;
            const py = y * tileSize;

            this.obstacles.push(
                new Phaser.Geom.Rectangle(
                    px + 12,
                    py + 18,
                    9,
                    24
                )
            );

            map.fillStyle(0x593c2a);
            map.fillRect(px + 12, py + 18, 9, 24);

            map.fillStyle(0x17472c);
            map.fillRect(px, py + 5, 32, 22);

            map.fillStyle(0x286d3b);
            map.fillRect(px + 5, py, 23, 20);

            map.fillStyle(0x3c8b4b);
            map.fillRect(px + 9, py + 4, 10, 8);
        }

        const rocks = [
            [6, 8],
            [22, 8],
            [10, 20],
            [27, 22]
        ];

        for (const [x, y] of rocks) {
            const px = x * tileSize;
            const py = y * tileSize;

            this.obstacles.push(
                new Phaser.Geom.Rectangle(
                    px + 2,
                    py + 6,
                    29,
                    23
                )
            );

            map.fillStyle(0x414c4a);
            map.fillRect(px + 2, py + 10, 29, 19);

            map.fillStyle(0x7b8982);
            map.fillRect(px + 7, py + 6, 18, 11);
        }

        map.fillStyle(0x202b30);
        map.fillRect(448, 43, 128, 88);

        this.obstacles.push(
            new Phaser.Geom.Rectangle(
                448,
                43,
                128,
                88
            )
        );

        map.fillStyle(0x667475);
        map.fillRect(456, 51, 112, 20);

        map.fillStyle(0x3b4548);
        map.fillRect(480, 72, 64, 59);

        map.fillStyle(0x101a20);
        map.fillRect(493, 86, 38, 45);

        map.fillStyle(0xc0ad77);
        map.fillRect(474, 131, 76, 7);

        map.fillStyle(0x293a63);
        map.fillRect(722, 461, 80, 64);

        this.obstacles.push(
            new Phaser.Geom.Rectangle(
                722,
                461,
                80,
                64
            )
        );

        map.fillStyle(0x5185ca);
        map.fillRect(730, 469, 64, 48);

        map.fillStyle(0xc4efff);
        map.fillRect(759, 475, 8, 37);
        map.fillRect(744, 489, 38, 8);

        map.fillStyle(0xd7b45c);
        map.fillRect(753, 450, 20, 8);

        this.add.text(
            16,
            16,
            'AINCRAD - PISO 1',
            {
                fontFamily: 'monospace',
                fontSize: '22px',
                color: '#f7f0d3',
                backgroundColor: '#172a21',
                padding: {
                    x: 10,
                    y: 6
                }
            }
        )
        .setScrollFactor(0)
        .setDepth(1000);

        this.add.text(
            512,
            151,
            'LABERINTO',
            {
                fontFamily: 'monospace',
                fontSize: '16px',
                color: '#ffffff',
                backgroundColor: '#192a26',
                padding: {
                    x: 6,
                    y: 4
                }
            }
        ).setOrigin(0.5);

        this.add.text(
            762,
            536,
            'ALTAR DE BUFO',
            {
                fontFamily: 'monospace',
                fontSize: '15px',
                color: '#ffffff',
                backgroundColor: '#192a26',
                padding: {
                    x: 6,
                    y: 4
                }
            }
        ).setOrigin(0.5);

        this.add.text(
            16,
            this.scale.height - 30,
            'Prototipo visual - v0.1.7',
            {
                fontFamily: 'monospace',
                fontSize: '14px',
                color: '#d3dccf'
            }
        )
        .setScrollFactor(0)
        .setDepth(1000);

        this.player = this.add.graphics();

        this.player.fillStyle(0x171717);
        this.player.fillRect(-9, -20, 18, 7);

        this.player.fillStyle(0xe8b68a);
        this.player.fillRect(-7, -13, 14, 9);

        this.player.fillStyle(0x252525);
        this.player.fillRect(-10, -4, 20, 16);

        this.player.fillStyle(0x404040);
        this.player.fillRect(-7, 12, 6, 12);
        this.player.fillRect(2, 12, 6, 12);

        this.player.fillStyle(0xb7c5d0);
        this.player.fillRect(11, -10, 3, 25);

        this.player.fillStyle(0x6f4c36);
        this.player.fillRect(9, 9, 7, 5);

        this.player.setPosition(512, 680);
        this.player.setDepth(10);

        const keyboard = this.input.keyboard;

        if (!keyboard) {
            throw new Error(
                'El teclado no está disponible'
            );
        }

        this.cursors = keyboard.createCursorKeys();

        this.wasd = keyboard.addKeys({
            up: 'W',
            down: 'S',
            left: 'A',
            right: 'D'
        }) as typeof this.wasd;

        this.cameras.main.setBounds(
            0,
            0,
            this.worldWidth,
            this.worldHeight
        );

        this.cameras.main.startFollow(
            this.player,
            true,
            0.12,
            0.12
        );

        this.createVirtualJoystick();

        EventBus.emit(
            'current-scene-ready',
            this
        );
    }

    private createVirtualJoystick(): void {
        const centerX = 105;
        const centerY = this.scale.height - 105;

        const radius = 55;
        const activationRadius = 90;

        this.add.circle(
            centerX,
            centerY,
            radius,
            0x102b46,
            0.45
        )
        .setStrokeStyle(3, 0xc8e8ff, 0.65)
        .setScrollFactor(0)
        .setDepth(1000);

        const knob = this.add.circle(
            centerX,
            centerY,
            23,
            0x76c9ff,
            0.75
        )
        .setStrokeStyle(2, 0xffffff, 0.8)
        .setScrollFactor(0)
        .setDepth(1001);

        const moveJoystick = (
            pointer: Phaser.Input.Pointer
        ): void => {
            if (
                pointer.id !== this.joystickPointerId
            ) {
                return;
            }

            const dx = pointer.x - centerX;
            const dy = pointer.y - centerY;

            const distance = Math.sqrt(
                dx * dx + dy * dy
            );

            const strength = Math.min(
                distance / radius,
                1
            );

            const normalizedX =
                distance > 0
                    ? dx / distance
                    : 0;

            const normalizedY =
                distance > 0
                    ? dy / distance
                    : 0;

            this.joystickDirection.set(
                normalizedX * strength,
                normalizedY * strength
            );

            knob.setPosition(
                centerX +
                    normalizedX * radius * strength,
                centerY +
                    normalizedY * radius * strength
            );
        };

        const onPointerDown = (
            pointer: Phaser.Input.Pointer
        ): void => {
            if (
                this.joystickPointerId !== null
            ) {
                return;
            }

            const distance =
                Phaser.Math.Distance.Between(
                    pointer.x,
                    pointer.y,
                    centerX,
                    centerY
                );

            if (distance > activationRadius) {
                return;
            }

            this.joystickPointerId = pointer.id;

            moveJoystick(pointer);
        };

        const onPointerMove = (
            pointer: Phaser.Input.Pointer
        ): void => {
            if (
                pointer.id !== this.joystickPointerId
            ) {
                return;
            }

            if (!pointer.isDown) {
                return;
            }

            moveJoystick(pointer);
        };

        const onPointerUp = (
            pointer: Phaser.Input.Pointer
        ): void => {
            if (
                pointer.id !== this.joystickPointerId
            ) {
                return;
            }

            this.joystickPointerId = null;

            this.joystickDirection.set(
                0,
                0
            );

            knob.setPosition(
                centerX,
                centerY
            );
        };

        this.input.on(
            'pointerdown',
            onPointerDown
        );

        this.input.on(
            'pointermove',
            onPointerMove
        );

        this.input.on(
            'pointerup',
            onPointerUp
        );

        this.input.on(
            'pointerupoutside',
            onPointerUp
        );

        this.events.once(
            Phaser.Scenes.Events.SHUTDOWN,
            () => {
                this.input.off(
                    'pointerdown',
                    onPointerDown
                );

                this.input.off(
                    'pointermove',
                    onPointerMove
                );

                this.input.off(
                    'pointerup',
                    onPointerUp
                );

                this.input.off(
                    'pointerupoutside',
                    onPointerUp
                );

                this.joystickPointerId = null;

                this.joystickDirection.set(
                    0,
                    0
                );
            }
        );
    }

    private isBlocked(
        x: number,
        y: number
    ): boolean {
        const playerLeft = x - 8;
        const playerRight = x + 8;
        const playerTop = y + 9;
        const playerBottom = y + 24;

        return this.obstacles.some(
            obstacle => {
                const obstacleLeft = obstacle.x;

                const obstacleRight =
                    obstacle.x + obstacle.width;

                const obstacleTop = obstacle.y;

                const obstacleBottom =
                    obstacle.y + obstacle.height;

                return (
                    playerLeft < obstacleRight &&
                    playerRight > obstacleLeft &&
                    playerTop < obstacleBottom &&
                    playerBottom > obstacleTop
                );
            }
        );
    }

    update(_time: number, delta: number) {
        const left =
            this.wasd.left.isDown ||
            this.cursors.left.isDown;

        const right =
            this.wasd.right.isDown ||
            this.cursors.right.isDown;

        const up =
            this.wasd.up.isDown ||
            this.cursors.up.isDown;

        const down =
            this.wasd.down.isDown ||
            this.cursors.down.isDown;

        const direction = new Phaser.Math.Vector2(
            Number(right) - Number(left),
            Number(down) - Number(up)
        );

        if (direction.lengthSq() > 0) {
            direction.normalize();
        }

        direction.add(
            this.joystickDirection
        );

        if (direction.lengthSq() > 1) {
            direction.normalize();
        }

        if (direction.lengthSq() === 0) {
            return;
        }

        const safeDelta = Math.min(
            delta,
            50
        );

        direction.scale(
            this.playerSpeed * safeDelta / 1000
        );

        const nextX = Phaser.Math.Clamp(
            this.player.x + direction.x,
            12,
            this.worldWidth - 12
        );

        if (
            !this.isBlocked(
                nextX,
                this.player.y
            )
        ) {
            this.player.x = nextX;
        }

        const nextY = Phaser.Math.Clamp(
            this.player.y + direction.y,
            24,
            this.worldHeight - 24
        );

        if (
            !this.isBlocked(
                this.player.x,
                nextY
            )
        ) {
            this.player.y = nextY;
        }
    }

    changeScene() {
        this.scene.start('GameOver');
    }
}
