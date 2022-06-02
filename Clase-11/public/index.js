const socket = io();


socket.on('mensajes',(mensaje) => {
    document.getElementById('mensajes').textContent = mensaje + '\n';
})

document.getElementById('botonEnviar').addEventListener('click',(e) => {
    const mensaje = document.getElementById('entrada').value;
    socket.emit('mensaje',mensaje);
})

document.getElementById('entrada').addEventListener('keypress',(e) => {

    if (e.key === 'Enter') {
        socket.emit('mensaje',e.target.value);
        e.target.value = '';
    }
})
