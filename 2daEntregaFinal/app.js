const express = require('express');
const app = express();
const { productRouter,carritoRouter } = require('./contenedores/routerController');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/productos',productRouter);
app.use('/carrito',carritoRouter);

app.use((req,res,next) => {
    res.status(400).send({
        error: 'Ruta no encontrada'
    });
})

app.listen(8080,() => {
    console.log('Servidor iniciado');
})