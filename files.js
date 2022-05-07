const fs = require('fs');

// fs.writeFile('output.txt','ESTE ES EL OUTPUT',() => {
//     console.log('Escritura finalizada');
// })

// const escrituraConPromesa = (nombreArchivo,contenido) => {
//     return new Promise((resolve,reject) => {
//         fs.writeFile(nombreArchivo,contenido,(err) => {
//             if (err) reject(err);
//             else resolve();
//         });
//     })
// }


// console.log('Inicio del programa');

// escrituraConPromesa('salida.txt','mensajito')
//     .then(() => console.log('ESCRITURA FINALIZADA'))

// console.log('Fin del programa');



// const mostrarLetras = (palabra,timer,callback) => {
//     let i = 0;
//     const intervalo = setInterval(() => {
//         if (palabra[i] == undefined) {
//             callback();
//             clearInterval(intervalo);
//         } else {
//             console.log(palabra[i]);
//             i++;
//         }
//     },timer);
// }
// const fin = () => { console.log('terminé') }

// mostrarLetras('Hola!',1000,fin);
// mostrarLetras('Hola!',250,fin);
// mostrarLetras('Hola!',500,fin);


// let date = new Date();
// let time = date.getHours();

// const escribirArchivo = () => {
//     try {
//         fs.writeFileSync('fyh.txt',(new Date().toISOString()));
//     } catch (error) {
//         throw new Error('Hubo un error en la escritura');
//     }
// }

// const leerArchivo = () => {
//     try {
//         let dataFromFyh = fs.readFileSync('fyh.txt','utf-8');
//         console.log(dataFromFyh);
//     } catch (error) {
//         throw new Error('Hubo un error en la lectura');
//     }
// }

// try {
//     escribirArchivo();
//     leerArchivo();
// } catch (error) {
//     console.log(error);
// }

fs.stat('package.json',(err,stats) => {
    const tamano = stats.size;
    fs.readFile('package.json','utf-8',(err,contenido) => {
        const info = {
            contenidoStr: contenido,
            contenidoObj: JSON.parse(contenido),
            size: tamano
        };
        fs.writeFile('info.txt',JSON.stringify(info),(err) => {
            console.log('Operación terminada');
        });
    });
});

