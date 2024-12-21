// carrito.js

function renderizarCarrito () {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotalElement = document.getElementById("cart-total");
    
    cartItemsContainer.innerHTML = ``;

    // Obtener carrito desde localStorage
    const cart = JSON.parse(localStorage.getItem("carrito")) || {};
    
    // Cargar datos de productos desde productos.json
    fetch("../data/productos.json")
        .then(response => response.json())
        .then(productos => {
            let total = 0;
    
            // Iterar sobre el carrito para generar las filas de la tabla
            Object.keys(cart).forEach(productId => {
                const producto = productos.find(p => p.Id === parseInt(productId));
                if (producto) {
                    const cantidad = cart[productId];
                    const subtotal = cantidad * producto.Amount;
                    total += subtotal;
    
                    // Crear fila para el producto
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${producto.Nombre}</td>
                        <td>${cantidad}</td>
                        <td>$${producto.Amount.toFixed(2)}</td>
                        <td>$${subtotal.toFixed(2)}
                        <button class="btnDecorado">Quitar</button></td>
                    `;
                    const btnDecorado = row.querySelector('.btnDecorado');
                    btnDecorado.addEventListener('click', ()=>{
                        delete cart[producto.Id];
                        localStorage.setItem('carrito', JSON.stringify(cart));
                        renderizarCarrito()
                    });
    
                    cartItemsContainer.appendChild(row);
                }
            });
    
            // Mostrar total
            cartTotalElement.textContent = `$${total.toFixed(2)}`;
        })
        .catch(error => console.error("Error al cargar productos:", error));
}


document.addEventListener("DOMContentLoaded", () => {
    renderizarCarrito()
});
