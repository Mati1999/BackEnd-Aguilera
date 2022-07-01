//ACÁ LO QUE HAGO ES GENERAR TODAS LAS CONECCIONES A LAS BASES DE DATOS, PARA MONGO, FIREBASE Y FS.
//LAS EXPORTO Y LAS USO EN LAS RUTAS PARA USARLAS EN LOS CONTENEDORE CORRESPONDIENTES.

import fs from 'fs'


export default {
    archivo: {
        pathCarrito: './carrito.txt', //donde tengas tus archivos
        pathProductos: '../../productos.txt',
    },
    mongodb: {
        //la configuración de mongo
        cnxStr: 'mongodb+ srv:/ tuusuario: @cluster0.xdtie.mongodb.net/?retryWrites=true&w=majority',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            serverSelectionTimeoutMS: 5000,
        }
    },
    firebase: {
        serviceAccount: JSON.parse(fs.readFileSync('TuJsonDeFirebase','utf8')) // acá le pasas el json
    }
}