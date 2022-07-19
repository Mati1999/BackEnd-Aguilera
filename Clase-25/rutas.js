const bienvenida = (req,res,next) => {
    res.send('Bienvenido')
}

const registracion = (req,res,next) => {
    res.send('Registrado correctamente')
}

module.exports = {
    bienvenida,
    registracion
}