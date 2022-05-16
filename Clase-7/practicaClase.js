const express = require('express');
const app = express();


const frase = 'Hola mundo cómo están';

app.get('/api/frase',(req,res) => {
    res.send(frase);
});

app.get('/api/letras/:num',(req,res) => {
    const num = req.params.num;

    if (!isNaN(num)) {
        let longitud = num - 1;
        if (longitud > frase.length || longitud === -1) res.send('No existe');
        else {
            const letra = frase[num - 1];
            res.send(letra);
        }
    } else {
        res.send('No es un número');
    }
});


app.get('/api/palabras/:num',(req,res) => {
    const num = req.params.num;

    if (!isNaN(num)) {
        let position = num - 1;
        if (position < 0) res.send('No existe');
        else {
            const palabra = frase.split(' ')[position];
            res.send(palabra);
        }
    } else {
        res.send('No es un número');
    }
});



app.listen(8080,() => console.log('Servidor levantado en el puerto 8080'));