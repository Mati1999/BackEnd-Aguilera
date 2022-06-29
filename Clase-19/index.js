const mongoose = require('mongoose');

const estudiantesAImportar = require('./users.json');

const ejecutar = async () => {
    await mongoose.connect("mongodb://localhost:27017/estudiantes");
    console.log("Conectado a MongoDB");

    const estudSchema = new mongoose.Schema({
        nombre: { type: String,required: true },
        apellido: { type: String,required: true },
        edad: { type: Number,required: true },
        dni: { type: String,required: true,unique: true },
        curso: { type: String,required: true },
        nota: { type: Number,required: true },
        ingreso: { type: Boolean,required: true }
    })

    const Estudiante = mongoose.model('estud',estudSchema);

    // let res = await Estudiante.find().sort({ nombre: 1 });
    // console.log(res);

    // let res = await Estudiante.find().sort({ edad: 1 }).limit(1);
    // console.log(res);

    // let res = await Estudiante.find({ curso: "2A" })
    // console.log(res);

    // let res = await Estudiante.find().sort({ edad: 1 }).skip(1).limit(1)
    // console.log(res);

    // let res = await Estudiante.find({},{ nombre: 1,apellido: 1,curso: 1,_id: 0 }).sort({ apellido: -1 })
    // console.log(res);

    // let res = await Estudiante.find({ nota: 10 })
    // console.log(res);

    // let res = await Estudiante.aggregate([
    //     {
    //         $match: {
    //             curso: "1A"
    //         }
    //     },
    //     {
    //         $group: {
    //             "_id": "$curso",
    //             "promedio": {
    //                 $avg: "$nota"
    //             }
    //         }
    //     }
    // ])

    // console.log(res);

    // console.log(await Estudiante.updateOne({ nombre: "Lucas",apellido: 'Blanco' },{ $set: { dni: 20355875 } }));
    // console.log(await Estudiante.updateMany({},{ $set: { ingreso: false } }));
    // console.log(await Estudiante.updateMany({ curso: '1A' },{ $set: { ingreso: true } }));
    // console.log(await Estudiante.find({ nota: { $gte: 4 } },{ _id: 0,__v: 0 }));
    // console.log(await Estudiante.find({ ingreso: true },{ _id: 0,__v: 0 }));
    // console.log(await Estudiante.deleteMany({ ingreso: true }));
    const todos = await Estudiante.find();
    todos.forEach((estud) => {
        console.log(estud,"Fecha creación: ",estud._id.getTimestamp().toLocaleString());
    })


    console.log('proceso terminado');

}

ejecutar()