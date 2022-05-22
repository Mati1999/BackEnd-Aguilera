const express = require('express');
const multer = require('multer');


const diskStorage = multer.diskStorage({
    destination: './Clase-10/uploads',
    filename: (req,file,callback) => {
        const nombreDelFile = file.originalname;
        callback(null,nombreDelFile);
    }
})

const uploaderMiddleware = multer({ storage: diskStorage });
const app = express();

app.use(express.urlencoded({ extended: true }));
app.post('/subida',uploaderMiddleware.single('archivo'),(req,res) => {
    res.send('Archivo subido');
})

app.listen(8080,() => {
    console.log('Servidor iniciado');
})