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
import dink from '../assets/sfx/dink.wav';
import enemy_hit from '../assets/sfx/enemy_hit.wav';
import enemy_shoot from '../assets/sfx/enemy_shoot.wav';
import hit from '../assets/sfx/hit.wav';
import land from '../assets/sfx/land.wav';

export default class Preload extends Phaser.Scene {
    constructor() {
        super({ key: 'Preload' });
    }

    init() {}

    preload() {
        this.load.spritesheet('megaman', megaman, { frameWidth: 37, frameHeight: 62 });
        this.load.spritesheet('megaman-jump', megamanJump, { frameWidth: 37, frameHeight: 62 });
        this.load.spritesheet('methat', methat, { frameWidth: 24, frameHeight: 24 });
        
        this.load.image('shot', shot);
        this.load.image('wood1', wood1);
        this.load.image('wood2', wood2);
        this.load.image('wood3', wood3);
        this.load.image('wood4', wood4);

        this.load.audio('buster', buster);
        this.load.audio('dink', dink);
        this.load.audio('enemy_hit', enemy_hit);
        this.load.audio('enemy_shoot', enemy_shoot);
        this.load.audio('hit', hit);
        this.load.audio('land', land);
    }

    create() {
        this.scene.start('Game');
    }
}