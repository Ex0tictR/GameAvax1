// mainScene.js
import {config} from '../src/index.js'
import gameOverScene from './gameOverScene.js';
export default class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
    }

    preload() {
        // Cargar imágenes y hojas de sprites
        this.load.image('background', '../assets/FONDO.png');
        this.load.spritesheet('Ratero', '../assets/Ratero.png', { frameWidth: 21.7, frameHeight: 27 });
        this.load.spritesheet('Policia', '../assets/Policia.png', { frameWidth: 20.7, frameHeight: 27 });
        this.load.image('neroCoin', '../assets/ñeroCoin.png');
        this.load.image('Cai', '../assets/cai.png');
        this.load.image('Camino', '../assets/Bloque_suelo.png');
        this.load.image('Colpatria', '../assets/TorreColpatria.png');
        this.load.image('Ecci', '../assets/ECCI.png');
    }
    create() {
        // Añadir imágenes a la escena
        this.add.image(0, 0, 'background').setOrigin(0, 0).setDisplaySize(config.width, config.height);
        this.cai = this.add.image(515, 400, 'Cai').setOrigin(0, 0).setScale(1);
        this.neroCoin = this.add.image(955, 389, 'neroCoin').setOrigin(0, 0).setScale(2);
        this.colpatria = this.add.image(55, 189, 'Colpatria').setOrigin(0, 0).setScale(0.7);
        this.uEcci = this.add.image(250, 269, 'Ecci').setOrigin(0, 0).setScale(0.5);

        // Crear sprites con físicas
        this.ratero = this.physics.add.sprite(60, 399, 'Ratero').setOrigin(0, 0).setScale(1.7)
        this.Policia = this.physics.add.sprite(10, 399, 'Policia').setOrigin(0, 0).setScale(1.7)

        // Animaciones para el 'Ratero'
        this.anims.create({
            key: 'ratero-walk',
            frames: this.anims.generateFrameNumbers('Ratero', { start: 0, end: 4 }),
            repeat: -1
        });

        this.anims.create({
            key: 'ratero-midle',
            frames: [{ key: 'Ratero', frame: 0 }]
        });

        this.anims.create({
            key: 'ratero-jump',
            frames: [{ key: 'Ratero', frame: 4 }]
        });

        // Animaciones para el 'Policia'
        this.anims.create({
            key: 'Policia-walk',
            frames: this.anims.generateFrameNumbers('Policia', { start: 0, end: 4 }),
            repeat: -1
        });

        this.anims.create({
            key: 'Policia-midle',
            frames: [{ key: 'Policia', frame: 0 }]
        });

        this.anims.create({
            key: 'Policia-jump',
            frames: [{ key: 'Policia', frame: 4 }]
        });

        // Crear grupo estático para el suelo
        this.floor = this.physics.add.staticGroup();
        this.floor.create(0, config.height - 16, 'Camino');
        this.floor.create(300, config.height - 16, 'Camino');
        this.floor.create(600, config.height - 16, 'Camino');
        this.floor.create(900, config.height - 16, 'Camino');

        // Colisiones
        this.physics.add.collider(this.ratero, this.floor);
        this.physics.add.collider(this.Policia, this.floor);
        this.physics.add.collider(this.Policia, this.ratero, this.handleCollision, null, this);
        this.physics.add.overlap(this.ratero, this.neroCoin, this.handleNeroCoinCollision, null, this);

        // Teclas de entrada
        this.keys = this.input.keyboard.createCursorKeys();
        this.keysPolicia = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });

        this.physics.add.overlap(this.Policia, this.ratero, this.handleCollision, null, this);

        this.add.text(20, 20, 'Main Scene', { fontSize: '25px', fill: '#fff' });
        this.input.once('pointerdown', () => {
            this.scene.start('MenuScene'); // Cambia a MenuScene cuando se haga clic
        });
    }

    update() {
        // Mover el sprite 'ratero' con las teclas de dirección
        if (this.keys.left.isDown) {
            this.ratero.anims.play('ratero-walk', true);
            this.ratero.x -= 3;
            this.ratero.flipX = true;
        } else if (this.keys.right.isDown) {
            this.ratero.x += 3;
            this.ratero.anims.play('ratero-walk', true);
            this.ratero.flipX = false;
        } else {
            this.ratero.anims.play('ratero-midle', true);
        }

        if (this.keys.up.isDown) {
            this.ratero.y -= 15;
            this.ratero.anims.play('ratero-jump', true);
        }

        // Mover el sprite 'Policia' con las teclas de dirección
        if (this.keysPolicia.left.isDown) {
            this.Policia.anims.play('Policia-walk', true);
            this.Policia.x -= 3;
            this.Policia.flipX = true;
        } else if (this.keysPolicia.right.isDown) {
            this.Policia.x += 3;
            this.Policia.anims.play('Policia-walk', true);
            this.Policia.flipX = false;
        } else {
            this.Policia.anims.play('Policia-midle', true);
        }

        if (this.keysPolicia.up.isDown) {
            this.Policia.y -= 15;
            this.Policia.anims.play('Policia-jump', true);
        }
    }

    handleCollision(player, enemy) {
        console.log('Collision detected!');
        this.scene.start('GameOverScene'); // Cambia a GameOverScene cuando se detecta la colisión
    }

    handleNeroCoinCollision(ratero, neroCoin) {
        console.log('¡Ganó el ratero!');
        // Hacer que el `neroCoin` desaparezca o realizar otra acción
        neroCoin.setVisible(false);
    }
}
