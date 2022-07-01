
//AQUÍ CREO LA CLASE CONTENEDOR ARCHIVO QUE TIENE MÉTODOS GENÉRICOS PARA USAR EN ProductosDaoArchivo y CarritoDaoArchivo
//LAS CARACTERÍSTICAS ÚNICAS DE CADA CONTENEDOR PRODUCTO O CARRITO, DEBO ESCRIBIRLAS EN SUS RESPECTIVOS ARCHIVOS(Ejemplo el id de productos o el de carrito, cada uno tiene su lógica para crearlos)

const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// PRODUCT ROUTER
class Contenedor {
    constructor(archivo) {
        this.archivo = archivo;
    }

    async save(json,prodAgregado) {
        try {
            await fs.promises.writeFile(this.archivo,json,(err) => {
                if (err) {
                    console.log('Hubo un error al cargar el producto');
                } else {
                    console.log(prodAgregado.id);
                }
            })
        } catch (error) {
            console.log(error);
        }
        return prodAgregado;
    }


    async getById(id) {
        let contenido = await fs.promises.readFile(this.archivo,'utf-8')
        let productos = JSON.parse(contenido);
        let producto = productos.find(producto => producto.id === id);
        if (producto) {
            console.log('Existe!');
        } else {
            console.log('No existe el producto');
        }
        return producto;
    }

    async getAll() {
        let contenido = await fs.promises.readFile(this.archivo,'utf-8')
        let productos = JSON.parse(contenido);
        return productos;
    }

    async deleteById(arraySinElProducto) {
        fs.writeFile(this.archivo,JSON.stringify(arraySinElProducto),(err) => {
            if (err) {
                console.log('Hubo un error al eliminar el producto');
            } else {
                console.log('Producto eliminado');
            }
        })
        return arraySinElProducto
    }

    async updateById(productoActualizado) {
        fs.writeFile(this.archivo,JSON.stringify(productoActualizado),(err) => {
            if (err) {
                console.log('Hubo un error al actualizar el producto');
            } else {
                console.log('Producto actualizado');
            }
        })
        return productoActualizado;
    }
}

// CARRITO ROUTER

class Carrito {
    constructor(archivo) {
        this.archivo = archivo;
    }

    static id = 0;
    static timestamp = Date.now();

    async createCarrito() {
        Carrito.timestamp = Date.now();
        let contenido = await fs.promises.readFile(this.archivo,'utf-8');
        let carritos = JSON.parse(contenido);
        carritos.forEach(prod => {
            if (Carrito.id <= prod.id) {
                Carrito.id++;
            }
            if (Carrito.id == prod.id) {
                Carrito.id++;
            }
        });
        let carrito = {
            id: Carrito.id,
            timestamp: Carrito.timestamp,
            productos: []
        }
        let json = '';
        json = JSON.stringify([...carritos,carrito]);
        await fs.promises.writeFile(this.archivo,json,(err) => {
            if (err) {
                console.log('Hubo un error al cargar el carrito');
            } else {
                console.log(carrito.id);
            }
        })
        return carrito;
    }

    async saveProductInCart(id,product) {
        let json = '';
        let contenido = await fs.promises.readFile(this.archivo,'utf-8');
        let carritos = JSON.parse(contenido);
        try {
            let carritoElegido = carritos.find(cart => cart.id === id);
            // let producto = JSON.stringify(product)
            carritoElegido.productos.push(product);
            console.log(carritos);
            json = JSON.stringify(carritos);
            await fs.promises.writeFile(this.archivo,json,(err) => {
                if (err) {
                    console.log('Hubo un error al cargar el producto');
                } else {
                    console.log(producto.id);
                }
            })



        } catch (error) {
            console.log(error);
        }
        return carritos;
    }

    async getById(id) {
        let contenido = await fs.promises.readFile(this.archivo,'utf-8')
        let carritos = JSON.parse(contenido);
        let carrito = carritos.find(cart => cart.id === id);
        if (carrito) {
            console.log(carrito);
        } else {
            console.log('No existe el carrito');
        }
        return carrito;
    }

    async getAll() {
        let contenido = await fs.promises.readFile(this.archivo,'utf-8')
        let productos = JSON.parse(contenido);
        return productos;
    }

    async deleteCart(id) {
        let contenido = await fs.promises.readFile(this.archivo,'utf-8')
        let carritos = JSON.parse(contenido);
        let arraySinElCarrito = await carritos.filter(cart => cart.id !== parseInt(id));
        fs.writeFile(this.archivo,JSON.stringify(arraySinElCarrito),(err) => {
            if (err) {
                console.log('Hubo un error al eliminar el producto');
            } else {
                console.log('Carrito eliminado');
            }
        })
    }

    async deleteProdInCart(id,prodId) {
        let contenido = await fs.promises.readFile(this.archivo,'utf-8')
        let carritos = JSON.parse(contenido);
        let carrito = await carritos.find(cart => cart.id === parseInt(id));
        let carritoSinProd = await carrito.productos.filter(prod => prod.id !== parseInt(prodId));
        carrito.productos = carritoSinProd;
        fs.writeFile(this.archivo,JSON.stringify(carritos),(err) => {
            if (err) {
                console.log('Hubo un error al eliminar el producto');
            } else {
                console.log('Carrito eliminado');
            }
        })
    }

}

module.exports = Contenedor;