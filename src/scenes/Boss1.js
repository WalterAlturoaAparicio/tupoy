import Boss from "../gameObjects/Boss.js";

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
        const delayTimeBoss = this.tweens.createTimeline();
        this.boss = new Boss(this.escena, 8400, -1000, "enemies", "slimegreen");

        this.escena.physics.add.collider(this.boss, this.escena.terrainLayer);

        timeLineBoss.add({
            targets: this.camara,
            ease: Phaser.Math.Easing.Bounce.InOut,
            delay: 500,
            duration: 100,
            repeat: 15,
            y: -2,
            yoyo: true,
        });
        delayTimeBoss.add({
            targets: this.boss,
            delay: 3000,
            ease: Phaser.Math.Easing.Bounce.InOut,
            duration: 3000,
            onComplete: () => {
                this.boss.anims.play("slimegreen_move");
            },
        });
        delayTimeBoss.on("complete", ()=>{
            this.escena.bossEscene1Complete = false;
        })
        timeLineBoss.on("complete", () => {
            this.escena.iaara.movement = true;
            this.escena.physics.add.collider(
                this.player,
                this.boss,
                this.boss.controllerHit,
                null,
                this
            );
            this.escena.boss1 = true;
            this.scene.resume("Nivel1");
            delayTimeBoss.play();
        });

        timeLineBoss.play();
    }

    update(time, delta) {}
}

export default Boss1;

