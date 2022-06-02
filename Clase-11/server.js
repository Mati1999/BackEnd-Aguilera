const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const mensajes = [];

const app = express();

app.use(express.static('public'));

app.get('/',(req,res) => {
    res.sendFile(__dirname + '/public/index.html');
})

const httpServer = new HttpServer(app);
const ioServer = new IOServer(httpServer);

ioServer.on('connection',(socket) => {
    console.log('Se conectó un usuario');
    socket.on('mensaje',(mensaje) => {
        mensajes.push(`[${socket.id}]: ${mensaje}\n`)

        ioServer.sockets.emit('mensajes',mensajes.join(`\n`));
    })
})

httpServer.listen(8080,() => {
    console.log('Servidor corriendo en el puerto 8080');
})
