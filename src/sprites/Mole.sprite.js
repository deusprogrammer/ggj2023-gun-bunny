import Phaser from 'phaser';
import { HealthBar } from '../objects/HealthBar';

export default class Mole extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'methat');

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.scale *= 6;

        this.sounds = {};
        this.bulletGroup = this.scene.physics.add.group();
        this.sounds.dink = this.scene.sound.add('dink', {loop: false, volume: 1});
        this.sounds.enemyHit = this.scene.sound.add('enemy_hit', {loop: false, volume: 1});
        this.sounds.enemyShoot = this.scene.sound.add('enemy_shoot', {loop: false, volume: 1});

        this
            .setActive(true)
            .setOrigin(0.5, 0)
            .setCollideWorldBounds(true)
            .refreshBody();

        this.anims.create({
            key: 'guard',
            frames: this.anims.generateFrameNumbers('methat', { start: 0, end: 0 }),
            frameRate: 1,
            repeat: 1
        });

        this.anims.create({
            key: 'stand',
            frames: this.anims.generateFrameNumbers('methat', { start: 0, end: 2 }),
            frameRate: 8,
            repeat: 1
        });

        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('methat', { start: 2, end: 2 }),
            frameRate: 8,
            repeat: 1
        });

        this.anims.create({
            key: 'jump-gun',
            frames: this.anims.generateFrameNumbers('methat', { start: 2, end: 2 }),
            frameRate: 8,
            repeat: 1
        });

        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('methat', { start: 2, end: 3 }),
            frameRate: 8,
            repeat: 1
        });

        this.anims.create({
            key: 'walk-gun',
            frames: this.anims.generateFrameNumbers('methat', { start: 2, end: 3 }),
            frameRate: 8,
            repeat: 1
        });

        this.anims.create({
            key: 'stand-gun',
            frames: this.anims.generateFrameNumbers('methat', { start: 2, end: 2 }),
            frameRate: 8,
            repeat: 1
        });

        this.anims.create({
            key: 'hurt',
            frames: this.anims.generateFrameNumbers('methat', { start: 2, end: 2 }),
            frameRate: 8,
            repeat: 1
        });

        this.state = 'guard';
        this.hp = 30;

        this.healthBar = new HealthBar(scene, this.body.width, 30);
    }

    onCollision() {
        if (this.state === 'guard') {
            return;
        }

        // If collided with wall
        if (this.body.touching.left) {
            this.body.velocity.x = 200;
        } else if (this.body.touching.right) {
            this.body.velocity.x = -200;
        }
    }

    onHit(weapon) {
        if (this.state === 'guard') {
            this.sounds.dink.play();
            weapon.setVelocity(-weapon.body.velocity.x, -Math.abs(weapon.body.velocity.x));
            return;
        }

        weapon.destroy();

        this.sounds.enemyHit.play();

        if (this.healthBar.decrease(1)) {
            this.destroy();
            this.healthBar.destroy();
        }
    }

    update() {
        super.update();

        const scene = this.scene;

        this.healthBar.move(this.x, this.y);

        if (this.scene.game.loop.frame % 500 === 0 && this.body.touching.down && this.state === 'guard') {
            this.state = 'standing';

            // Make him start walking shortly after standing up
            setTimeout(() => {
                if (!this) {
                    return;
                }

                this.sounds.enemyShoot.play();

                let megaBusterShot = this.scene.physics.add.sprite(this.x + (this.flipX ? 32 : -32), this.y, 'shot');
                this.scene.add.existing(megaBusterShot);
                
                scene.enemyBulletGroup.add(megaBusterShot, true);

                megaBusterShot.scale *= 4;
                megaBusterShot.body.allowGravity = false;
                megaBusterShot
                    .setVelocityX(this.flipX ? 300 : -300);

                megaBusterShot = this.scene.physics.add.sprite(this.x + (this.flipX ? 32 : -32), this.y, 'shot');
                this.scene.add.existing(megaBusterShot);
                
                scene.enemyBulletGroup.add(megaBusterShot, true);

                megaBusterShot.scale *= 4;
                megaBusterShot.body.allowGravity = false;
                megaBusterShot
                    .setVelocity(this.flipX ? 300 : -300, -75);

                megaBusterShot = this.scene.physics.add.sprite(this.x + (this.flipX ? 32 : -32), this.y, 'shot');
                this.scene.add.existing(megaBusterShot);
                
                scene.enemyBulletGroup.add(megaBusterShot, true);

                megaBusterShot.scale *= 4;
                megaBusterShot.body.allowGravity = false;
                megaBusterShot
                    .setVelocity(this.flipX ? 300 : -300, 75);

                this.state = 'walking';
                this.setVelocityX(-200);
            }, 200);

            // Make him guard again after 10 seconds.
            setTimeout(() => {
                if (!this || !this.body) {
                    return;
                }
                this.state = 'guard';
                this.setVelocityX(0);
            }, 3000);
        }

        // Determine direction of sprite based on velocity.
        if (this.body.velocity.x > 0) {
            this.flipX = true;
        } else if (this.body.velocity.x < 0) {
            this.flipX = false;
        }

        if (this.state === 'hurt') {
            this.play('hurt', true);
        } else if (!this.body.touching.down) {
            this.play(this.isShooting ? 'jump-gun' : 'jump', true);
        } else if (this.body.velocity.x !== 0) {
            this.play(this.isShooting ? 'walk-gun' : 'walk', true);
        } else {
            this.play(this.state === 'standing' ? (this.isShooting ? 'stand-gun': 'stand') : 'guard', true);
        }
    }
}