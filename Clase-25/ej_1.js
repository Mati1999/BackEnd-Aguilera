const express = require('express')
const app = express()
const session = require('express-session')
const cp = require('cookie-parser')
const passport = require('./passport')
const rutas = require('./rutas')

app.use(express.json())
app.use(cp())
app.use(session({
    secret: 'Matias',
    resave: true,
    saveUninitialized: false
}))

const requiereAutenticacion = (req,res,next) => {
    if (req.session.nombreUsuario) return next()
    res.status(401).send('Usted no está autenticado')
}

const rechazaAutenticado = (req,res,next) => {
    if (req.session.nombreUsuario) return res.status(409).send('ya estas autenticado')
    next()
}

app.post('/login',passport.authenticate('autenticado'),rutas.bienvenida)

app.post('/registro',passport.authenticate('registracion'),rutas.registracion)

app.use((error,req,res,next) => {
    res.status(500).send(error.message)
})

app.listen(8080,() => console.log('Servidor iniciado en el puerto 8080'))