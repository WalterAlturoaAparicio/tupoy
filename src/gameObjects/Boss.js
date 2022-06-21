export default class Boss extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, type, frame) {
        super(scene, x, y, type, frame);
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.body.setCollideWorldBounds(true);
        //scene.physics.add.collider(this, scene.terrainLayer);
        this.setScale(5);
        this.body.setOffset(20, 68);
        this.body.setSize(85, 60, false);
        this.body.setMass(10);
        this.body.setMaxSpeed(800);
        this.isAlive = true;
    }
}
Boss.prototype.controllerHit = function (player, enemy) {
    if (player.movement) {
        enemy.body.setVelocityX(0);
        player.lives -= 2;
        this.scene.launch("Interfaz", {
            scene: this,
            lives: player.lives,
        });
        player.movement = false;
        player.body.setVelocityY(-500);
        if (player.body.x > enemy.body.x) {
            player.body.setVelocityX(1600);
        } else {
            player.body.setVelocityX(-1600);
        }
        player.setTint(0xf88b8b);
        setTimeout(() => {
            player.movement = true;
            player.clearTint();
        }, 700);
    }
};
Boss.prototype.controllerAttack = function () {};
