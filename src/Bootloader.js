class Bootloader extends Phaser.Scene {
    constructor() {
        super('Bootloader'); 
    }

    preload() {
        console.log('Bootloader');
        this.load.setPath('./assets/');
        this.load.image('sky', 'Background/mountain.png');
        this.load.image('ground', 'Background/platform.png');
        this.load.image('bomb', 'Background/bomb.png');
        this.load.image('background_text', 'background_text.png');
        this.load.image('selector', 'selector.png');

        this.load.image('terrain', 'tiles/spritesheet_ground.png');
        this.load.image('items', 'tiles/spritesheet_tiles.png');

        this.load.tilemapTiledJSON("level1", "tiles/level1.json");

        this.load.image('font', 'font/font.png');
        this.load.json('fontJSON', 'font/font.json');

        this.load.animation("enemiesData", "enemies/enemies_anim.json");
        this.load.atlas("enemies", "enemies/enemies.png", "enemies/enemies_atlas.json");

        this.load.atlas("boss", "enemies/boss.png", "enemies/boss_atlas.json");

        this.load.setPath('./assets/iaara2/');

        this.load.image("lives", "lives.png")

        this.load.json("iaara_dead", "dead/dead_anim.json");
        this.load.atlas("dead", "dead/dead.png", "dead/dead_atlas.json");

        this.load.json("iaara_idle", "idle/idle_anim.json");
        this.load.atlas("idle", "idle/idle.png", "idle/idle_atlas.json");

        this.load.json("iaara_jump", "jump/jump_anim.json");
        this.load.atlas("jump", "jump/jump.png", "jump/jump_atlas.json");

        this.load.json("iaara_run", "run/run_anim.json");
        this.load.atlas("run", "run/run.png", "run/run_atlas.json");

        this.load.json("iaara_walk", "walk/walk_anim.json");
        this.load.atlas("walk", "walk/walk.png", "walk/walk_atlas.json");
        
        this.load.on('complete', () => {
            const configFont = this.cache.json.get('fontJSON');
            this.cache.bitmapFont.add('font', Phaser.GameObjects.RetroFont.Parse(this, configFont));    
            this.scene.start('Intro');
        });
    }
}

export default Bootloader;