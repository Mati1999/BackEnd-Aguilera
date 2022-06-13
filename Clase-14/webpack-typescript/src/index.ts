import express from 'express';
import {Persona} from './persona';

const persona = new Persona ('Matias' , 'Aguilera');

const app =express();


app.get('/', (req, res) => {
    res.send({
        persona: persona.obtenerNombreCompleto()
    });
})

app.listen(8080, () => {
    console.log('Servidor corriendo en el puerto 8080');
})