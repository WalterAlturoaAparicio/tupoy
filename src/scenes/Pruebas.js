
import Player from "../gameObjects/Player.js";
import Plataform from "../gameObjects/Plataform.js";
import Enemy from "../gameObjects/Enemy.js";
import Bomb from "../gameObjects/Bomb.js";

var gameOver = false;

class Pruebas extends Phaser.Scene {

    constructor() {
        super({ key: 'Pruebas' });
    }

    init() {
        console.log('Scene: Pruebas');
    }

    create() {
        //camera
        this.cameras.main.setBounds(0,0,1680, 720);

        //restart & pause
        this.pause = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.restart = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.restartPanel = this.add.graphics();
        this.restartPanel.fillStyle(0x000000).setAlpha(0);
        this.restartPanel.fillRect(0,0,1680,720).setDepth(5);
        //text you lose
        const loseTextArray = [
            'YOU LOSE'
        ];
        
        this.loseText = this.add.bitmapText(
            this.cameras.main.worldView.x+this.cameras.main.centerX,
            this.scale.height / 2, 
            'font',
            loseTextArray, 40, 3
        ).setOrigin(0.5).setDepth(6).setAlpha(0);

        this.timeLineLost = this.tweens.createTimeline();

        this.timeLineLost.add({
            targets: this.restartPanel,
            duration: 1000,
            alpha: 0.6
        });
        this.timeLineLost.add({
            targets: this.loseText,
            duration: 1000,
            alpha: 1
        });
        
        // background
        this.background = this.add.tileSprite(0, 0, 1280, 720, "sky").setScale(2);
        this.background.setOrigin(0, 0);

        //plataforms
        this.platform = new Plataform(this, 600, 600, 'ground');

        //bombs
        //this.bomb = new Bomb(this, 100, 16, 'bomb');

        //physics world
        this.physics.world.setBoundsCollision(true, true, true, true);

        // inputs cursor
        this.cursor = this.input.keyboard.createCursorKeys();

        //player
        this.iaara = new Player(this, 600, 500, "idle").setScale(0.2);

        //enemies with group
        
        /* this.enemies = this.physics.add.group({
            key: "enemies",
            repeat: 2,
            setXY: {
                x: 750,
                y: 350,
                stepX: 150
            }
        });
        console.log(this.enemies);
        this.enemies.children.iterate((x) =>{
            console.log(x.x-1200);
            x.setScale(0.8);
            this.physics.world.enable(x);
            x.body.setCollideWorldBounds(true);
            x.isAlive = true;
            x.body.setOffset(15, 60);
            x.body.setSize(90,70,false);
            //x.body.setSize(100, 89);

        });
        this.enemies.playAnimation("slimegreen_move"); */
        
        
        /*enemies traditional*/
        this.enemies = this.add.group();

        this.enemy1 = new Enemy(this, 750, 350, "enemies");
        this.enemy1.anims.play("slimegreen_move");
        this.enemies.add(this.enemy1);
        this.enemy2 = new Enemy(this, 900, 350, "enemies");
        this.enemy2.anims.play("slimegreen_move");
        this.enemies.add(this.enemy2);
        this.enemy3 = new Enemy(this, 1050, 350, "enemies");
        this.enemy3.anims.play("slimegreen_move");
        this.enemies.add(this.enemy3);

        // physics
        this.physics.add.collider(this.iaara, this.platform);
        
        this.physics.add.collider(this.enemies, this.platform);

        //this.physics.add.collider(this.iaara, this.bomb, hitBomb, null, this);
        this.physics.add.collider(this.iaara, this.enemies, this.enemy1.controllerHit, null, this);

        //animations player
        this.iaara_idle = this.cache.json.get("iaara_idle");
        this.anims.fromJSON(this.iaara_idle);

        this.iaara_run = this.cache.json.get("iaara_run");
        this.anims.fromJSON(this.iaara_run);

        this.iaara_jump = this.cache.json.get("iaara_jump");
        this.anims.fromJSON(this.iaara_jump);

        this.iaara_dead = this.cache.json.get("iaara_dead");
        this.anims.fromJSON(this.iaara_dead);

        this.iaara.anims.play("idle", true);

        this.cameras.main.startFollow(this.iaara);
        //this.cameras.main.ignore(this.iaara);
        
    }

    update(time, delta) {            
        
        this.loseText.setX(this.cameras.main.worldView.x+this.cameras.main.centerX);
        if(this.iaara.isAlive){
            this.iaara.controller(this.cursor, this.iaara);
        }
        if(this.iaara.y>720 || !this.iaara.isAlive){
            this.iaara.isAlive=false;
            //this.iaara.controller(this.cursor, this.iaara);
            //this.iaara.y = 100;
            this.gameOver=true;
        }
        

        if(this.gameOver){
            this.physics.pause();
            this.timeLineLost.play();
            if(this.restart.isDown){
                this.gameOver=false;
                this.physics.resume();
                this.scene.restart();
            }
        }
        this.enemies.children.iterate((enemy)=>{
            enemy.controller(this, enemy, this.cameras)
        });

        /* this.enemies.children.iterate((enemy)=>{
            if(!enemy.isAlive){
                this.time.addEvent({
                    delay: 100,
                    callback: () =>{
                        enemy.destroy();        
                    }
                });
            }else{
                if(enemy.x-1200<=this.cameras.main.worldView.x){
                    if(enemy.body.blocked.down || enemy.body.touching.down){
                        if (!enemy.flipX){
                            enemy.body.setVelocityX(-100);
                        }else{
                            enemy.body.setVelocityX(100);
                        }
                        if(enemy.body.blocked.right){
                            enemy.body.setVelocityX(-100);
                            enemy.toggleFlipX();
                        }
                        if(enemy.body.blocked.left){
                            enemy.toggleFlipX();
                            enemy.body.setVelocityX(100);
                        }
                    }   
                        
                    
                }
            }
        }); */
    }
}


export default Pruebas;
