const express = require('express')
const app = express()
const cp = require('cookie-parser')
const { signedCookies } = require('cookie-parser')

//Secret = Matias
app.use(cp('Matias'))

app.get('/setearCookies',(req,res) => {
    const { nombre,valor } = req.query;
    //Uso el signed para que me tome el secret
    res.cookie(nombre,valor,{ signed: true }).send('Cookie seteada')
})

app.get('/verCookies',(req,res) => {
    //req.cookies para ver las cookies sin el secret y signed
    // res.send(req.cookies)
    //req.signedCookies para usar las cookies con el secret
    res.send(req.signedCookies)
})

app.listen(8080,() => {
    console.log('Escuchando');
})