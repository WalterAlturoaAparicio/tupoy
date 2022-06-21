export default class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, type) {
        super(scene, x, y, type);
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.body.setCollideWorldBounds(true);
        this.setScale(0.8);
        this.body.setOffset(25, 70);
        this.body.setSize(80, 55, false);
        this.isAlive = true;
    }
}
Enemy.prototype.controller = function (scene, enemy, camera) {
    if (!enemy.isAlive) {
        scene.time.addEvent({
            delay: 100,
            callback: () => {
                enemy.destroy();
            },
        });
    } else {
        if (enemy.x - 1200 <= camera.main.worldView.x) {
            if (enemy.body.blocked.down || enemy.body.touching.down) {
                if (!enemy.flipX) {
                    enemy.body.setVelocityX(-100);
                } else {
                    enemy.body.setVelocityX(100);
                }
                if (enemy.body.blocked.right) {
                    enemy.body.setVelocityX(-100);
                    enemy.toggleFlipX();
                }
                if (enemy.body.blocked.left) {
                    enemy.toggleFlipX();
                    enemy.body.setVelocityX(100);
                }
            }
        }
    }
};
Enemy.prototype.controllerHit = function (player, enemy) {
    if (player.movement) {
        if (player.body.y + 70 < enemy.body.y) {
            player.body.setVelocityY(-150);
            enemy.anims.play("slimegreen_die");
            enemy.isAlive = false;
        } else {
            player.lives -= 1;
            this.scene.launch("Interfaz", {
                scene: this,
                lives: player.lives,
            });
            player.movement = false;
            player.body.setVelocityY(-300);
            if (enemy.flipX) {
                player.body.setVelocityX(300);
            } else {
                player.body.setVelocityX(-300);
            }
            player.setTint(0xf88b8b);
            setTimeout(() => {
                player.movement = true;
                player.clearTint();
            }, 700);
        }
    }
};
