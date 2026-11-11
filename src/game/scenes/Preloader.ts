import { Scene } from 'phaser';

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

    init ()
    {
        //  We loaded this image in our Boot Scene, so we can display it here
        this.add.image(512, 384, 'background');

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(512-230, 384, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress: number) => {

            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress);

        });
    }

    preload ()
    {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('assets');

        this.load.image('logo', 'logo.png');
        this.load.image('star', 'star.png');

        this.load.image('world-grass-01', 'world/terrain/grass-01.png');
        this.load.image('world-grass-02', 'world/terrain/grass-02.png');
        this.load.image('world-grass-03', 'world/terrain/grass-03.png');

        this.load.image('world-dirt-01', 'world/terrain/dirt-01.png');
        this.load.image('world-dirt-02', 'world/terrain/dirt-02.png');

        this.load.image('world-stone-01', 'world/terrain/stone-path-01.png');
        this.load.image('world-stone-02', 'world/terrain/stone-path-02.png');

        this.load.image('world-tree-01', 'world/vegetation/tree-01.png');
        this.load.image('world-tree-02', 'world/vegetation/tree-02.png');

        this.load.image('world-grass-detail-01', 'world/vegetation/grass-detail-01.png');
        this.load.image('world-grass-detail-02', 'world/vegetation/grass-detail-02.png');
        this.load.image('world-flowers-01', 'world/vegetation/flowers-01.png');

        this.load.image('world-rock-01', 'world/obstacles/rock-01.png');
        this.load.image('world-rock-02', 'world/obstacles/rock-02.png');

        this.load.image('world-labyrinth', 'world/structures/labyrinth-entrance.png');
        this.load.image('world-altar', 'world/structures/buff-altar.png');

        this.load.spritesheet('hero-walk', 'characters/hero/hero-walk.png', {
            frameWidth: 32,
            frameHeight: 48
        });
    }

    create ()
    {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start('MainMenu');
    }
}
