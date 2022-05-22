const express = require('express');
const { engine } = require("express-handlebars");
const app = express();

app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        defaultLayout: 'index.hbs',
    })
);

app.set('views','./Clase-9/hbs_views');
app.set('view engine','hbs');

app.get('/',(req,res) => {
    res.render('main',{ nombre: 'Matias',apellido: 'Aguilera',edad: '23',email: 'aguileramati@gmail.com',telefono: '11-1111-1111' });
})

app.listen(8080,() => {
    console.log('Servidor corriendo en el puerto 8080');
})