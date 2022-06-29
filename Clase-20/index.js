const { MongoClient } = require('mongodb');

const ejecutar = async () => {
    const mongo = new MongoClient("mongodb+srv://matias:351426351@cluster0.6lyvpyc.mongodb.net/?retryWrites=true&w=majority")
    await mongo.connect();
    await mongo.db("ecommerce").collection("usuarios").insert({ nombre: "otro",apellido: 'usuario',dni: 41727947 })
    console.log("Insertado");
    // const resultados = await mongo.db("ecommerce").collection("usuarios").find().toArray();
    // console.log(resultados);
}

ejecutar()