import Phaser from 'phaser';
import Game from './scenes/Game.scene';
import Preload from './scenes/Preload.scene';
import GameOver from './scenes/GameOver.scene';

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
    scene: [Preload, Game, GameOver],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 2500 }
        }
    }
};

new Phaser.Game(config);
// game.world.setBounds(0, 0, 5000, window.innerHeight);