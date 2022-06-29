const express = require('express');
const faker = require("@faker-js/faker")
const app = express();

const nombre = ["Luis","Lucia","Juan","Augusto","Ana"]
const apellidos = ["Pieres","Cacurri","Bezzola","Alberca","Mei"]
const colores = ['rojo','verde','azul','amarillo','magenta']

const armarMock = (cantidad) => {
    let numeroDel1Al5 = Math.floor(Math.random() * 4) + 1;
    let personas = [];
    for (let i = 0; i < cantidad; i++) {
        personas.push({
            nombre: faker.name.firstName(),
            apellido: faker.name.lastName(),
            color: faker.color.human()
        })
    }
    return personas
}
app.get('/test/:cant',(req,res) => {
    if (req.params.cant === 30) {
        res.send(armarMock(30))
    } else {
        res.send(armarMock(10))
    }
})

app.listen(8080,() => {
    console.log('Servidor corriendo en el puerto 8080')
})