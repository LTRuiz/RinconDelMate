const productosAgregadosCarrito = localStorage.getItem("productos-agregados-carrito");
productosAgregadosCarrito = JSON.parse(productosAgregadosCarrito);

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-pdtos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");

if (productosAgregadosCarrito) {
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.remove("disabled");
    contenedorCarritoAcciones.classList.remove("disabled");
    contenedorCarritoComprado.classList.add("disabled");

    contProductos.innerHTML = "";

    productosAgregadosCarrito.forEach(producto => {
        
        const div = document.createElement("div");
        div.classList.add("carrito-pdto");
        div.innerHTML = `
            <img class="carrito-pdto-img" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="carrito-pdto-titulo">
                <small>Título</small>
                <h3>${producto.titulo}</h3>
            </div>
            <div class="carrito-pdto-cantidad">
                <small>Cantidad</small>
                <p>${producto.cantidad}</p>
            </div>
            <div class="carrito-pdto-precio">
                <small>Precio</small>
                <p>${producto.precio}</p>
            </div>
            <div class="carrito-pdto-subtotal">
                <small>Subtotal</small>
                <p>${producto.precio * producto.cantidad}</p>
            </div>
            <button class="carrito-pdto-eliminar" id="${producto.id}"><i class="bi bi-trash"></i></button>
        `;
        contProductos.append(div);
    
    })
    


} else {
    
}