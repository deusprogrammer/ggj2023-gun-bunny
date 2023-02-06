import GunBunny from "../sprites/GunBunny.sprite";
import {Level} from "../levels/levels";

export default class Game extends Phaser.Scene {
    constructor() {
        super({ key: 'Game' });
    }
      
    create () {
        this.cameras.main.setBackgroundColor(0x87ceeb)
        this.gunBunny = new GunBunny(this, 0, 0);
        this.level = new Level(this, 'level1');
        this.levelEndMusic = this.sound.add('level-end');
        this.state = "play";

        this.cameras.main.setBounds(0, 0, this.level.width * 64, this.level.height * 64);
        this.physics.world.setBounds(0, 0, this.level.width * 64, this.level.height * 64);

        this.enemyGroup = this.level.enemies;
        this.enemyBulletGroup = this.physics.add.group();
        this.platforms = this.level.blocks;

        this.cameras.main.startFollow(this.gunBunny);

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

        if (this.enemyGroup.countActive(true) === 0 && this.state !== "complete") {
            this.state = "complete";
            this.level.bgm.stop();
            this.levelEndMusic.play();
            this.cameras.main.stopFollow();
            const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
            const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
            this.add.text(screenCenterX, screenCenterY, "Level Complete", {fontSize: 72}).setOrigin(0.5);
        }

        if (this.state === "complete" && !this.levelEndMusic.isPlaying) {
        }
    }
}