const express = require('express');
const app = express();
const fs = require('fs');


app.engine('coder',(pathArchivo,options,callback) => {
    const contenido = String(fs.readFileSync(pathArchivo,'utf8'));
    const contenidoReplace = contenido.replace('$$titulo$$',options.titulo);
    callback(null,contenidoReplace);
})

app.set('views','./Clase-10/coder_views');
app.set('view engine','coder');

app.get('/saludo',(req,res) => {
    res.render('pagina',{ titulo: 'Renderizado' });
})

app.listen(8080,() => {
    console.log('Servidor iniciado');
})