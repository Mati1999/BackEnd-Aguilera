const fs = require('fs');

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
            } else {
                let productos = JSON.parse(contenido);
                for (let i = 0; i < productos.length; i++) {
                    if (productos[i].title === producto.title || productos[i].thumbnail === producto.thumbnail) {
                        console.log('El producto ya existe');
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
    }

    async getAll() {
        let contenido = await fs.promises.readFile(this.archivo,'utf-8')
        let productos = JSON.parse(contenido);
        console.log(productos);
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

    async deleteAll() {
        await fs.promises.writeFile(this.archivo,'[]',(err) => {
            if (err) {
                console.log('Hubo un error al eliminar los producto');
            } else {
                console.log('Productos eliminado');
            }
        })
    }

}

let cont1 = new Contenedor('productos.txt');


// cont1.save({ title: 'Producto1',price: 100,thumbnail: 'Link super copado' });
// cont1.save({ title: 'Producto2',price: 120,thumbnail: 'Link super copado 2' });
cont1.save({ title: 'Producto3',price: 120,thumbnail: 'Link super copado 3' });

// cont1.getById(0);

// cont1.getAll();

// cont1.deleteById(2);

// cont1.deleteAll();
