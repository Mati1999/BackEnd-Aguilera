const express = require('express');
const app = express()

const puerto = process.env.PORT || Number(process.argv[2]) || 8080;
const processId = process.pid;

app.get('/',(_,res) => {
    res.send(`Sevidores express - Puerto ${puerto} - PID ${processId} - Fechha y hora ${new Date().toLocaleString()}`);
})

app.listen(puerto,() => {
    console.log(`Escuchando en ${puerto}`);
})