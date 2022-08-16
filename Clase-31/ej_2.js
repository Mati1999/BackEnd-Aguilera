const express = require('express');
const app = express();
const logger = require('./logger');

logger.debug('La aplicación inició correctamente')

app.get('/sumar',(req,res) => {
    let { numUno,numDos } = req.query;
    numUno = parseInt(numUno);
    numDos = parseInt(numDos);
    if (isNaN(numUno) || isNaN(numDos)) {
        logger.error('Numero uno o numero dos no es un numero')
        res.status(500).send();
        return;
    }
    const suma = numUno + numDos;
    logger.info('La suma es: ' + suma)
    res.send(String(suma))
})

app.use((req,res,next) => {
    logger.warn('Recurso invalido')
    res.sendStatus(404)
})

app.listen(3000,(error) => {
    if (error) {
        logger.error('Hubo un error iniciando la aplicación')
        process.exit;;
    }
    console.log('Escuchando!');
})