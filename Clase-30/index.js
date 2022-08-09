const express = require('express');
const app = express();

const puerto = process.env.PORT || Number(process.argv[2]) || 8080;

if (!puerto) throw new Error('Puerto no definido');

app.get('/datos',(req,res) => {
    res.send(`NGINX corriendo en el puerto ${puerto} por PID ${process.pid}`);
});

app.listen(puerto,() => {
    console.log(`Servidor corriendo en el puerto ${puerto}`);
})