export default class carritoCompras extends Phaser.Scene {
    constructor() {
        super({ key: 'carritoCompras' });
    }

    preload() {
        // Cargar la imagen de fondo y los botones
        this.load.image('fondotienda', '../assets/FONDO.png');
        this.load.image('nuevoElemento', '../assets/nuevoElemento.png');
        this.load.image('exitButton', '../assets/exitButton.png');
        this.load.image('RedBull', '../assets/RedBull.png');
        this.load.image('Alitas', '../assets/ALAS.png');
    }

    create() {
        // Agregar el fondo y ajustarlo al tamaño de la pantalla
        this.add.image(0, 0, 'fondotienda')
            .setDisplaySize(this.sys.game.config.width, this.sys.game.config.height)
            .setOrigin(0, 0);

        // Definir los ítems
        this.items = [
            { name: 'Alitas', descripcion: 'volar', price: 10, ubicacion: { x: 200, y: 200 }, key: 'Alitas' },
            { name: 'RedBull', descripcion: 'correr', price: 20, ubicacion: { x: 400, y: 200 }, key: 'RedBull' }
        ];

        // Crear y organizar los ítems
        this.createItems();

        // Agregar el nuevo elemento centrado en la parte superior
        this.add.image(this.sys.game.config.width / 2, 50, 'nuevoElemento').setOrigin(0.5, 0);

        // Botón de Salir ubicado en la parte inferior izquierda
        const exitButton = this.add.image(50, this.sys.game.config.height - 50, 'exitButton').setInteractive();
        exitButton.setOrigin(0.5, 0.5);
        exitButton.on('pointerdown', () => {
            console.log('Exit button clicked');
            // Volver al menú principal
            this.scene.start('MenuScene');
        });

        // Crear un contenedor para la información del ítem
        this.infoContainer = this.add.container().setDepth(1); // Asegúrate de que esté por encima de otros elementos

        // Texto para mostrar información del ítem
        this.infoText = this.add.text(0, 0, '', { fontSize: '16px', fill: '#fff' }).setOrigin(0.5, 0.5);
        this.infoContainer.add(this.infoText);
        this.infoContainer.setVisible(false); // Inicialmente oculto
    }

    update() {
        // Puedes agregar lógica de actualización aquí si es necesario
    }

    createItems() {
        this.items.forEach(item => {
            const img = this.add.image(item.ubicacion.x, item.ubicacion.y, item.key)
                .setScale(0.2)
                .setInteractive()
                .setOrigin(0.5, 0.5);

            // Mostrar información adicional cuando se hace clic en el ítem
            img.on('pointerover', () => {
                this.showItemInfo(item);
            });

            img.on('pointerout', () => {
                this.hideItemInfo();
            });

            img.on('pointerdown', () => {
                console.log(`Item clicked: ${item.name}, Price: ${item.price}`);
                // Aquí puedes realizar acciones adicionales, como agregar al carrito
                // this.interactWithBackend(item);
            });
        });
    }

    showItemInfo(item) {
        this.infoText.setText(`Name: ${item.name}\nDescription: ${item.descripcion}\nPrice: ${item.price}`);
        this.infoContainer.setPosition(item.ubicacion.x, item.ubicacion.y - 50); // Muestra arriba del ítem
        this.infoContainer.setVisible(true);
    }

    hideItemInfo() {
        this.infoContainer.setVisible(false);
    }

    // Método opcional para interactuar con el backend
    interactWithBackend(item) {
        fetch('http://example.com/api/interaction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: item.name,
                description: item.descripcion,
                price: item.price
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
}
