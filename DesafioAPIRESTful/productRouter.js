const express = require('express');
const app = express();
const routerProducts = express.Router();
const fs = require('fs');
const multer = require('multer');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Clase contenedor para manejar los productos
class Contenedor {
    constructor(archivo) {
        this.archivo = archivo;
    }

    static id = 0;

    async save(producto) {
        try {
            let json = '';
            let contenido = await fs.promises.readFile(this.archivo,'utf-8');
            Contenedor.id = contenido === '' ? Contenedor.id : JSON.parse(contenido).length;
            if (contenido === '') {
                console.log('No hay datos');
                if (producto.title == '' || producto.price == '' || producto.thumbnail == '') {
                    console.log('No se puede guardar el producto');
                } else {
                    producto.id = Contenedor.id;
                    json = JSON.stringify([producto]);
                    await fs.promises.writeFile(this.archivo,json,(err) => {
                        if (err) {
                            console.log('Hubo un error al cargar el producto');
                        } else {
                            console.log(producto.id);
                        }
                    })
                    Contenedor.id++;
                }
            } else {
                let productos = JSON.parse(contenido);
                for (let i = 0; i < productos.length; i++) {
                    if (productos[i].title === producto.title || productos[i].thumbnail === producto.thumbnail) {
                        console.log('El producto ya existe');
                    } else if (producto.title == '' || producto.price == '' || producto.thumbnail == '') {
                        console.log('No se pudo cargar el producto, hay campos vacíos');
                    } else {
                        producto.id = Contenedor.id;
                        json = JSON.stringify([...productos,producto]);
                        await fs.promises.writeFile(this.archivo,json,(err) => {
                            if (err) {
                                console.log('Hubo un error al cargar el producto');
                            } else {
                                console.log(producto.id);
                            }
                        })
                    }
                }
                Contenedor.id++;
            }

        } catch (error) {
            console.log(error);
        }
        return producto;
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

    async deleteById(id) {
        let contenido = await fs.promises.readFile(this.archivo,'utf-8')
        let productos = JSON.parse(contenido);
        let arraySinElProducto = productos.filter(prod => prod.id !== id);
        fs.writeFile(this.archivo,JSON.stringify(arraySinElProducto),(err) => {
            if (err) {
                console.log('Hubo un error al eliminar el producto');
            } else {
                console.log('Producto eliminado');
            }
        })
    }

    async updateById(id,producto) {
        let contenido = await fs.promises.readFile(this.archivo,'utf-8')
        let productos = JSON.parse(contenido);
        let productoActualizado = productos.map(prod => {
            if (prod.id === id) {
                console.log(producto.thumbnail);
                prod.title = producto.title === '' || producto.title === undefined ? prod.title : producto.title;
                prod.price = producto.price === '' || producto.price === undefined ? prod.price : producto.price;
                prod.thumbnail = producto.thumbnail === '' || producto.thumbnail === undefined ? prod.thumbnail : producto.thumbnail;
            }
            return prod;
        })
        fs.writeFile(this.archivo,JSON.stringify(productoActualizado),(err) => {
            if (err) {
                console.log('Hubo un error al actualizar el producto');
            } else {
                console.log('Producto actualizado');
            }
        })
    }
}
let cont1 = new Contenedor('DesafioAPIRESTful/productos.txt');


// Obtener todos los productos
routerProducts.get('/api/productos',async (req,res) => {
    let allProducts = await cont1.getAll();
    res.send(allProducts);
})

// Obtener 1 producto
routerProducts.get('/api/productos/:id',async (req,res) => {
    console.log(req.params.id);
    let prodSelected = await cont1.getById(parseInt(req.params.id));

    if (prodSelected) {
        res.send(prodSelected);
    } else {
        res.status(404).send({ error: 'Producto no encontrado' })
    }
})



//Creo un producto
const storage = multer({ destination: 'DesafioAPIRESTful/productos.txt' })


const uploadProduct = storage.fields([{ title: 'title',price: 'price',thumbnail: 'thumbnail' }]);

routerProducts.post('/api/productos',uploadProduct,async (req,res,next) => {
    let prod = await cont1.save(req.body);
    if (prod.title === '' || prod.price === '' || prod.thumbnail === '') {
        res.status(400).send({ error: 'El producto no se pudo cargar, hay campos vacios' });
    } else {
        res.send(req.body);
    }
    next();
})


//Actualizo un producto
routerProducts.put('/api/productos/:id',(req,res) => {
    cont1.updateById(parseInt(req.params.id),req.body);
    res.send(req.body);
})

//Elimino un producto
routerProducts.delete('/api/productos/:id',async (req,res) => {
    let prodDeleted = await cont1.deleteById(parseInt(req.params.id));
    res.send(prodDeleted);
})

module.exports = routerProducts;