const express = require('express');
const app = express();
const fs = require('fs');

app.engine('coder',(pathArchovo,opciones,callback) => {

    const contenidoArchivo = String(fs.readFileSync(pathArchovo,'utf-8'));
    const { titulo,nombre } = opciones;
    const renderizado = contenidoArchivo.replace('?titulo?',titulo).replace('?nombre?',nombre);
    callback(null,renderizado);
})

app.set('views','./Clase-9/views');
app.set('view engine','coder');

app.get('/',(req,res) => {
    res.render('index',{ titulo: 'Plantillas',nombre: 'Matias Aguilera' });
})

app.listen(8080,() => {
    console.log('Servidor corriendo en el puerto 8080');
})