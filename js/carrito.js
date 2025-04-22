let productosAgregadosCarrito = localStorage.getItem("productos-agregados-carrito");
productosAgregadosCarrito = JSON.parse(productosAgregadosCarrito);

const contCarritoVacio = document.querySelector("#carrito-vacio");
const contCarritoPdtos = document.querySelector("#carrito-pdtos");
const contCarritoAcciones = document.querySelector("#carrito-acciones");
const contCarritoComprado = document.querySelector("#carrito-comprado");
let botonEliminar = document.querySelectorAll(".carrito-pdto-eliminar");
const botonVaciar = document.querySelector("#acciones-carrito-vaciar");
const contTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#acciones-carrito-comprar")

function cargarProductosCarrito() {
    if (productosAgregadosCarrito && productosAgregadosCarrito.length > 0) {
        contCarritoVacio.classList.add("disabled");
        contCarritoPdtos.classList.remove("disabled");
        contCarritoAcciones.classList.remove("disabled");
        contCarritoComprado.classList.add("disabled");
    
        contCarritoPdtos.innerHTML = "";
    
        productosAgregadosCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carrito-pdto");
            div.innerHTML = `
                <img class="carrito-pdto-img" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carrito-pdto-titulo">
                    <small>Titulo</small>
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
                <button class="carrito-pdto-eliminar" id="${producto.id}"><i class="bi bi-trash3"></i></button>
            `;
    
            contCarritoPdtos.append(div);
        })
    
    
    actualizarBotonEliminar();
    actualizarTotal()

    } else {
        contCarritoVacio.classList.remove("disabled");
        contCarritoPdtos.classList.add("disabled");
        contCarritoAcciones.classList.add("disabled");
        contCarritoComprado.classList.add("disabled");
    }

}

cargarProductosCarrito();

function actualizarBotonEliminar() {
    botonEliminar = document.querySelectorAll(".carrito-pdto-eliminar");

    botonEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(evento) {
    const idBoton = evento.currentTarget.id;
    const i = productosAgregadosCarrito.findIndex(producto => producto.id === idBoton);
    productosAgregadosCarrito.splice(i, 1);
    cargarProductosCarrito();

    localStorage.setItem("productos-agregados-carrito", JSON.stringify(productosAgregadosCarrito));
}

botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {

    productosAgregadosCarrito.length = 0;
    localStorage.setItem("productos-agregados-carrito", JSON.stringify(productosAgregadosCarrito));
    cargarProductosCarrito();

}

function actualizarTotal() {
    const totalCalculado = productosAgregadosCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`;
}

botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {
    const confirmarCompra = confirm("¿Desea realizar la compra?");

    if (confirmarCompra) {
        productosAgregadosCarrito.length = 0;
        localStorage.setItem("productos-agregados-carrito", JSON.stringify(productosAgregadosCarrito));
        cargarProductosCarrito();

        contCarritoVacio.classList.add("disabled");
        contCarritoPdtos.classList.add("disabled");
        contCarritoAcciones.classList.add("disabled");
        contCarritoComprado.classList.remove("disabled");
    }
}