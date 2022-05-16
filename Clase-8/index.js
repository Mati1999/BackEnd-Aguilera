const express = require('express');
const userRouter = express.Router();

userRouter.get('/:userId',(req,res) => {
    res.send({ userId: req.params.userId });
})

const app = express();

app.use('/usuarios',userRouter);
app.use('mascotas',userRouter);

app.listen(8080,() => {
    console.log('Servidor corriendo en el puerto 8080');
})