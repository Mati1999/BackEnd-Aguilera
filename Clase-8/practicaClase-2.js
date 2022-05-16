const express = require('express');
const app = express();



app.use('/archivos',(req,res,next) => {
    console.log('Estuve aquí');
    next();
},express.static('Clase-8/misArchivos'));

app.get('/archivos/alumno.txt',(req,res) => {
    res.send('Nice');
})


app.listen(8080,() => {
    console.log('Servidor corriendo en el puerto 8080');
})