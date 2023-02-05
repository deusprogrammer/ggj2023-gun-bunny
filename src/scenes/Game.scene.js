import GunBunny from "../sprites/GunBunny.sprite";
import Mole from "../sprites/Mole.sprite";

export default class Game extends Phaser.Scene {
    constructor() {
        super({ key: 'Game' });
    }
      
    create () {
        this.cameras.main.setBounds(0, 0, 5000, 1080);
        this.physics.world.setBounds(0, 0, 5000, 1080);

        this.gunBunny = new GunBunny(this, 0, 0);
        this.mole = new Mole(this, 2000, 0);

        this.enemyGroup = this.physics.add.group();
        this.enemyBulletGroup = this.physics.add.group();
        
        this.enemyGroup.add(new Mole(this, 2000, 0), true);

        this.cameras.main.startFollow(this.gunBunny);

        this.platforms = this.physics.add.staticGroup();

        for (let i = 0; i < 5000; i++) {
            let block = this.physics.add.staticSprite(i * 64, 1080, 'wood1');
            block.scale *= 4;
            block.setOrigin(0, 1);
            block.refreshBody();
            this.platforms.add(block);
        }

        this.physics.add.overlap(this.gunBunny, this.enemyGroup, (obj, obj2) => {
            this.gunBunny.onHit(obj2);
        });
        this.physics.add.overlap(this.gunBunny, this.enemyBulletGroup, (obj1, obj2) => {
            this.gunBunny.onHit(obj2);
        });
        this.physics.add.overlap(this.gunBunny.bulletGroup, this.enemyGroup, (obj1, obj2) => {
            let enemy = obj2;
            let weapon = obj1;
            this.gunBunny.bulletGroup.remove(weapon);
            enemy.onHit(weapon);
        });
        
        this.physics.add.collider(this.enemyGroup, this.platforms, (obj) => {
            let enemy = obj;
            enemy.onCollision();
        });

        this.physics.add.collider(this.gunBunny, this.platforms);

        this.physics.world.on('worldbounds', (body) => {
            if (this.player.bulletGroup.contains(body.gameObject)) {
                body.destroy();
            }
        });
    }

    update () {
        this.gunBunny.update();
        this.enemyGroup.children.each((enemy) => {
            enemy.update();
        });
    }
}