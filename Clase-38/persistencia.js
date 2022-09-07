const operaciones = []
const guardarOperacion = (operacion) => {
    operaciones.push(operacion)
}

const obtenerOperaciones = () => operaciones

module.exports = { guardarOperacion,obtenerOperaciones }