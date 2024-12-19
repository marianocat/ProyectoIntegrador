document.addEventListener('DOMContentLoaded', async () => {
    // Contenedor donde se insertarán las Cards
    const gridContainer = document.querySelector('.Grilla-Cards');

    try {
        // Cargar datos del archivo JSON
        const response = await fetch('../data/productos.json');
        const productos = await response.json();

        // Generar tarjetas dinámicamente
        productos.forEach(producto => {
            const card = document.createElement('article');
            card.classList.add('Card');

            card.innerHTML = `
                <h2>${producto.Nombre}</h2>
                <figure>
                    <img class="imgplato" src="${producto.Img}" alt="${producto.ImgAlt}">
                    <div class="controls">
                        <button class="decrement">-</button>
                        <span class="counter">0</span>
                        <button class="increment">+</button>
                    </div>
                </figure>
                <p>${producto.Desc}</p>
            `;

            gridContainer.appendChild(card);

            // Agregar funcionalidad de incremento y decremento
            const incrementButton = card.querySelector('.increment');
            const decrementButton = card.querySelector('.decrement');
            const counter = card.querySelector('.counter');
            let count = 0;

            incrementButton.addEventListener('click', () => {
                count++;
                counter.textContent = count;
                decrementButton.style.display = count > 0 ? 'inline-block' : 'none';
            });

            decrementButton.addEventListener('click', () => {
                if (count > 0) {
                    count--;
                    counter.textContent = count;
                    decrementButton.style.display = count > 0 ? 'inline-block' : 'none';
                }
            });

            decrementButton.style.display = count > 0 ? 'inline-block' : 'none';
        });

    } catch (error) {
        console.error('Error cargando los datos:', error);
    }
});
