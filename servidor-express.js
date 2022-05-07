const express = require('express');
const fs = require('fs');

const app = express();

app.get('/',(req,res,next) => {
    res.send('<h1 style="color:blue">Bienvenidos al servidor express</h1>');
})

// Creo la clase Contenedor

class Contenedor {
    constructor(archivo) {
        this.archivo = archivo;
    }

    async getById(id) {
        let contenido = await fs.promises.readFile(this.archivo,'utf-8')
        let productos = JSON.parse(contenido);
        let producto = productos.find(producto => producto.id === id);
        if (producto) {
            console.log(producto);
        } else {
            console.log('No existe el producto');
        }
        return producto;
    }

    async getAll() {
        let contenido = await fs.promises.readFile(this.archivo,'utf-8')
        let productos = JSON.parse(contenido);
        console.log(productos);
        return productos;
    }

}

const contenedor1 = new Contenedor('productos.txt');

app.get('/productos',async (req,res,next) => {
    let productsData = await contenedor1.getAll();
    res.send(productsData)
})

app.get('/productoRandom',async (req,res,next) => {
    let prodId = Math.floor(Math.random() * 3);
    let producto = await contenedor1.getById(prodId);
    res.send(producto);
})

app.listen(8080,() => {
    console.log('Servidor levantado');
})

