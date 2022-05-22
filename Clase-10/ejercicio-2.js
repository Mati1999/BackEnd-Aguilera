const express = require('express');
const app = express();

app.set('views','./Clase-10/ejs_views');
app.set('view engine','ejs');

app.get('/datos',(req,res) => {
    const { min,nivel,max,titulo } = req.query;
    res.render('views/datos',{ min,nivel,max,titulo });
})

app.listen(8080,() => {
    console.log('Servidor iniciado en el puerto 8080');
})