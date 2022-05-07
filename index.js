const http = require('http');

const server = http.createServer((req,res) => {
    let hora = new Date().getHours();

    if (hora >= 6 && hora <= 12) {
        res.end('Buenos días');
    } else if (hora >= 13 && hora <= 19) {
        res.end('Buenas tardes');
    } else if (hora >= 20 || hora <= 5) {
        res.end('Buenas noches');
    }
})

server.listen(8080,() => {
    console.log('Escuchando en el puerto 8080');
})