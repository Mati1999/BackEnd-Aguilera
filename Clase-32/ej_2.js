const express = require('express');
const app = express();
const numCPus = require('os').cpus().length;
const cluster = require('cluster');

const modoCluster = process.argv[2] === 'CLUSTER';



const generarAleatorios = () => {
    const numeros = [];
    for (let i = 0; i < 10000; i++) {
        numeros.push(Math.floor(Math.random() * 10));
    }
    return numeros;
}

if (cluster.isMaster && modoCluster) {
    for (let i = 0; i < numCPus; i++) {
        cluster.fork();
    }
} else {

    app.get('/randoms',(req,res) => {
        const numeros = generarAleatorios();
        console.log(numeros);
        res.send({ aleatorios: numeros });
    })

    app.listen(3000,() => {
        console.log('servidor en el puerto 3000');
    })
}
