export default class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, type) {
    super(scene, x, y, type);

    scene.add.existing(this);
    //body properties
    scene.physics.world.enable(this);
    this.body.setCollideWorldBounds(true);
    this.body.setBounce(0.2);
    this.body.setOffset(150, 60);
    this.body.setSize(160, 390, false);
    //properties
    this.isAlive = true;
    this.lives = 3;
    this.movement = true;
    this.jump = false;
    this.doubleJump = false;
  }
}

Player.prototype.controller = function (cursor, player) {
  if (player.lives === 0) {
    player.isAlive = false;
  }
  if (player.isAlive) {
    if (player.movement) {
      if (cursor.right.isDown) {
        player.body.setVelocityX(300);
        if (player.body.blocked.down) {
          player.anims.play("run", true);
        }
        if (player.flipX) {
          player.body.setOffset(150, 60);
          player.toggleFlipX();
        }
      } else if (cursor.left.isDown) {
        player.body.setVelocityX(-300);
        if (player.body.blocked.down) {
          player.anims.play("run", true);
        }
        if (!player.flipX) {
          player.body.setOffset(105, 60);
          player.toggleFlipX();
        }
      } else if (player.body.blocked.down) {
        player.body.setVelocityX(0);
        player.anims.play("idle", true);
      } else if (cursor.left.isUp) {
        player.body.setVelocityX(0);
      } else if (cursor.right.isUp) {
        player.body.setVelocityX(0);
      }
      if (Phaser.Input.Keyboard.JustDown(cursor.up)) {
        if (player.body.blocked.down || player.body.touching.down) {
          player.jump = true;
          player.doubleJump = true;
        } else if (player.doubleJump) {
          player.jump = true;
          player.doubleJump = false;
        }
      }
      if (player.jump) {
        player.anims.play("jump", true);
        player.body.setVelocityY(-370);
        player.jump = false;
      }
    }
  } else {
    player.anims.play("dead", true);
  }
};
