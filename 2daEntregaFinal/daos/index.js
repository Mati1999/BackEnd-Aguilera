//AQUÍ IMPORTO ,DEPENDIENDO DE LA VARIABLE DE ENTORNO QUE SELECCIONE, LOS CONTENEDORES DAO QUE CORRESPONDAN.
//LUEGO LOS EXPORTO PARA USARLOS EN LOS ROUTERS, DONDE SOLAMENTE VOY A IMPORTAR UN CONTENEDOR PARA CARRITO Y OTRO PARA PRODUCTOS.

//EN LOS ARCHIVOS routerCarrito.js y routerProductos.js IMPORTO LOS CONTENEDORES QUE EXPORTO DESDE ACÁ Y LUEGO LOS USO EN LAS RUTAS.

const config = require('../config')

require('dotenv').config()
const motor = process.env.DATA_BASE;

let contenedorProdImportado = config.archivo.pathProductos;
// if (motor == 'firebase') contenedorProdImportado = './productos/ProductosDaoFirebase.js';
// else if (motor == 'mongo') contenedorProdImportado = './productos/ProductosDaoMongoDb.js';

// let contenedorCarritoImportador = './carritos/CarritoArchivo.js';
// if (motor == 'firebase') contenedorCarritoImportador = './carritos/CarritoFirebase.js';
// else if (motor == 'mongo') contenedorCarritoImportador = './carritos/CarritoMongoDb.js';

// const ejecutar = async () => {
//     const contenedor = await import(contenedorProdImportado);
//     const carrito = await import(contenedorCarritoImportador);
//     let contenedorcito = new contenedor.Contenedor('../productos.txt')
//     let cart = new carrito.Carrito('../carrito.txt');
// }
// ejecutar()


export const ContenedorProductos = contenedorProdImportado;
// export const ContenedorCarrito = contenedorCarritoImportador;