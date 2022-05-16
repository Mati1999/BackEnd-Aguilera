const express = require('express');
const app = express();
const multer = require('multer');



const storage = multer.diskStorage({
    destination: 'Clase-8/uploads',
    filename: (req,file,cb) => {
        const filename = file.filename + '-' + Date.now();
        cb(null,filename);
    }
})

const uploader = multer({ storage: storage });

app.post('/subida',uploader.single('archivo'),(req,res) => {
    res.send('Gracias por subir un archivo')
})

app.get('/subir',(req,res) => {
    res.sendFile(__dirname + '/index.html')
})

app.listen(8080,() => {
    console.log('Servidor corriendo en el puerto 8080');
});