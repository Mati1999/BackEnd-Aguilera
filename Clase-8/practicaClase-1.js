const express = require('express');
const routerMascotas = express.Router();
const routerPersonas = express.Router();
const app = express();


const listaMascotas = [];
const listaPersonas = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Get mascotoas
routerMascotas.get('/',(req,res) => {
    res.send({ mascotas: listaMascotas });
})

// Post mascotoas
routerMascotas.post('/:nombre/:raza/:edad',(req,res) => {
    const nuevaMascota = {
        nombre: req.params.nombre,
        raza: req.params.raza,
        edad: req.params.edad
    };
    listaMascotas.push(nuevaMascota);
    res.send({ mascotas: listaMascotas });
})


// Get personas
routerPersonas.get('/',(req,res) => {
    res.send({ personas: listaPersonas });
})
// Post personas
routerPersonas.post('/:nombre/:apellido/:edad',(req,res) => {
    const nuevaPersona = {
        nombre: req.params.nombre,
        apellido: req.params.apellido,
        edad: req.params.edad
    };
    listaPersonas.push(nuevaPersona);
    res.send({ personas: listaPersonas });
})

app.use('/mascotas',routerMascotas);
app.use('/personas',routerPersonas);

app.listen(8080,() => {
    console.log('Servidor corriendo en el puerto 8080');
})