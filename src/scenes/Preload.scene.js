import Phaser from 'phaser';

import megaman from '../assets/img/bunny-run.png';
import megamanJump from '../assets/img/bunny-jump.png';
import methat from '../assets/img/methat.png';

import fire from '../assets/img/fire.png';

import carrot from '../assets/img/bullet.png';
import potato from '../assets/img/potato.png';

import buster from '../assets/sfx/buster.wav';
import dink from '../assets/sfx/dink.wav';
import enemy_hit from '../assets/sfx/enemy_hit.wav';
import enemy_shoot from '../assets/sfx/enemy_shoot.wav';
import hit from '../assets/sfx/hit.wav';
import land from '../assets/sfx/land.wav';

import bgm from '../assets/music/bgm.mp3';
import levelEndMusic from '../assets/music/level-end.mp3';

import {assetMap} from '../levels/levels';

export default class Preload extends Phaser.Scene {
    constructor() {
        super({ key: 'Preload' });
    }

    init() {}

    preload() {
        this.load.spritesheet('megaman', megaman, { frameWidth: 37, frameHeight: 62 });
        this.load.spritesheet('megaman-jump', megamanJump, { frameWidth: 37, frameHeight: 62 });
        this.load.spritesheet('methat', methat, { frameWidth: 24, frameHeight: 24 });
        
        this.load.image('fire', fire);

        this.load.image('shot', carrot);
        this.load.image('enemy_shot', potato);

        this.load.audio('buster', buster);
        this.load.audio('dink', dink);
        this.load.audio('enemy_hit', enemy_hit);
        this.load.audio('enemy_shoot', enemy_shoot);
        this.load.audio('hit', hit);
        this.load.audio('land', land);

        this.load.audio('bgm1', bgm);
        this.load.audio('level-end', levelEndMusic);

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