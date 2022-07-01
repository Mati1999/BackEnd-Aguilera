//ACÁ CREO UN CONTENEDOR QUE VA A TENER MÉTODOS CON NOMBRES DISTINTOS, PERO QUE APLIQUEN LOS MÉTODOS DEL ContenedorArchivo.
//ESTE DAO VA A SER LLAMADO DESDE EL ROUTER PARA EJECUTARSE LUEGO EN EL SERVIDOR.
const express = require('express');
const app = express();
const fs = require('fs');
const Contenedor = require('../../contenedores/ContenedorArchivo');

const contenedorArchivo = new Contenedor('../../productos.txt');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// PRODUCT ROUTER
class ProductosDaoArchivo {
    constructor(archivo) {
        this.archivo = archivo;
    }

    static id = 0;
    static timestamp = Date.now();
    static codigo = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    async save(producto) {
        try {
            let json = '';
            let contenido = await contenedorArchivo.getAll()
            if (contenido === '') {
                console.log('No hay datos');
                if (producto.nombre == '' || producto.precio == '' || producto.foto == '' || producto.foto == undefined || producto.stock == '' || producto.descipcion == '') {
                    console.log('No se puede guardar el producto');
                } else {
                    producto.id = Contenedor.id;
                    producto.timestamp = Contenedor.timestamp;
                    producto.codigo = Contenedor.codigo;
                    json = JSON.stringify([producto]);
                    await contenedorArchivo.save(json);
                    Contenedor.id++;
                    Contenedor.timestamp = Date.now();
                    Contenedor.codigo = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
                }
            } else {
                let contenido = JSON.parse(contenido);
                contenido.forEach(prod => {
                    if (Contenedor.id <= prod.id) {
                        Contenedor.id++;
                    }
                    if (Contenedor.id == prod.id) {
                        Contenedor.id++;
                    }
                });
                for (let i = 0; i < contenido.length; i++) {
                    if (contenido[i].nombre === producto.nombre || contenido[i].foto === producto.foto) {
                        console.log('El producto ya existe');
                    } else if (producto.nombre == '' || producto.precio == '' || producto.foto == '' || producto.foto == undefined || producto.stock == '' || producto.descipcion == '') {
                        console.log('No se pudo cargar el producto, hay campos vacíos');
                    } else {
                        producto.id = Contenedor.id;
                        producto.timestamp = Contenedor.timestamp;
                        producto.codigo = Contenedor.codigo;
                        json = JSON.stringify([...contenido,producto]);
                        //ACÁ EJECUTO EL SAVE DEL CONTENDOR
                        await contenedorArchivo.save(json);
                    }
                }
                Contenedor.id++;
                Contenedor.timestamp = Date.now();
                Contenedor.codigo = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
            }

        } catch (error) {
            console.log(error);
        }
        return producto;
    }


    async getById(id) {
        let producto = await contenedorArchivo.getById(id);
        return producto;
    }

    async getAll() {
        let productos = await contenedorArchivo.getAll()
        return productos;
    }

    async deleteById(id) {
        let contenido = await contenedorArchivo.getAll()
        let arraySinElProducto = contenido.filter(prod => prod.id !== id);
        let prod = await contenedorArchivo.deleteById(arraySinElProducto)
        console.log(prod);
    }

    async updateById(id,producto) {
        let contenido = await contenedorArchivo.getAll()
        let productoActualizado = contenido.map(prod => {
            if (prod.id === id) {
                prod.nombre = producto.nombre === '' || producto.nombre === undefined ? prod.nombre : producto.nombre;
                prod.precio = producto.precio === '' || producto.precio === undefined ? prod.precio : producto.precio;
                prod.foto = producto.foto === '' || producto.foto === undefined ? prod.foto : producto.foto;
                prod.stock = producto.stock === '' || producto.stock === undefined ? prod.stock : producto.stock;
                prod.descripcion = producto.descripcion === '' || producto.descripcion === undefined ? prod.descripcion : producto.descripcion;
            }
            return prod;
        })
        await contenedorArchivo.updateById(productoActualizado)
    }
}
module.exports = ProductosDaoArchivo;