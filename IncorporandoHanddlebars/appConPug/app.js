const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('views','./IncorporandoHanddlebars/appConPug/pug_views');
app.set('view engine','pug');


//Creo clase conteneodor
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

    async getAll() {
        let contenido = await fs.promises.readFile(this.archivo,'utf-8')
        if (contenido === '') {
            console.log('No hay datos');
            let productos = 'No hay productos';
            return productos;

        } else {
            let productos = JSON.parse(contenido);
            return productos;
        }
    }
}

let cont1 = new Contenedor('IncorporandoHanddlebars/appConPug/productos.txt');


app.get('/productos',async (req,res) => {
    productos = await cont1.getAll() === '' ? [{ title: 'No hay datos cargados' }] : await cont1.getAll();
    res.render('prodAgregados',{ productos });
});

app.get('/',async (req,res) => {
    res.render('formulario');
});

app.post('/productos',async (req,res) => {
    let prod = await cont1.save(req.body);
    if (prod.title === '' || prod.price === '' || prod.thumbnail === '') {
        res.status(400).send({ error: 'El producto no se pudo cargar, hay campos vacios' });
    } else {
        res.redirect('/');
    }
})

app.listen(8080,() => {
    console.log('Servidor corriendo en el puerto 8080');
})
