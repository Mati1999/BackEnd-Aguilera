const express = require('express');
const app = express();

const generarAleatorios = () => {
    const numeros = [];
    for (let i = 0; i < 10000; i++) {
        numeros.push(Math.floor(Math.random() * 10));
    }
    return numeros;
}

app.get('/no-bloqueante',(req,res) => {
    const numeros = generarAleatorios();
    res.send({ aleatorios: numeros });
})

app.get('/bloqueante',(req,res) => {
    const numeros = generarAleatorios();
    console.log(numeros);
    res.send({ aleatorios: numeros });
})

app.listen(3000,() => {
    console.log('servidor en el puerto 3000');
})