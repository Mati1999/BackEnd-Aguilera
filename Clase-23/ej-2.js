const express = require('express')
const session = require('express-session')
const app = express()

app.use(session({
    secret: 'Matias',
    resave: true,
    saveUninitialized: true
}))

app.get('/',(req,res) => {
    if (req.session.contador) {
        req.session.contador++;
        res.send(`Bienvenido nuevamente ${req.session.nombre || ''} esta es tu visita ${req.session.contador}`)
    } else {
        req.session.contador = 1
        req.session.nombre = req.query.nombre
        return res.send(`Bienvenido ${req.query.nombre || ''}`)
    }
})

app.get('/olvidar',(req,res) => {
    req.session.destroy((err) => {
        console.log(err);
        console.log('Hasta luego');
    })
    res.send('Sesión destruida')
})

app.listen(8080,() => {
    console.log('Escuchando');
})