import Boss1 from './scenes/Boss1.js';
import Interfaz from './scenes/Interfaz.js';
import Nivel1 from './scenes/Nivel1.js';
import Menu from './scenes/Menu.js';
import Intro from './scenes/Intro.js';
import Pruebas from './scenes/Pruebas.js';
import Bootloader from './Bootloader.js';

const config = {
    title: "Corazon con imaginacion 1.2",
    version: "0.0.1",
    type: Phaser.AUTO,
    scale: {
        parent: "phaser_container",
        width: 1280,
        height: 720,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    //backgroundColor: "#c7ecee",
    backgroundColor: "#000",
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: {
            debug: false,
            gravity: {
                y: 800
            }
        }
    },
    scene: [Bootloader, Pruebas, Intro, Menu, Nivel1, Interfaz, Boss1]
};

new Phaser.Game(config);