

class Interfaz extends Phaser.Scene {
    
    constructor() {
        
        super({key: 'Interfaz'});
    }

    init(data) {
        console.log('Scene: Interfaz');
        this.scena = data.scene;
        this.lives = data.lives;
    }

    create() {
        //restart & pause   
        this.scena.pause = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        this.scena.continue = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.scena.restart = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.restartPanel = this.add.graphics();
        this.restartPanel.fillStyle(0x000000).setAlpha(0);
        this.restartPanel.fillRect(0,0,1280,720).setDepth(4);
        //when player lose animation
        const loseTextArray = [
            '     YOU LOSE \n',
            'PRESS R TO RESTART '
        ];
        const pauseTextArray = [
            'PRESS ENTER TO CONTINUE \n',
            'PRESS R TO RESTART '
        ];
        
        this.loseText = this.add.bitmapText(
            this.scale.width / 2,
            this.scale.height / 2, 
            'font',
            loseTextArray, 40, 3
        ).setOrigin(0.5).setDepth(5).setAlpha(0);

        this.pauseText = this.add.bitmapText(
            this.scale.width / 2,
            this.scale.height / 2, 
            'font',
            pauseTextArray, 40, 3
        ).setOrigin(0.5).setDepth(5).setAlpha(0);

        this.scena.timeLineLost = this.tweens.createTimeline();

        this.scena.timeLineLost.add({
            targets: this.restartPanel,
            duration: 1000,
            alpha: 0.6
        });
        this.scena.timeLineLost.add({
            targets: this.loseText,
            duration: 1000,
            alpha: 1
        });

        this.pauseTimeLine = this.tweens.createTimeline();
        
        this.pauseTimeLine.add({
            targets: this.restartPanel,
            duration: 500,
            alpha: 0.6
        });
        this.pauseTimeLine.add({
            targets: this.pauseText,
            duration: 500,
            alpha: 1
        });
        this.dispauseTimeLine = this.tweens.createTimeline();

        this.dispauseTimeLine.add({
            targets: this.restartPanel,
            duration: 100,
            alpha: 0
        });
        this.dispauseTimeLine.add({
            targets: this.pauseText,
            duration: 100,
            alpha: 0
        });
        this.points = "000000000";
        this.lives = this.add.group({
            key: "lives",
            repeat: this.lives-1,
            setXY: {
                x: 20,
                y: 20,
                stepX: 30
            }
        });
        this.lives.children.iterate((x)=>{
            x.setScale(.3);
            x.setDepth(6);
        });
        this.add.bitmapText(
            this.scale.width - 210,
            20,
            'font',
            this.points, 20, 3
        ).setDepth(6);

    }
    update(time, delta) {
        if(this.scene.isPaused("Nivel1") && !this.scena.bossEscene1Complete){
            this.pauseTimeLine.play();
            this.dispauseTimeLine.pause();
            if(this.scena.continue.isDown){
                this.scena.scene.resume();
                this.dispauseTimeLine.play();
                this.pauseTimeLine.pause();
                
            }else if(this.scena.restart.isDown){
                this.scena.scene.restart();
            }
        }
    }
}

export default Interfaz;
