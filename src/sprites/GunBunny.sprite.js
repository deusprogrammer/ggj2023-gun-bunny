import Phaser from 'phaser';

const JUMP_FRAMES = 40;
const INITIAL_JUMP_VEL = -50;
const EXTENDED_JUMP_VEL = -500;

const DASH_SPEED = 2000;
const DASH_FRAMES = 15;
const DASH_COOLDOWN = 360;

const STOMP_SPEED = 2000;

export default class GunBunny extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'megaman');

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.bulletGroup = scene.physics.add.group();

        // Create the particle emitter
        this.emitter = this.scene.add.particles('fire').createEmitter({
            speed: { min: -50, max: 50 },
            angle: { min: 145, max: 215 },
            scale: { start: 0.5, end: 0 },
            blendMode: 'ADD',
            lifespan: 300
        });
        this.emitter.startFollow(this);
        
        // Align the emitter behind the sprite
        this.emitter.setPosition(this.x - this.width, this.y);
        this.emitter.setVisible(false);

        // Create the smaller hitbox
        this.hitbox = this.scene.physics.add.sprite(this.x, this.y, null);
        this.hitbox.setVisible(false);
        this.hitbox.body.setCircle(30);
        this.hitbox.body.debugShowBody = true;
        
        // Disable gravity and collision for the hitbox
        this.hitbox.body.allowGravity = false;
        this.hitbox.body.setCollideWorldBounds(false);
        this.hitbox.body.setImmovable(true);
        
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

        this.setCollideWorldBounds(true);

        this
            .setActive(true)
            .setOrigin(0.5, 0.5)
            .setScale(2)
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

        this.hp = 3;
        this.dashCooldown = 0;
        this.isInvulnerable = false;
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
            control.up          = control.up      || this.scene.input.gamepad.gamepads[0].up;
            control.down        = control.down    || this.scene.input.gamepad.gamepads[0].leftStick.y < 0 || this.scene.input.gamepad.gamepads[0].down;
            control.left        = control.left    || this.scene.input.gamepad.gamepads[0].leftStick.x < 0 || this.scene.input.gamepad.gamepads[0].left;
            control.right       = control.right   || this.scene.input.gamepad.gamepads[0].leftStick.x > 0 || this.scene.input.gamepad.gamepads[0].right;;
            control.jump        = control.jump    || this.scene.input.gamepad.gamepads[0].R1;
            control.slam        = control.slam    || this.scene.input.gamepad.gamepads[0].R2;
            control.shield      = control.shield  || this.scene.input.gamepad.gamepads[0].L1;
            control.dash        = control.dash    || this.scene.input.gamepad.gamepads[0].L2;
            control.shoot       = control.shoot   || this.scene.input.gamepad.gamepads[0].rightStick.x !== 0 || this.scene.input.gamepad.gamepads[0].rightStick.y !== 0;
            control.rightStick  = this.scene.input.gamepad.gamepads[0].rightStick.angle();
        }

        return control;
    }

    update() {
        super.update();

        this.hitbox.x = this.x;
        this.hitbox.y = this.y;
        // this.hitBox.setPosition(this.getCenter().x, this.getCenter().y);

        let control = this.getControllerState();

        if (this.dashFrames > 0) {
            this.dashFrames--;
            this.emitter.setVisible(true);
            this.emitter.setAlpha(this.dashFrames/DASH_FRAMES);
            this.play('jump');
            return;
        }

        this.emitter.setVisible(false);
        this.body.setAllowGravity(true);

        if (this.dashCooldown > 0) {
            this.dashCooldown--;
        }

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
            // this.setAccelerationX(1000);
        } else if (control.left) {
            this.setVelocityX(-500);
            // this.setAccelerationX(-1000);
        } else {
            this.setVelocityX(0);
        }

        // If player is performing movement actions
        if (control.dash && this.dashCooldown === 0) {
            this.dashFrames = DASH_FRAMES;
            this.dashCooldown = DASH_COOLDOWN;
            this.setVelocity(this.flipX ? -DASH_SPEED : DASH_SPEED, 0);
            this.body.setAllowGravity(false);
        } else if (control.slam && this.state === 'jumping') {
            this.state = 'stomping';
            this.setVelocityY(STOMP_SPEED);
        } else if (control.jump && this.body.blocked.down) {
            this.state = 'jumping';
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
            if (this.state !== 'stomping') {
                this.state = 'jumping';
            }
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
        if (this.state === 'hurt' || this.isInvulnerable || this.dashFrames > 0) {
            return;
        }

        this.state = 'hurt';
        this.isInvulnerable = true;

        this.sounds.hit.play();

        this.hp--;
        this.emit('player_hit');

        if (this.hp <= 0) {
            this.emit('death');
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