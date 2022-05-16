import Enemy from "../gameObjects/Enemy.js";

class Boss1 extends Phaser.Scene {
    constructor() {
        super({ key: "Boss1" });
    }

    init(data) {
        console.log("Scene: Boss1");
        this.camara = data.camara;
        this.player = data.player;
        this.escena = data.escena;
    }

    create() {
        //final boss
        const timeLineBoss = this.tweens.createTimeline();
        this.boss = new Enemy(this, 8550, -1000, "enemies");

        this.escena.physics.add.collider(this.boss, this.escena.terrainLayer);

        timeLineBoss.add({
            targets: this.camara,
            ease: Phaser.Math.Easing.Bounce.InOut,
            delay: 1000,
            duration: 100,
            repeat: 15,
            y: -2,
            yoyo: true,
        });
        timeLineBoss.on("complete", () => {
            this.escena.iaara.movement = true;
            //this.escena.slimesGreen.destroy(true, true);
            //this.escena.physics.world.setBounds(7552, 0, 8800, 720, true, true);
            this.scene.resume("Nivel1");
        });
        timeLineBoss.play();
    }

    update(time, delta) {}
}

export default Boss1;

