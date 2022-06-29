var admin = require("firebase-admin");

var serviceAccount = require("./coderback.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://coderback-fbb85.firebaseio.com"
});


const probar = async () => {
    const db = admin.firestore();
    console.log(db);
    const query = db.collection("colores");

    // const red = query.doc('red')
    // await red.create({ nombre: 'red' })

    // const green = query.doc('green')
    // await green.create({ nombre: 'green' })
    // const blue = query.doc('blue')
    // await blue.create({ nombre: 'blue' })


    // const resultados = (await query.get()).docs;
    // resultados.map(doc => console.log(doc.data()));

    // const doc = query.doc('blue')
    // doc.update({ nombre: 'navy' })
    // console.log('modificado');

    const doc = query.doc('green')
    await doc.delete()

}

probar()