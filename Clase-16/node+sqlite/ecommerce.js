const Knex = require('knex').default

const knex = Knex({
    client: 'sqlite3',
    connection: { filename: './DB/db.sqlite' }
})

const ejecutar = async () => {
    await knex.schema.dropTableIfExists('articulos')
    await knex.schema.createTable('articulos',(table) => {
        table.increments('id').primary().notNullable();
        table.string('nombre',15,).notNullable();
        table.string('codigo',10).notNullable();
        table.float('precio');
        table.integer('stock');
    })

    await knex('articulos').insert([
        { nombre: 'Camisa',codigo: 10,precio: 10,stock: 10 },
        { nombre: 'Cartuchera',codigo: 20,precio: 20,stock: 20 },
        { nombre: 'Zapatilla',codigo: 30,precio: 30,stock: 30 },
        { nombre: 'remera',codigo: 40,precio: 40,stock: 40 },
        { nombre: 'Pantalon',codigo: 50,precio: 50,stock: 50 },
    ]
    )
    console.log(await knex.from('articulos').select('*'));
    await knex('articulos').where({ 'id': 3 }).del();
    await knex('articulos').where({ 'id': 2 }).update({ 'stock': 0 })
    console.log(await knex.from('articulos').select('*'));
    knex.destroy()
}

ejecutar();