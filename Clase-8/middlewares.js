const express = require('express');
const app = express();

//Creo los middlewares
const primerMiddelware = (req,res,next) => {
    console.log('Primer middelware');
    next();
}

const segundoMiddleware = (req,res,next) => {
    console.log('Segundo middelware');
    next();
}


app.use((req,res,next) => {
    console.log('Paso por el middleware de nivel de aplicación');
    next();
});

//Creo 3 rutas para pasar y ejecute los middlewares dentro de ellas
app.use('/ruta1',primerMiddelware,(req,res,next) => {
    res.send('ruta1')
})
app.use('/ruta2',primerMiddelware,segundoMiddleware,(req,res,next) => {
    res.send('ruta2')
})
app.get('/ruta3',(req,res,next) => {
    next(new Error('Hubo un error. Este es mi error'));
})

//Creo un error handler para manejar los errores
app.use((err,req,res,next) => {
    console.log(err);
    res.send('Se produjo un error');
})


app.listen(8080,() => {
    console.log('Servidor corriendo en el puerto 8080');
})