const express = require('express')
const router = require('./route.js')

const app = express()

app.use('/operaciones',router);

app.listen(8080,() => {
    console.log('Escuchando!');
})