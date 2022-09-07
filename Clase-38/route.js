const { realizarSuma,realizarResta,realizarMultiplicacion,realizarDivicion } = require('./controller.js')
const { listarOperaciones } = require('./servicio.js')

const router = require('express').Router()

router.get('/sumar',realizarSuma)
router.get('/restar',realizarResta)
router.get('/multiplicar',realizarMultiplicacion)
router.get('/dividir',realizarDivicion)
router.get('/listar',listarOperaciones)

module.exports = router;