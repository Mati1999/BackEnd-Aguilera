const express = require('express');
const app = express();
const { Server: HttpServer } = require('http');
const { Server: SocketServer } = require('socket.io');


const messages = [];

app.use(express.static('public'));

const httpServer = new HttpServer(app);
const socketServer = new SocketServer(httpServer);

socketServer.on('connection',(socket) => {
    socket.emit('messages',messages)

    socket.on('new_message',(mensaje) => {
        messages.push(mensaje);
        socketServer.sockets.emit('messages',messages);
    });
})

httpServer.listen(8080,() => {
    console.log('Servidor corriendo en puerto 8080');
})