export default class Player extends Phaser.GameObjects.Sprite{
    
    constructor(scene, x, y , type){
        super(scene, x, y, type);
        
        scene.add.existing(this);
        //body properties
        scene.physics.world.enable(this);
        this.body.setCollideWorldBounds(true);
        this.body.setBounce(0.2);
        this.body.setOffset(150, 60);
        this.body.setSize(160,390, false);
        //properties
        this.isAlive = true;
        this.lives = 3;
        this.movement = true;
        
    }
}

Player.prototype.controller = function(cursor, player){
    if(player.lives==0){
        player.isAlive=false;
    }
    if(player.isAlive){
        if(player.movement){
            if (cursor.right.isDown) {
                
                player.body.setVelocityX(300);
                if (player.body.blocked.down) {
                    player.anims.play("run", true);
                }
                if (player.flipX) {
                    player.toggleFlipX();
                }

            } else if (cursor.left.isDown) {
                
                player.body.setVelocityX(-300);
                if (player.body.blocked.down) {
                    player.anims.play("run", true);
                }
                if (!player.flipX) {
                    player.toggleFlipX();
                }


            } else if (player.body.blocked.down) {
                player.body.setVelocityX(0);
                player.anims.play("idle", true);
            }
            if (cursor.up.isDown && (player.body.blocked.down || player.body.touching.down)) {
                player.body.setVelocityY(-500);
                player.anims.play("jump", true);
            }
        }
    }
    else {
        player.anims.play("dead",true);
    }
    

}
