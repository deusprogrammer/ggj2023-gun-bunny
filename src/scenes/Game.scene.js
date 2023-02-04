import GunBunny from "../sprites/GunBunny.sprite";

export default class Game extends Phaser.Scene {
    constructor() {
        super({ key: 'Game' });
    }
      
    create () {
        this.cameras.main.setBounds(0, 0, 5000, 1080);
        this.physics.world.setBounds(0, 0, 5000, 1080);

        this.gunBunny = new GunBunny(this, 0, 0);
        this.cameras.main.startFollow(this.gunBunny);

        this.platforms = this.physics.add.staticGroup();

        for (let i = 0; i < 100; i++) {
            let block = this.physics.add.staticSprite(Math.floor(Math.random() * 5000/64) * 64, 1080, 'wood1');
            block.scale *= 4;
            block.setOrigin(0, 1);
            block.refreshBody();
            this.platforms.add(block);
        }

        this.physics.add.collider(this.gunBunny, this.platforms);
    }

    update () {
        this.gunBunny.update();
    }
}