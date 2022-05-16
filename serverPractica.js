const express = require('express');

const app = express();

app.get('/ping',(req,res,next) => {
    res.send('pong');
})

app.listen(8080,() => {
    console.log('Server ON');
})