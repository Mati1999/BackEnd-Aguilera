const express = require('express');
const app = express();

const autos = [
    {
        id: 1,
        marca: 'Toyota',
        color: 'Rojo',
    },
    {
        id: 2,
        marca: 'Ford',
        color: 'Azul',
    }
]

app.get('/autos',(req,res) => {
    const marca = req.query.marca;
    if (marca) res.json(autos.filter(auto => auto.marca == marca));
    else res.json(autos)
})

app.get('/autos/:autoId',(req,res) => {
    const idAuto = req.params.autoId;
    const autoEncontrado = autos.find(auto => auto.id == idAuto);
    if (!autoEncontrado) res.status(404).send('El auto no existe')
    else res.json(autoEncontrado)
})

app.listen(8080,() => console.log('Servidor en el puerto 8080'));

