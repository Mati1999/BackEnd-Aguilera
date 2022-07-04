import empleados from './empresa.js'
import util from 'util'
import norm from 'normalizr'

const esquemaPosicion = new norm.schema.Entity('posiciones')
const esquemaGerente = new norm.schema.Entity('gerentes')
const esquemaEmpleado = new norm.schema.Entity('empleados',{
    posicion: esquemaPosicion,
    gerente: esquemaGerente,
})

const normalizado = norm.normalize(empleados,[esquemaEmpleado]);


function print(objeto) {
    console.log(util.inspect(objeto,false,12,true))
}
// print(normalizado)

const desnormalizado = norm.denormalize(normalizado.result,[esquemaEmpleado],normalizado.entities)
print(desnormalizado)