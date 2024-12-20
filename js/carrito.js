function agregarEventosCard(card, producto) {
    const incrementButton = card.querySelector('.increment');
    const decrementButton = card.querySelector('.decrement');
    const counter = card.querySelector('.counter');
    let count = 0; // Inicializamos el contador local

    // Actualizar contador visual y localStorage
    const actualizarContador = () => {
        counter.textContent = count;
        decrementButton.style.display = count > 0 ? 'inline-block' : 'none';

        // Guardar el conteo en localStorage
        const carrito = JSON.parse(localStorage.getItem('carrito')) || {};
        carrito[producto.Id] = count;
        if (count === 0) {
            delete carrito[producto.Id];
        }
        localStorage.setItem('carrito', JSON.stringify(carrito));
    };

    incrementButton.addEventListener('click', () => {
        count++;
        actualizarContador();
    });

    decrementButton.addEventListener('click', () => {
        if (count > 0) {
            count--;
            actualizarContador();
        }
    });

    // Inicializar estado visual y lógica
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || {};
    if (carritoGuardado[producto.Id] !== undefined) {
        count = carritoGuardado[producto.Id]; // Recuperamos el conteo si existe
    }
    actualizarContador();
}

/*----Leo el archivo de productos y cargo las cards------**/

document.addEventListener('DOMContentLoaded', async () => {
    // Contenedor donde se insertarán las Cards
    const gridContainer = document.querySelector('.Grilla-Cards');

    try {
        // Cargar datos del archivo JSON
        const response = await fetch('../data/productos.json');
        const productos = await response.json();

        productos.forEach(producto => {
            const card = document.createElement('article');
            card.classList.add('Card');

            card.innerHTML = `
                <div class="tituloProducto">
                    <h2>${producto.Nombre}</h2>
                    <h3>${producto.Amount}</h3>
                </div>
                <figure>
                    <img class="imgplato" src="${producto.Img}" alt="${producto.ImgAlt}">
                    <div class="controls">
                        <button class="decrement">-</button>
                        <span class="counter">${producto.Amount}</span>
                        <button class="increment">+</button>
                    </div>
                </figure>
                <p>${producto.Desc}</p>
                <button type="button" class="btnDetalles" data-bs-toggle="modal" data-bs-target="#modalDetalles" data-bs-producto="${producto.Nombre}" data-bs-detalle="${producto.DescLarga}">Detalles</button>
            `;

            gridContainer.appendChild(card);

            // Agregar eventos
            agregarEventosCard(card, producto);
        });

    } catch (error) {
        console.error('Error cargando los datos:', error);
    }
});

