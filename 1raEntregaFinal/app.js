const express = require('express');
const app = express();
const { productRouter,carritoRouter } = require('./routerController');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/productos',productRouter);
app.use('/carrito',carritoRouter);

app.listen(8080,() => {
    console.log('Servidor iniciado');
})