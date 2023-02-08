import Phaser from 'phaser';
import grass1 from '../assets/img/grass1.png';
import grass2 from '../assets/img/grass2.png';
import grass3 from '../assets/img/grass3.png';
import grass4 from '../assets/img/grass4.png';
import Mole from '../sprites/Mole.sprite';

export const levels = {
	level1: {
		tilemap: [
            ["  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  "],
            ["  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  "],
            ["  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  "],
            ["  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  "],
            ["  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  "],
            ["  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  "],
            ["  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  "],
            ["  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  "],
            ["  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","$2","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","$3","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  "],
            ["  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  "],
            ["  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  "],
            ["  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  "],
            ["  ","  ","  ","  ","  ","  ","$1","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","!1","  ","  ","  ","!1","  ","  ","  ","W3","W2","!1","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","!1","!1","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","W3","W2","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  "],
            ["  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","W3","W1","W1","W1","W1","W1","W2","  ","  ","  ","  ","  ","  ","W1","  ","W1","  ","W1","  ","  ","W3","W4","W4","W1","W1","W1","W1","W1","W1","W1","W1","W1","W1","W1","W1","W1","W1","W1","W1","W1","W1","W1","W1","W1","W1","W1","W1","W1","W4","W4","  ","  ","  ","  ","  ","  ","  ","W3","W1","W2","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  "],
            ["  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","W4","W4","W4","W4","W4","W4","W4","W1","W2","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W2","  ","  ","  ","  ","  ","W3","W4","W4","W4","  ","  ","  ","  ","  ","W1","W1","W1","  ","  ","  ","  ","  ","  ","  ","  ","  ","W1","W1","W1","  ","  ","  ","  "],
            ["  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","W4","W4","W4","W4","W4","W4","W4","W4","W4","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","  ","!1","  ","  ","  ","W4","W4","W4","W4","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  "],
            ["W2","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","W4","W4","W4","W4","W4","W4","W4","W4","W4","W2","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","  ","  ","  ","  ","  ","  ","  ","  ","W1","W1","W1","  ","  ","  ","W1","W1","W1","  ","  ","  ","  ","  ","  ","  "],
            ["W4","W1","W1","W1","W1","W1","W1","W1","W1","W1","W1","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W2","  ","  ","  ","  ","  ","  ","  ","  ","  ","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  "],
            ["W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W2","  ","  ","  ","  ","  ","  ","  ","  ","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  "],
            ["W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W1","W1","W1","W1","W1","W1","W1","W1","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  ","  "],
            ["W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","  ","  ","  ","  ","  ","  ","!1","  ","  ","  ","  ","  ","!2","  ","  ","  ","  ","  ","  ","!1","  ","  ","  ","W2"],
            ["W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W4","W1","W1","W1","W1","W1","W1","W1","W1","W1","W1","W1","W1","W1","W1","W1","W1","W1","W1","W1","W1","W1","W1","W1","W4"],
        ],
        bgm: 'bgm1',
		nextLevel: 'level2'
	}
}

export let assetMap = {
	"W1": {
		name: "grass1",
        type: "platform",
		file: grass1,
	},
    "W2": {
		name: "grass2",
        type: "platform",
		file: grass2,
	},
    "W3": {
		name: "grass3",
        type: "platform",
		file: grass3,
	},
    "W4": {
		name: "grass4",
        type: "platform",
		file: grass4,
    },
    "!1": {
        name: "$mole",
        type: "enemy",
        generator: (scene, x, y) => {
            return new Mole(scene, x, y);
        }
    },
    "!2": {
        name: "$mole-boss",
        type: "boss",
        generator: (scene, x, y) => {
            return new Mole(scene, x, y);
        }
    },
    "$1": {
        name: "$text1",
        type: "text",
        text: "Use left stick or d-pad to move, R1 to jump."
    },
    "$2": {
        name: "$text2",
        type: "text",
        text: "Use the right stick to shoot in any direction, R2 to butt stomp."
    },
    "$3": {
        name: "$text3",
        type: "text",
        text: "Press L2 to dash.  Dashing makes you invulnerable."
    }
}

export class Level extends Phaser.GameObjects.GameObject {
    constructor(scene, levelName) {
		super(scene, levelName);
		this.levelConfig = levels[levelName];
		this.blocks = this.scene.physics.add.staticGroup();
        this.enemies = this.scene.physics.add.group();
        this.height = this.levelConfig.tilemap.length;
        this.width = 0;

        this.bgm = this.scene.sound.add(this.levelConfig.bgm);
        this.bgm.setLoop(true);

        this.bgm.play('');

		for (let y = 0; y < this.levelConfig.tilemap.length; y++) {
            if (this.levelConfig.tilemap[y].length > this.width) {
                this.width = this.levelConfig.tilemap[y].length;
            }

			for (let x = 0; x < this.levelConfig.tilemap[y].length; x++) {
				let asset = assetMap[this.levelConfig.tilemap[y][x]];

                if (!asset) {
                    continue;
                }

                if (asset.type === "enemy" || asset.type === "boss") {
                    let enemy = asset.generator(scene, x * 64, y * 64);
                    enemy.setOrigin(0, 1);
                    this.enemies.add(enemy);
                    continue;
                } else if (asset.type === "text") {
                    let text = this.scene.add.text(x * 64, y * 64, asset.text, {stroke: "black", strokeThickness: 3, fontSize: 25});
                    text.setOrigin(0.5, 0.5);
                    continue;
                }

                let block = scene.physics.add.staticSprite(x * 64, y * 64, asset.name);
                block.scale *= 2;
                block.setOrigin(0, 0)
                    .setPushable(false)
                    .setImmovable(true)
                    .setGravity(0)
                    .refreshBody();
                this.blocks.add(block);
			}
		}
	}
}