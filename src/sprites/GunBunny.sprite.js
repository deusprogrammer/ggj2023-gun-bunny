import Phaser from 'phaser';
import { HealthBar } from '../objects/HealthBar';

const JUMP_FRAMES = 40;
const INITIAL_JUMP_VEL = -100;
const EXTENDED_JUMP_VEL = -700;

export default class GunBunny extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'megaman');

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.bulletGroup = scene.physics.add.group();
        
        this.sounds = {};
        this.sounds.land = this.scene.sound.add('land', {loop: false, volume: 1});
        this.sounds.hit = this.scene.sound.add('hit', {loop: false, volume: 1});
        this.sounds.buster = this.scene.sound.add('buster', {loop: false, volume: 1});

        this.anims.create({
            key: 'stand',
            frames: this.anims.generateFrameNumbers('megaman', { start: 0, end: 0 }),
            frameRate: 1,
            repeat: 1
        });

        this.anims.create({
            key: 'stand-gun',
            frames: this.anims.generateFrameNumbers('megaman', { start: 0, end: 0 }),
            frameRate: 1,
            repeat: 1
        });

        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('megaman', { start: 0, end: 5 }),
            frameRate: 8,
            repeat: 1
        });

        this.anims.create({
            key: 'walk-gun',
            frames: this.anims.generateFrameNumbers('megaman', { start: 0, end: 5 }),
            frameRate: 8,
            repeat: 1
        });

        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('megaman-jump', { start: 0, end: 0 }),
            frameRate: 8,
            repeat: 1
        });

        this.anims.create({
            key: 'jump-gun',
            frames: this.anims.generateFrameNumbers('megaman-jump', { start: 0, end: 0 }),
            frameRate: 8,
            repeat: 1
        });

        this.anims.create({
            key: 'hurt',
            frames: this.anims.generateFrameNumbers('megaman', { start: 0, end: 0 }),
            frameRate: 8,
            repeat: 1
        });

        this.scale *= 2;
        this.isInvulnerable = false;

        this.setCollideWorldBounds(true);

        this
            .setActive(true)
            .setOrigin(0.5, 0.5)
            .setCollideWorldBounds(true)
            .setSize(37, 55)
            .refreshBody();

        this.controls = {
            up: this.scene.input.keyboard.addKey('W'),
            down: this.scene.input.keyboard.addKey('S'),
            left: this.scene.input.keyboard.addKey('A'),
            right: this.scene.input.keyboard.addKey('D'),
            jump: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
            shoot: this.scene.input.keyboard.addKey('J')
        };

        if (this.scene.input.gamepad) {
            this.scene.input.gamepad.once('connected', (pad) => {
                this.isGamepadConnected = true;
            });
        }

        this.state = 'standing';

        this.healthBar = new HealthBar(scene, this.body.width, 3);
    }

    getControllerState() {
        let control = {
            up: this.controls.up.isDown,
            down: this.controls.down.isDown,
            left: this.controls.left.isDown,
            right: this.controls.right.isDown,
            jump: this.controls.jump.isDown,
            shoot: this.controls.shoot.isDown
        };
        if (this.isGamepadConnected) {
            control.up          = control.up    || this.scene.input.gamepad.gamepads[0].up;
            control.down        = control.down  || this.scene.input.gamepad.gamepads[0].down;
            control.left        = control.left  || this.scene.input.gamepad.gamepads[0].leftStick.x < 0 || this.scene.input.gamepad.gamepads[0].left;
            control.right       = control.right || this.scene.input.gamepad.gamepads[0].leftStick.x > 0 || this.scene.input.gamepad.gamepads[0].right;;
            control.jump        = control.jump  || this.scene.input.gamepad.gamepads[0].R1;
            control.shoot       = control.shoot || this.scene.input.gamepad.gamepads[0].rightStick.x !== 0 || this.scene.input.gamepad.gamepads[0].rightStick.y !== 0;
            control.rightStick  = this.scene.input.gamepad.gamepads[0].rightStick.angle();
        }

        return control;
    }

    update(...args) {
        super.update();

        this.healthBar.move(this.x, this.y);

        let control = this.getControllerState();

        // If player is hurt, controls are locked.
        if (this.state === 'hurt') {
            this.play('hurt', true);
            this.setVelocity(0);
            return;
        }

        // Set visible
        this.setAlpha(1);

        if (this.isInvulnerable) {
            this.setAlpha(0.5);
        }

        // Controls
        if (control.right) {
            this.setVelocityX(500);
        } else if (control.left) {
            this.setVelocityX(-500);
        } else {
            this.setVelocityX(0);
        }

        // If player is jumping
        if (control.jump && this.body.blocked.down) {
            this.setVelocityY(INITIAL_JUMP_VEL);
            this.framesLeft = JUMP_FRAMES;
        } else if (control.jump && this.state === 'jumping' && this.framesLeft > 0) {
            this.setVelocityY(EXTENDED_JUMP_VEL);
            this.framesLeft--;
        } else if (!control.jump && this.state === 'jumping') {
            this.framesLeft = 0;
        }

        // Determine direction of sprite based on velocity.
        if (this.body.velocity.x > 0) {
            this.flipX = false;
        } else if (this.body.velocity.x < 0) {
            this.flipX = true;
        }

        // If player is shooting
        if (control.shoot) {
            let x = Math.cos(control.rightStick) * 2000;
            let y = Math.sin(control.rightStick) * 2000;

            if (x > 0) {
                this.flipX = false;
            } else {
                this.flipX = true;
            }

            if (!this.isShooting) {
                this.isShooting = true;
                this.sounds.buster.play();

                let megaBusterShot = this.scene.physics.add.sprite(this.x + (!this.flipX ? 32 : -32), this.y, 'shot');
                this.scene.add.existing(megaBusterShot);
                
                this.bulletGroup.add(megaBusterShot, true);

                // megaBusterShot.scale *= 1;
                megaBusterShot.body.allowGravity = false;
                megaBusterShot
                    .setVelocity(x, y)
                    .setRotation(control.rightStick);

                setTimeout(() => {
                    this.isShooting = false;
                    this.scene.input.gamepad.gamepads[0].vibration = 0;
                }, 50); 
                }
        }

        // Determine sound to play based on state changes.
        if (this.body.blocked.down && this.state === 'jumping') {
            this.state = 'standing';
            this.sounds.land.play();
        }

        // Determine animation to play.
        if (!this.body.blocked.down) {
            this.state = 'jumping';
            this.play(this.isShooting ? 'jump-gun' : 'jump', true);
        } else if (this.body.velocity.x !== 0) {
            this.play(this.isShooting ? 'walk-gun' : 'walk', true);
        } else {
            this.play(this.isShooting ? 'stand-gun' : 'stand');
        }

        this.bulletGroup.children.each((child) => {
            if (!this.scene.cameras.main.worldView.contains(child.x, child.y)) {
                child.destroy();
                return;
            }
            child.update();
        })
    }

    onHit(damageSource) {
        if (this.state === 'hurt' || this.isInvulnerable) {
            return;
        }

        this.state = 'hurt';
        this.isInvulnerable = true;

        this.sounds.hit.play();

        if (this.healthBar.decrease(1)) {
            const screenCenterX = this.scene.cameras.main.worldView.x + this.scene.cameras.main.width / 2;
            const screenCenterY = this.scene.cameras.main.worldView.y + this.scene.cameras.main.height / 2;
            this.scene.add.text(screenCenterX, screenCenterY, "Game Over", {fontSize: 72}).setOrigin(0.5);
            this.scene.level.bgm.stop();
            this.healthBar.bar.destroy();
            this.disableBody();
            this.setAlpha(0);
            return;
        }
        
        setTimeout(() => {
            this.state = 'standing';
            setTimeout(() => {
                this.isInvulnerable = false;
            }, 1000);
        }, 200);
    }
}