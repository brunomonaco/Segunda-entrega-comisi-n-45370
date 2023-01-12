// Creo una variable con un array vacío que representa el carrito de compras

const carrito = [];

// Creo la función que me permite ordenar los productos segun el precio
// en mi caso cuando yo uso un ecomerce siempre los pongo de menor a mayor

const ordenarMenorMayor = () => {
    terrarios.sort((a,b)=> a.precio - b.precio);
   
    mostrarListaOrdenada() 
};

const ordenarMayorMenor = () => {
    terrarios.sort((a,b)=> b.precio - a.precio);
   
    mostrarListaOrdenada() 
};


const mostrarListaOrdenada = () => {
    const listaOrdenada = terrarios.map(terrarios => {
        return '- '+terrarios.nombre+' $'+terrarios.precio //Devuelve la lista ordenada
    })
    //Método join
    alert('Lista de precios:'+'\n\n'+listaOrdenada.join('\n'));
    comprarProductos(listaOrdenada)
}

//Funcion para mostrar y agregar terrarios al carrito

const comprarProductos = (listaOrdenada) =>{

    //Variables
    let productoNombre = '';
    let productoCantidad = 0;
    let otroProducto = false;

    do {
        productoNombre = prompt('¿Que producto desea comprar?'+'\n\n'+listaOrdenada.join('\n')+'\n')
        productoCantidad = parseInt(prompt('¿Cuantos quiere comprar?'))

        const producto = terrarios.find(producto => producto.nombre.toLocaleLowerCase() === productoNombre.toLocaleLowerCase())
      //Validación para saber si el producto está repetido
        if(producto){
            agregarAlCarrito(producto, producto.id, productoCantidad);
        }else{
            alert('El terrario no se encuentra en el catálogo')
        }

        otroProducto = confirm('Desea agregar otro producto')
    } while (otroProducto);

    confirmarCompra()

   
    };

    const agregarAlCarrito = (producto, productoId, productoCantidad) => {
        const productoRepetido = carrito.find(producto => producto.id === productoId)
        if(!productoRepetido){
            producto.cantidad += productoCantidad
            carrito.push(producto)
        }else{
            productoRepetido.cantidad += productoCantidad
        }

    };

const eliminarProductoCarrito = (nombreProductoAEliminar) => {
    carrito.forEach((producto, index) => {
        if (producto.nombre.toLocaleLowerCase() === nombreProductoAEliminar.toLocaleLowerCase()){
            if(producto.cantidad > 1){
                producto.cantidad--
            }else{
                carrito.splice(index, 1 )
            }

        }
    })
    confirmarCompra()
};
        
const confirmarCompra = () => {
    const listaProductos = carrito.map(producto => {
        return '- '+producto.nombre+' | Cantidad: '+producto.cantidad
    })

    const isCheckout = confirm('Checkout: '
        +'\n\n'+listaProductos.join('\n')
        +'\n\nPara continuar presione "Aceptar" sino "Cancelar" para eliminar un producto del carrito'
    )

    if(isCheckout){
        finalizarCompra(listaProductos)
    }else{
        const nombreProductoAEliminar = prompt('Ingrese el nombre del producto a eliminar')
        eliminarProductoCarrito(nombreProductoAEliminar)
    }



};

const finalizarCompra = (listaProductos) =>{
    const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0)
    const precioTotal = carrito.reduce((acc, item) => acc + (item.cantidad*item.precio), 0)
    alert ('Detalle de su compra: '
            +'\n\n'+listaProductos.join('\n')
            +'\n\nTotal de productos: '+cantidadTotal
            +'\n\nEl total de su compra es: '+precioTotal
            +'\n\nGracias por su compra!'

    )
};

const comprar = () => {
    const productosBaratos = confirm('¿Querés ordenar la lista de productos del mas barato al mas caro')

        if(productosBaratos){
            ordenarMenorMayor()
        }else{
            ordenarMayorMenor()
        }

};

comprar()


//ordenarMenorMayor()
