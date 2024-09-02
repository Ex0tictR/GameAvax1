import { config } from '../src/index.js';
import carritoCompra from '../scenes/carritoCompras.js'

export default class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    preload() {
        // Cargar la imagen de fondo y los botones
        this.load.image('background', '../assets/ui/background.png');
        this.load.image('playButton', '../assets/ui/playButton.png');
        this.load.image('galleryButton', '../assets/ui/galleryButton.png');
        this.load.image('settingsButton', '../assets/ui/settingsButton.png');
        this.load.image('exitButton', '../assets/ui/exitButton.png');
        this.load.image('shopButton', '../assets/ui/shopButton.png');
    }

    create() {
        // Agregar el fondo y ajustarlo al tamaño de la pantalla
        this.add.image(0, 0, 'background')
            .setDisplaySize(this.sys.game.config.width, this.sys.game.config.height)
            .setOrigin(0, 0);

        // Botón de Play
        const playButton = this.add.image(this.sys.game.config.width / 2, 250, 'playButton').setInteractive();
        playButton.on('pointerdown', () => {
            console.log('Play button clicked');
            // Iniciar el juego o cambiar de escena
            this.scene.start('MainScene'); // Cambia a la escena principal del juego
        });

        // Botón de Galería
        const galleryButton = this.add.image(this.sys.game.config.width / 2, 320, 'galleryButton').setInteractive();
        galleryButton.on('pointerdown', () => {
            console.log('Gallery button clicked');
            // Abrir la galería del juego
            this.scene.start('GalleryScene'); // Cambia a la escena de la galería
        });

        // Botón de Ajustes
        const settingsButton = this.add.image(this.sys.game.config.width / 2, 390, 'settingsButton').setInteractive();
        settingsButton.on('pointerdown', () => {
            console.log('Settings button clicked');
            // Abrir el menú de ajustes
            this.scene.start('SettingsScene'); // Cambia a la escena de ajustes
        });

        // Botón de Salir
        const exitButton = this.add.image(this.sys.game.config.width / 2, 460, 'exitButton').setInteractive();
        exitButton.on('pointerdown', () => {
            console.log('Exit button clicked');
            // Volver al menú principal o cerrar el juego
            this.scene.start('MainScene'); // Cambia a la escena del menú principal
        });

        // Botón de Tienda, ubicado en la parte superior derecha
        const shopButton = this.add.image(this.sys.game.config.width - 50, 50, 'shopButton').setInteractive();
        shopButton.on('pointerdown', () => {
            console.log('Shop button clicked');
            // Abrir la tienda del juego
            this.scene.start('carritoCompras'); // Cambia a la escena de la tienda
        });

        // Texto indicando la escena actual
        this.add.text(20, 20, 'Menu Scene', { fontSize: '25px', fill: '#fff' });

        // Cambiar a MainScene al hacer clic en cualquier parte de la pantalla
        this.input.once('pointerdown', () => {
            this.scene.start('carritoCompra'); // Cambia a MainScene cuando se haga clic
        });
    }

    update() {
        // Puedes agregar lógica de actualización aquí si es necesario
    }
}