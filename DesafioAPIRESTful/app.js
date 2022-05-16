const express = require('express');
const app = express();
const productRouter = require('./productRouter');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Uso las rutas de productos
app.use('/',productRouter);

app.get('/',(req,res) => {
    res.sendFile(__dirname + '/index.html')
})

app.listen(8080,() => {
    console.log('Escuchando APIRESTFULL en el puerto 8080');
})