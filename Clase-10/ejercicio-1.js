const express = require('express');
const app = express();

app.set('views','./Clase-10/pug_views');
app.set('view engine','pug');

app.get('/datos',(req,res) => {
    const { min,nivel,max,titulo } = req.query;
    res.render('datos',{ min,nivel,max,titulo });
})

app.listen(8080,() => {
    console.log('Servidor iniciado en el puerto 8080');
})