import { config } from '../src/index.js';

// gameOverScene.js

export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    preload() {
        // Cargar la imagen de fondo
        this.load.image('GAMEOVER', '../assets/ui/GAMEOVER.png');
        // Cargar las imágenes de los botones
        this.load.image('TryAgain', '../assets/ui/TryAgain.png');
        this.load.image('exitButton', '../assets/ui/exitButton.png');
    }

    create() {
        // Agregar el fondo y ajustarlo al tamaño de la pantalla
        this.add.image(0, 0, 'GAMEOVER')
            .setDisplaySize(this.sys.game.config.width, this.sys.game.config.height)
            .setOrigin(0, 0);

        // Botón de Volver a intentar
        const tryAgainButton = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2 + 60, 'TryAgain').setInteractive();
        tryAgainButton.on('pointerdown', () => {
            console.log('Try Again button clicked');
            // Reiniciar la escena o el juego
            this.scene.start('MainScene'); // Regresar a MainScene para intentar de nuevo
        });

        // Botón de Salir
        const exitButton = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2 + 130, 'exitButton').setInteractive();
        exitButton.on('pointerdown', () => {
            console.log('Exit button clicked');
            // Volver al menú principal o cerrar el juego
            this.scene.start('MenuScene'); // Volver a MenuScene o realizar cualquier otra acción
        });
    }

    update() {
        // Puedes agregar lógica de actualización aquí si es necesario
    }
}







