import config from '../config.js'
import 'dotenv/config'
import { MongoClient } from 'mongodb'
// const collectionCarrito = config.mongodb.collectionCarrito;


import DaoProdArchivo from './productos/ProductosDaoArchivo.js'
import DaoProdMongo from './productos/ProductosDaoMongoDB.js'
// import DaoProdFirebase from './productos/ProductosDaoFirebase.js'

import DaoCartArchivo from './carritos/CarritoDaoArchivo.js';
import DaoCartMongo from './carritos/CarritoDaoMongoDB.js'
// import DaoCartFirebase from './carritos/CarritosDaoFirebase.js'

const motor = process.env.DATA_BASE;
let contenedorProdImportado;
let contenedorCarritoImportado;
let conectionMongo;
if (motor === 'archivo') {
    contenedorProdImportado = new DaoProdArchivo(config.archivo.pathProductos)
    contenedorCarritoImportado = new DaoCartArchivo(config.archivo.pathCarrito)
    console.log('Conectado con archivo');
}
else if (motor === 'mongo') {
    const mongo = new MongoClient(config.mongodb.mongo);
    await mongo.connect();
    conectionMongo = mongo;
    contenedorProdImportado = new DaoProdMongo(config.mongodb.collectionProducts)
    contenedorCarritoImportado = new DaoCartMongo(config.mongodb.collectionCarrito)
    console.log('Conectado con mongo');

}
else if (motor === 'firebase') {
    // contenedorProdImportado = new DaoProdFirebase(config.firebase)
    // contenedorCarritoImportado = new DaoCartFirebase(config.firebase)
    console.log('Conectado con firebase');

}

const ContenedorProductos = contenedorProdImportado;
const ContenedorCarrito = contenedorCarritoImportado;
export { ContenedorProductos,ContenedorCarrito,conectionMongo };