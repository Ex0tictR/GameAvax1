//index.js
import MainScene from '../scenes/mainScene.js';
import MenuScene from '../scenes/menuScene.js';
import GameOverScene from '../scenes/gameOverScene.js';
import carritoCompras from '../scenes/carritoCompras.js'


export const config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 500,
    backgroundColor: '049cd8',
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 2000 },
            debug: false
        }
    },
    scene: [MainScene,MenuScene,GameOverScene,carritoCompras] // Array of scenes
};

// Crear el nuevo juego con la configuración proporcionada
const game = new Phaser.Game(config);

