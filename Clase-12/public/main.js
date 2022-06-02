const socket = io();

const enviarMensaje = (e) => {
    const autor = document.getElementById('autor').value;
    const text = document.getElementById('text').value;
    const mensaje = { autor,text };
    socket.emit('new_message',mensaje);
    // Si no hacemos return false el formulario va a querer hacer un post a '/' y no queremos que lo haga
    return false;
}

const crearEtiquetasMensaje = (mensaje) => {
    const { autor,text } = mensaje;
    return `
    <div>
        <strong>${autor}</strong>
        <em>${text}</em>
    </div>
    `;
}

const agregarMensajes = (mensajes) => {
    const mensajesFinal = mensajes.map(mensaje => crearEtiquetasMensaje(mensaje)).join(' ');
    document.getElementById('messages').innerHTML = mensajesFinal;
}

socket.on('messages',(messages) => agregarMensajes(messages));