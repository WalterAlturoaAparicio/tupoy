export default class Bomb extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y , type){
        super(scene, x, y, type);
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.body.setBounce(1);
        this.body.setCollideWorldBounds(true);
        this.body.setVelocity(Phaser.Math.Between(-200, 200), 500);
        this.body.allowGravity = false;
    }
        
}
