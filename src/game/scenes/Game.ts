
import { EventBus } from '../EventBus';
import * as Phaser from 'phaser';

export class Game extends Phaser.Scene {
    private player!: Phaser.GameObjects.Sprite;
    private playerFacing: 'down' | 'left' | 'right' | 'up' = 'down';
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

        const terrain = this.add.renderTexture(
            0,
            0,
            this.worldWidth,
            this.worldHeight
        ).setOrigin(0, 0).setDepth(-1);

        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < columns; x++) {
                const verticalPath =
                    x >= 14 && x <= 17 &&
                    y >= 3 && y <= 20;

                const horizontalPath =
                    y >= 15 && y <= 17 &&
                    x >= 10 && x <= 23;

                const isPath = verticalPath || horizontalPath;

                const stonePath =
                    isPath &&
                    (
                        y <= 6 ||
                        (y >= 15 && x >= 20)
                    );

                const texture = stonePath
                    ? (x + y) % 2 === 0
                        ? 'world-stone-01'
                        : 'world-stone-02'
                    : isPath
                        ? (x + y) % 2 === 0
                            ? 'world-dirt-01'
                            : 'world-dirt-02'
                        : (x * 7 + y * 11) % 5 < 2
                            ? 'world-grass-02'
                            : (x + y) % 7 === 0
                                ? 'world-grass-03'
                                : 'world-grass-01';

                terrain.stamp(
                    texture,
                    undefined,
                    x * tileSize,
                    y * tileSize,
                    { originX: 0, originY: 0 }
                );

                if (!isPath) {
                    const detailSeed = (
                        ((x + 1) * 73856093) ^
                        ((y + 1) * 19349663) ^
                        ((x + 1) * (y + 1) * 83492791)
                    ) >>> 0;

                    if (detailSeed % 19 === 0) {
                        const detailTexture = detailSeed % 7 === 0
                            ? 'world-flowers-01'
                            : detailSeed % 3 === 0
                                ? 'world-grass-detail-02'
                                : 'world-grass-detail-01';

                        terrain.stamp(
                            detailTexture,
                            undefined,
                            x * tileSize,
                            y * tileSize,
                            { originX: 0, originY: 0 }
                        );
                    }
                }

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

        terrain.render();

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

            const treeTexture = (x + y) % 2 === 0
                ? 'world-tree-01'
                : 'world-tree-02';

            this.add.image(
                px - 16,
                py - 22,
                treeTexture
            )
            .setOrigin(0, 0)
            .setDepth((py + 42) * 100 / this.worldHeight);
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

            const rockTexture = x % 3 === 0
                ? 'world-rock-02'
                : 'world-rock-01';

            this.add.image(
                px - 4,
                py + 1,
                rockTexture
            )
            .setOrigin(0, 0)
            .setDepth((py + 33) * 100 / this.worldHeight);
        }

        this.add.image(448, 43, 'world-labyrinth')
            .setOrigin(0, 0)
            .setDepth(4);

        this.obstacles.push(
            new Phaser.Geom.Rectangle(454, 55, 116, 82)
        );





        this.add.image(722, 450, 'world-altar')
            .setOrigin(0, 0)
            .setDepth(4);

        this.obstacles.push(
            new Phaser.Geom.Rectangle(752, 457, 20, 22),
            new Phaser.Geom.Rectangle(740, 479, 44, 33),
            new Phaser.Geom.Rectangle(729, 512, 66, 14)
        );




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

        this.player = this.add.sprite(
            512,
            680,
            'hero-walk',
            0
        )
        .setOrigin(0.5, 0.5)
        .setDepth((680 + 24) * 100 / this.worldHeight);

        this.playerFacing = 'down';

        const heroDirections = [
            { name: 'down', start: 0, end: 3 },
            { name: 'left', start: 4, end: 7 },
            { name: 'right', start: 8, end: 11 },
            { name: 'up', start: 12, end: 15 }
        ];

        for (const heroDirection of heroDirections) {
            const key = `hero-walk-${heroDirection.name}`;

            if (!this.anims.exists(key)) {
                this.anims.create({
                    key,
                    frames: this.anims.generateFrameNumbers('hero-walk', {
                        start: heroDirection.start,
                        end: heroDirection.end
                    }),
                    frameRate: 8,
                    repeat: -1
                });
            }
        }

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
            this.showPlayerIdleFrame();
            return;
        }

        const previousX = this.player.x;
        const previousY = this.player.y;

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

        this.player.setDepth(
            (this.player.y + 24) * 100 / this.worldHeight
        );

        const movedX = this.player.x - previousX;
        const movedY = this.player.y - previousY;

        if (movedX === 0 && movedY === 0) {
            this.showPlayerIdleFrame();
            return;
        }

        if (Math.abs(movedX) > Math.abs(movedY)) {
            this.playerFacing = movedX < 0 ? 'left' : 'right';
        } else {
            this.playerFacing = movedY < 0 ? 'up' : 'down';
        }

        const animationKey = `hero-walk-${this.playerFacing}`;

        if (
            !this.player.anims.isPlaying ||
            this.player.anims.getName() !== animationKey
        ) {
            this.player.play(animationKey);
        }
    }

    private showPlayerIdleFrame(): void {
        if (this.player.anims.isPlaying) {
            this.player.anims.stop();
        }

        const idleFrames = {
            down: 0,
            left: 4,
            right: 8,
            up: 12
        };

        this.player.setFrame(idleFrames[this.playerFacing]);
    }

    changeScene() {
        this.scene.start('GameOver');
    }
}
