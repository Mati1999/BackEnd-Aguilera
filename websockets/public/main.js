const socket = io();

const enviarMensaje = (e) => {
    const autor = document.getElementById('autor').value;
    const text = document.getElementById('text').value;
    const fyh = String(new Date().toDateString() + ' ' + new Date().toLocaleTimeString())
    const mensaje = { autor,text,fyh };
    socket.emit('new_message',mensaje);
    // Si no hacemos return false el formulario va a querer hacer un post a '/' y no queremos que lo haga
    return false;
}

const crearEtiquetasMensaje = (mensaje) => {
    const { autor,text,fyh } = mensaje;
    return `
    <div>
        <strong style='color:blue'>${autor}</strong>
        <p style='color:brown'>${fyh}</p>
        <i style='color:green'>${text}</i>
    </div>
    `;
}

const agregarMensajes = (mensajes) => {
    if (mensajes !== '') {
        const mensajesFinal = mensajes.map(mensaje => crearEtiquetasMensaje(mensaje)).join(' ');
        document.getElementById('messages').innerHTML = mensajesFinal;
    }
}

socket.on('messages',(messages) => agregarMensajes(messages));

//Productos
const enviarProducto = (e) => {
    let title = document.getElementById('title').value;
    let price = document.getElementById('price').value;
    let thumbnail = document.getElementById('thumbnail').value;
    const producto = { title,price,thumbnail };
    title = '';
    price = '';
    thumbnail = '';
    socket.emit('new_products',producto);
    return false;
}

const crearEtiquetasProductos = (producto) => {
    const { title,thumbnail,price } = producto;
    return `
    <tr>
        <td>${title}</td>
        <td>$ ${price}</td>
        <td><img style="width: 50px; height:50px" src=${thumbnail} alt=""></td>
    </tr>
    `;
}

const agregarProducto = (producto) => {
    if (producto !== '') {
        const productoFinal = producto.map(producto => crearEtiquetasProductos(producto)).join('<br>');
        console.log(document.getElementById('productsContainer'));
        document.getElementById('productsContainer').innerHTML = productoFinal;
    } else {
        document.getElementById('productsContainer').innerHTML = '<h2>No hay productos</h2>';
    }
}

socket.on('products',(products) => agregarProducto(products));