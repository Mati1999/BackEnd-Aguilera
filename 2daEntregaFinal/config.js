export default {
    archivo: {
        pathCarrito: './carrito.txt',
        pathProductos: './productos.txt',
    },
    mongodb: {
        mongo: "mongodb+srv://matias:351426351@cluster0.6lyvpyc.mongodb.net/?retryWrites=true&w=majority",
        db: "ecommerce",
        collectionProducts: "productos",
        collectionCarrito: "carrito",
    },
    firebase: {
        url: "https://coderback-fbb85.firebaseio.com",
        collectionProducts: "productos",
        collectionCarrito: "carrito",
    }
}