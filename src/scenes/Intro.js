
class Intro extends Phaser.Scene {
    constructor() {
        super({key: 'Intro'});
    }

    init() {
        console.log('Scene: Intro');
        this.camara = this.cameras.main;
    }

    create() {
        const start = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        const background = this.add.image(0, -100, 'sky')
            .setScale(2.5)
            .setOrigin(0,.20)
            .setAlpha(0);

        const creditsTextArray = [
            '2020 THE ART OF MEANING\n',
            'MADE BY WALTER ALTURO\n',
            'SOUND ART BY MUSICPRODUCTIONS FREE\n',
            'PIXEL ARTS BY FREE GAME ARTS\n',
            'AND CREATED WITH PHASER 3'
        ];

        const textArray = {
            text: [
                'EN EL SIGLO XXI,\n\nUNA CHICA LLAMADA ARA',
                'FUE ENCERRADA\n\nEN OTRA REALIDAD.',
                'HORA ELLA LUCHA\n\nPARA VOLVER A SU HOGAR.',
                'SIN EMBARGO, SU DESTINO\n\nESTARA LIGADO A SU CORAZON.'
            ],
            count: 0
        };

        // Créditos
        const creditsText = this.add.bitmapText(
            this.scale.width / 2,
            this.scale.height / 2, 
            'font',
            creditsTextArray, 16, 1
        ).setOrigin(0.5).setDepth(2);

        // Texto historia
        const historyText = this.add.bitmapText(0, 0, 'font', textArray.text[0])
            .setCenterAlign()
            .setDepth(2)
            .setAlpha(0);

        Phaser.Display.Align.In.BottomCenter(
            historyText,
            this.add.zone(0, 170, 1290, 480).setOrigin(0)
        );
        
        const background_text = this.add.image(0, this.scale.height*1.3, 'background_text')
            .setOrigin(0, 1)
            .setScrollFactor(0.7)
            .setDepth(1)
            .setScale(2.5);

        const timeLine = this.tweens.createTimeline();
         
        timeLine.add({
            targets: creditsText,
            alpha: 0,
            delay: 3000,
            duration: 500,
            onComplete: () => {
                this.cameras.main.flash(500);
            }
        });

        timeLine.add({
            targets: background,
            alpha: 1,
            duration: 1000
        });
      
        timeLine.add({
            targets: historyText,
            alpha: 1,
            repeat: textArray.text.length - 1,
            hold: 2900,
            repeatDelay: 100,
            yoyo: true,
            onRepeat: () => {
                textArray.count++;

                historyText.setText(textArray.text[textArray.count]);
                Phaser.Display.Align.In.BottomCenter(
                    historyText,
                    this.add.zone(0, 170, 1290, 480).setOrigin(0)
                );
            },
            onComplete: () => {
                this.cameras.main.flash(1000);
            }
            
        });

        timeLine.play();

        timeLine.on("complete", ()=>{
            this.scene.start('Menu');
        });

        start.on("down", ()=>{
            this.scene.start('Menu');
        });
    }
    

}

export default Intro;
