// Productos
const productos = [
    // mates
    {
        id: "mate-01",
        titulo: "Mate Imperial Negro",
        imagen: "./img/mates/mate1.jpg",
        categoria: {
            nombre: "Mates",
            id: "mates"
        },
        precio: 1000
    },
    {
        id: "mate-02",
        titulo: "Mate Imperial Vino",
        imagen: "./img/mates/mate2.jpg",
        categoria: {
            nombre: "Mates",
            id: "mates"
        },
        precio: 1000
    },
    // Accesorios
    {
        id: "matera-01",
        titulo: "Matera cuero simple",
        imagen: "./img/mates/matera1.jpg",
        categoria: {
            nombre: "Accesorios",
            id: "accesorios"
        },
        precio: 1000
    },
    // Termos
    {
        id: "termo-01",
        titulo: "Termo media manija",
        imagen: "./img/mates/termo.jpg",
        categoria: {
            nombre: "Termos",
            id: "termos"
        },
        precio: 1000
    },

];

const contenedorProductos = document.querySelector("#contenedor-pdtos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

// funcion cargar productos html
function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-img" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;
        contenedorProductos.append(div);
    })
    actualizarBotonAgregar();
}

cargarProductos(productos); // llamar funcion cargarProductos

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (evento) => {
        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        evento.currentTarget.classList.add("active"); // currentTarget selecciona boton entero cuando hago click

        // filtro por categorias
        if (evento.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id == evento.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;

            const productosBoton = productos.filter(producto => producto.categoria.id === evento.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }
        
    })
});

// funcion para actualizar nodelist por categoria
function actualizarBotonAgregar() {
    botonAgregar = document.querySelectorAll(".producto-agregar");

    botonAgregar.forEach(boton => {
        boton.addEventListener("click", agregarCarrito); //llama funcion agregar al carrito
    })
};

// verificamos si el localStorage del carrito tenga articulos y reinicie a cero
let productosAgregadosCarrito;

let productosAgregadosCarritoLS = localStorage.getItem("productos-agregados-carrito");

if (productosAgregadosCarritoLS) {
    productosAgregadosCarrito = JSON.parse(productosAgregadosCarritoLS);
    actualizarNumerito();
} else {
    productosAgregadosCarrito = [];
}

function agregarCarrito (evento) {
    const idBoton = evento.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    // verificamos productos iguales y sumamos cantidad pdtos
    if (productosAgregadosCarrito.some(producto => producto.id === idBoton)) {
        const i = productosAgregadosCarrito.findIndex(producto => producto.id === idBoton);
        productosAgregadosCarrito[i].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosAgregadosCarrito.push(productoAgregado);
    }

    actualizarNumerito();
    localStorage.setItem("productos-agregados-carrito", JSON.stringify(productosAgregadosCarrito));
}

function actualizarNumerito() {
    let nuevoNum = productosAgregadosCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNum;
}