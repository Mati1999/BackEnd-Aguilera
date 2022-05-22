const express = require('express');
const app = express();

app.set('views','./Clase-10/pug_views');
app.set('view engine','pug');

app.get('/hello',(req,res) => {
    res.render('bienvenida',{ mensaje: 'Hola mundo' });
})

app.listen(8080,() => {
    console.log('Servidor iniciado en el puerto 8080');
})