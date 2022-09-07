const { sumar,restar,mmultiplicar,dividir } = require("./servicio.js");

const realizarSuma = (req,res) => {
    const { numUno,numDos } = req.query;
    res.send({ resultado: sumar(Number(numUno),Number(numDos)) })

}
const realizarResta = (req,res) => {
    const { numUno,numDos } = req.query;
    res.send({ resultado: restar(Number(numUno),Number(numDos)) })

}
const realizarMultiplicacion = (req,res) => {
    const { numUno,numDos } = req.query;
    res.send({ resultado: mmultiplicar(Number(numUno),Number(numDos)) })

}
const realizarDivicion = (req,res) => {
    const { numUno,numDos } = req.query;
    res.send({ resultado: dividir(Number(numUno),Number(numDos)) })
}

const obtenerOperaciones = (req,res) => {
    const operaciones = listarOperaciones();
    res.send({ operaciones })
}

module.exports = { realizarSuma,realizarResta,realizarMultiplicacion,realizarDivicion,obtenerOperaciones }