import Player from "../gameObjects/Player.js";
import Enemy from "../gameObjects/Enemy.js";

class Nivel1 extends Phaser.Scene {
    constructor() {
        super({ key: "Nivel1" });
    }

    init() {
        console.log("Scene: Nivel1");
    }

    create() {
        this.gameOver = false;
        // background
        this.background = this.add
            .tileSprite(0, 0, 1280 * 10, 720, "sky")
            .setScale(2.3);
        this.background.setOrigin(0, 0);

        //maps
        const schema = this.add.tilemap("level1");
        const terrain = schema.addTilesetImage("spritesheet_ground", "terrain");
        const itemSet = schema.addTilesetImage("spritesheet_tiles", "items");
        this.terrainLayer = schema.createLayer(
            "fondo",
            [terrain, itemSet],
            0,
            100
        );

        this.physics.world.setBoundsCollision(true, true, false, false);

        // inputs cursor
        this.cursor = this.input.keyboard.createCursorKeys();

        //player
        this.iaara = new Player(this, 60, 300, "idle").setScale(0.2);

        //enemies
        this.slimesGreen = this.add.group();
        this.enemy1 = new Enemy(this, 1150, 567, "enemies");
        this.slimesGreen.add(this.enemy1);
        this.enemy2 = new Enemy(this, 3868, 439, "enemies");
        this.slimesGreen.add(this.enemy2);
        this.enemy3 = new Enemy(this, 4473, 567, "enemies");
        this.slimesGreen.add(this.enemy3);
        this.enemy4 = new Enemy(this, 4895, 247, "enemies");
        this.slimesGreen.add(this.enemy4);
        this.enemy5 = new Enemy(this, 6884, 567, "enemies");
        this.slimesGreen.add(this.enemy5);
        this.enemy6 = new Enemy(this, 7294, 567, "enemies");
        this.slimesGreen.add(this.enemy6);
        this.enemy7 = new Enemy(this, 8141, 439, "enemies");
        this.slimesGreen.add(this.enemy7);
        this.slimesGreen.playAnimation("slimegreen_move");

        //colliders
        this.physics.add.collider(this.iaara, this.terrainLayer);
        this.physics.add.collider(this.slimesGreen, this.terrainLayer);
        this.physics.add.collider(
            this.iaara,
            this.slimesGreen,
            this.enemy1.controllerHit,
            null,
            this
        );
        
        //map.setCollision([2,9,57,41,97,89]);
        this.terrainLayer.setCollisionByProperty({ collider: true });

        //animation
        this.iaara_idle = this.cache.json.get("iaara_idle");
        this.anims.fromJSON(this.iaara_idle);

        this.iaara_run = this.cache.json.get("iaara_run");
        this.anims.fromJSON(this.iaara_run);

        this.iaara_jump = this.cache.json.get("iaara_jump");
        this.anims.fromJSON(this.iaara_jump);

        this.iaara_dead = this.cache.json.get("iaara_dead");
        this.anims.fromJSON(this.iaara_dead);

        this.iaara.anims.play("idle", true);

        //collider world
        this.physics.world.setBounds(
            0,
            0,
            schema.widthInPixels,
            schema.heightInPixels
        );

        // Main camera
        this.cameras.main.setBounds(
            0,
            0,
            schema.widthInPixels,
            schema.heightInPixels
        );
        this.cameras.main.startFollow(this.iaara);

        this.scene.launch("Interfaz", { scene: this, lives: this.iaara.lives });
        this.boss1 = false;
        this.bossEscene1Complete = false;
    }

    update(time, delta) {
        
        if (this.iaara.isAlive) {
            this.iaara.controller(this.cursor, this.iaara, this);
            if (
                this.iaara.x > 8200 &&
                !this.boss1 &&
                !this.bossEscene1Complete
            ) {
                //player
                this.iaara.body.setVelocityX(0);
                this.iaara.movement = false;
                this.iaara.anims.play("idle", true);

                //camara
                this.cameras.main.stopFollow();

                //escena boss
                this.scene.run("Boss1", {
                    player: this.iaara,
                    camara: this.cameras.main,
                    escena: this,
                });
                this.boss1 = true;
                this.bossEscene1Complete = true;
                this.slimesGreen.children.each((child) => {
                    child.destroy(child, true);
                });
                this.physics.world.setBounds(7552, 0, this.scale.width, this.scale.height);

                this.scene.pause();
            }
            if (this.pause.isDown) {
                this.scene.pause();
            }
        }
        if (this.iaara.y > 760 || !this.iaara.isAlive) {
            this.iaara.isAlive = false;
            this.gameOver = true;
        }

        if (this.gameOver) {
            this.physics.pause();
            this.timeLineLost.play();
            if (this.restart.isDown) {
                this.gameOver = false;
                this.physics.resume();
                this.scene.restart();
            }
        }
        this.slimesGreen.children.iterate((enemy) => {
            enemy.controller(this, enemy, this.cameras);
        });
    }
}

export default Nivel1;
