import Phaser from 'phaser';

import megaman from '../assets/img/bunny-run.png';
import megamanJump from '../assets/img/bunny-jump.png';
import methat from '../assets/img/methat.png';

import wood1 from '../assets/img/wood1.png';
import wood2 from '../assets/img/wood2.png';
import wood3 from '../assets/img/wood3.png';
import wood4 from '../assets/img/wood4.png';
import shot from '../assets/img/bullet.png';

import buster from '../assets/sfx/buster.wav';
export default class GameOver extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOver' });
    }

    init() {}

    preload() {
        this.load.spritesheet('megaman', megaman, { frameWidth: 37, frameHeight: 62 });
        this.load.spritesheet('megaman-jump', megamanJump, { frameWidth: 37, frameHeight: 62 });
        this.load.spritesheet('methat', methat, { frameWidth: 24, frameHeight: 24 });
        
        this.load.image('shot', shot);

        this.load.audio('buster', buster);
        this.load.audio('dink', dink);
        this.load.audio('enemy_hit', enemy_hit);
        this.load.audio('enemy_shoot', enemy_shoot);
        this.load.audio('hit', hit);
        this.load.audio('land', land);

        this.load.audio('bgm1', bgm);

        Object.keys(assetMap).forEach(key => {
            let asset = assetMap[key];
            if (!asset.file) {
                return;
            }
            this.load.image(asset.name, asset.file);
            console.log("LOADING: " + asset.name + " => " + asset.file);
        });
    }

    create() {
        this.scene.start('Game');
    }
}