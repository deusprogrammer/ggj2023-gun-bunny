export default class GameOver extends Phaser.Scene {
    constructor() {
        super({
            key: 'GameOver'
        });
    }

    create() {
        // Display the "Game Over" text
        let gameOverText = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2, 'Game Over', {
            fontSize: '64px',
            fontFamily: 'Arial',
            color: '#ff0000',
            align: 'center'
        });
        gameOverText.setOrigin(0.5, 0.5);

        // Add a restart button
        let restartButton = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2 + 100, 'Restart', {
            fontSize: '32px',
            fontFamily: 'Arial',
            color: '#0000ff',
            align: 'center'
        });
        restartButton.setOrigin(0.5, 0.5);
        restartButton.setInteractive();
        restartButton.on('pointerdown', () => {
            // Go back to the main scene when the restart button is clicked
            this.scene.start('Game');
        });
    }
}