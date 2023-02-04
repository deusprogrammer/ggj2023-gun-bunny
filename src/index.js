import Phaser from 'phaser';
import Game from './scenes/Game.scene';
import Preload from './scenes/Preload.scene';

const config = {
    type: Phaser.AUTO,
    input: {
        gamepad: true
    },
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'parent',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [Preload, Game],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 800 }
        }
    }
};

const game = new Phaser.Game(config);
// game.world.setBounds(0, 0, 5000, window.innerHeight);