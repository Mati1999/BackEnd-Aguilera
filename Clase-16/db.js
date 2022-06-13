const Knex = require('knex').default

const options = {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'coderdb'
}

const knex = Knex({
    client: 'mysql',
    connection: options
})

const ejecutar = async () => {
    await knex.schema.dropTableIfExists('alumnos')
    await knex.schema.createTable('alumnos',(table) => {
        table.increments('id');
        table.string('nombre',30);
        table.integer('edad');
    })
    await knex('alumnos').insert({ nombre: 'Juan',edad: 20 })
    await knex.from('alumnos').select('*').then((filas) => { console.log(filas) })
    await knex.destroy()
}

ejecutar()