import 'phaser';

export class UIOverlay extends Phaser.Scene {
    constructor() {
        super('UIOverlay');
    }

    init({player, enemyGroup}) {
        this.player = player;
        this.enemyGroup = enemyGroup;
        this.player.on('player_hit', () => {
            this.healthDisplay.clear(true, true);
            this.drawHealthDisplay();
        });
        this.enemyGroup.on('enemy_destroyed', () => {
            this.drawEnemyCount();
        });
    }

    create() {
        this.healthDisplay = this.add.group();
        this.enemyText = this.add.text(250, 50, `Enemies X ${this.enemyGroup.countActive(true)}`, {fontSize: 30, stroke: 'black', strokeThickness: 3});
        this.enemyText.setOrigin(0, 0.5);
        this.drawHealthDisplay();
    }

    drawEnemyCount() {
        this.enemyText.setText(`Enemies X ${this.enemyGroup.countActive(true)}`);
    }

    drawHealthDisplay() {
        for (let i = 0; i < this.player.hp; i++) {
            let rect = this.add.rectangle(0, 0, 240, 100, 'black');
            let carrot = this.add.image(i * 70, 60, 'shot');
            rect.setOrigin(0, 0);
            carrot
                .setOrigin(0, 0)
                .setScrollFactor(0)
                .setDepth(9999)
                .setRotation(-0.25 * Math.PI);
            this.healthDisplay.add(carrot);
        }
    }
}