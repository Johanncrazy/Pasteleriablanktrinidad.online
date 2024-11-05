navHamb.addEventListener("click", e => {
  navMenu.classList.toggle("displayMenu")
})
let carrito = [];
let total = 0;
let carritoAbierto = false;

function agregarAlCarrito(producto, precio) {
    carrito.push({ producto, precio });
    total += precio;
    actualizarCarrito();
}

function actualizarCarrito() {
    const listaCarrito = document.getElementById('listaCarrito');
    listaCarrito.innerHTML = '';
    carrito.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.producto}  ${item.precio}`;
        // Crear botón de eliminar
        const eliminarBtn = document.createElement('button');
        eliminarBtn.textContent = 'Eliminar';
        eliminarBtn.classList.add('eliminar-btn');
        eliminarBtn.onclick = () => eliminarDelCarrito(index);
        li.appendChild(eliminarBtn);
        listaCarrito.appendChild(li);
    });
    document.getElementById('total').textContent = `Total: Bs ${total}`;
    document.getElementById('totalProductos').textContent = carrito.length;
}

function eliminarDelCarrito(index) {
    total -= carrito[index].precio; // Restar el precio del producto eliminado
    carrito.splice(index, 1); // Eliminar producto del array
    actualizarCarrito(); // Actualizar el carrito visualmente
}

function toggleCarrito() {
    const carritoDiv = document.getElementById('carrito');
    carritoAbierto = !carritoAbierto;
    if (carritoAbierto) {
        carritoDiv.classList.add('abierto');
    } else {
        carritoDiv.classList.remove('abierto');
    }
}

function irAPaginaQR() {
    if (carrito.length > 0) {
        // Guardar los datos del carrito en localStorage para que se puedan usar en la página QR
        localStorage.setItem('total', total);
        // Redirigir a la página QR
        window.location.href = 'qr.html';
    } else {
        alert('El carrito está vacío. Por favor, añade productos antes de comprar.');
    }
}

function enviarWhatsApp() {
    const total = localStorage.getItem('total'); // Obtener el total desde el localStorage
    const numeroWhatsApp = '72831844'; // Reemplaza con el número de WhatsApp del destinatario
    const mensaje = `Hola, adjunto mi comprobante de pago por un total de $${total}. Gracias.`; // Mensaje predeterminado
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}