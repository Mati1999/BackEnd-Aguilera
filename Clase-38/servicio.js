const { obtenerOperaciones,guardarOperacion } = require('./persistencia.js')

const sumar = (a,b) => {
    const resultado = a + b
    guardarOperacion({ operacion: 'suma',argumentos: [a,b],resultado })
    return resultado
}
const restar = (a,b) => {
    const resultado = a - b
    guardarOperacion({ operacion: 'resta',argumentos: [a,b],resultado })
    return resultado
}
const mmultiplicar = (a,b) => {
    const resultado = a * b
    guardarOperacion({ operacion: 'multiplicacion',argumentos: [a,b],resultado })
    return resultado
}
const dividir = (a,b) => {
    const resultado = a / b
    guardarOperacion({ operacion: 'division',argumentos: [a,b],resultado })
    return resultado
}

const listarOperaciones = () => {
    return obtenerOperaciones()
}

module.exports = { sumar,restar,mmultiplicar,dividir,listarOperaciones }