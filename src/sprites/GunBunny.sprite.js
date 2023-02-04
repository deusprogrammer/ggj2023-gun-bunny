import Phaser from 'phaser';

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
            frames: this.anims.generateFrameNumbers('megaman', { start: 0, end: 1 }),
            frameRate: 1,
            repeat: 1
        });

        this.anims.create({
            key: 'stand-gun',
            frames: this.anims.generateFrameNumbers('megaman', { start: 2, end: 2 }),
            frameRate: 1,
            repeat: 1
        });

        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('megaman', { start: 6, end: 9 }),
            frameRate: 8,
            repeat: 1
        });

        this.anims.create({
            key: 'walk-gun',
            frames: this.anims.generateFrameNumbers('megaman', { start: 2, end: 5 }),
            frameRate: 8,
            repeat: 1
        });

        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('megaman', { start: 10, end: 10 }),
            frameRate: 8,
            repeat: 1
        });

        this.anims.create({
            key: 'jump-gun',
            frames: this.anims.generateFrameNumbers('megaman', { start: 11, end: 11 }),
            frameRate: 8,
            repeat: 1
        });

        this.anims.create({
            key: 'hurt',
            frames: this.anims.generateFrameNumbers('megaman', { start: 12, end: 12 }),
            frameRate: 8,
            repeat: 1
        });

        this.scale *= 4;

        this.setCollideWorldBounds(true);

        this
            .setActive(true)
            .setOrigin(0.5, 0.5)
            .setCollideWorldBounds(true)
            .setSize(22, 22)
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
            control.left        = control.left  || this.scene.input.gamepad.gamepads[0].left;
            control.right       = control.right || this.scene.input.gamepad.gamepads[0].right;
            control.jump        = control.jump  || this.scene.input.gamepad.gamepads[0].R1;
            control.shoot       = control.shoot || this.scene.input.gamepad.gamepads[0].X;
            control.rightStick  = this.scene.input.gamepad.gamepads[0].rightStick.angle();
        }

        return control;
    }

    update(...args) {
        super.update();
        let control = this.getControllerState();

        // If player is hurt, controls are locked.
        if (this.state === 'hurt') {
            this.play('hurt', true);
            this.setVelocityX(this.flipX ? -40 : 40);
            return;
        }

        // Set visible
        this.setAlpha(1);

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
            this.setVelocityY(-100);
            this.framesLeft = 60;
        } else if (control.jump && this.state === 'jumping' && this.framesLeft > 0) {
            this.setVelocityY(-500);
            this.framesLeft--;
        } else if (!control.jump && this.state === 'jumping') {
            this.framesLeft = 0;
        }

        // Determine direction of sprite based on velocity.
        if (this.body.velocity.x >= 0) {
            this.flipX = true;
        } else if (this.body.velocity.x < 0) {
            this.flipX = false;
        }

        if (control.rightStick && !this.isShooting) {
            this.isShooting = true;

            this.sounds.buster.play();

            let megaBusterShot = this.scene.physics.add.sprite(this.x + (this.flipX ? 32 : -32), this.y, 'shot');
            this.scene.add.existing(megaBusterShot);
            
            this.bulletGroup.add(megaBusterShot, true);

            megaBusterShot.scale *= 4;
            megaBusterShot.body.allowGravity = false;
            if (control.rightStick) {
                let x = Math.cos(control.rightStick) * 2000;
                let y = Math.sin(control.rightStick) * 2000;
                megaBusterShot
                    .setVelocity(x, y)
                    .setRotation(control.rightStick);
            }

            setTimeout(() => {
                this.isShooting = false;
            }, 50); 
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
            child.update();
        })
    }

}