
class Menu extends Phaser.Scene {
    constructor() {
        super({key: 'Menu'});
    }

    init() {
        console.log('Scene: Menu');
    }

    create() {
        const menuTextArray = [
            '  NORMAL\n',
            '  HARD\n\n',
            'PRESS ENTER'
        ];
        //fondo
        const background = this.add.image(0, -100, 'sky')
            .setScale(2.5)
            .setOrigin(0,.20)
            .setAlpha(1);
        
        
        const menuText = this.add.bitmapText(this.scale.width / 2, this.scale.height / 2, 'font', menuTextArray).setOrigin(0.5);

        const selectorPos = [0, 30];
        const selector = this.add.image(this.scale.width / 2 - 80,this.scale.height / 2 - 40 + selectorPos[0], 'selector').setScale(2);

        const cursor = this.input.keyboard.createCursorKeys();
        const start = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        cursor.down.on('down', () => {
            selector.y = 320 + selectorPos[1];
        });

        cursor.up.on('down', () => {
            selector.y = 320 + selectorPos[0];
        });
        start.on("down", ()=>{
            this.scene.start('Nivel1'); 
        });

        this.tweens.add({
            targets: selector,
            ease: (e) => Math.round(e),
            repeat: -1,
            alpha: 1,
        });

        const menuContainer = this.add.container(0,0);
        menuContainer.add([
            selector,
            menuText
        ]);
        const iaara = this.add.sprite(923, 368, 'idle')
            .setScale(.5)
            .setDepth(2);
    }

    
}

export default Menu;
