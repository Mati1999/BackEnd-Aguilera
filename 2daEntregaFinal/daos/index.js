require('dotenv').config()
const motor = process.env.DATA_BASE;

let contenedorProdImportado = '../contenedores/ContenedorArchivo.js';
if (motor == 'firebase') contenedorProdImportado = '../contenedores/ContenedorFirebase.js';
else if (motor == 'mongo') contenedorProdImportado = '../contenedores/ContenedorMongoDb.js';

let contenedorCarritoImportador = '../contenedores/ContenedorArchivo.js';
if (motor == 'firebase') contenedorCarritoImportador = '../contenedores/ContenedorFirebase.js';
else if (motor == 'mongo') contenedorCarritoImportador = '../contenedores/ContenedorMongoDb.js';

const ejecutar = async () => {
    const contenedor = await import(contenedorProdImportado);
    const carrito = await import(contenedorCarritoImportador);
    let contenedorcito = new contenedor.Contenedor('../productos.txt')
    let cart = new carrito.Carrito('../carrito.txt');
}
ejecutar()


export const ContenedorProductos = contenedor;
export const ContenedorCarrito = carrito;