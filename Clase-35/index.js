const nodemailer = require('nodemailer');
require('dotenv').config();

const transport = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

transport.sendMail({
    from: 'Matias <aguileramati50@gmail.com>',
    to: process.env.EMAIL,
    html: '<h1>Que buen mail</h1>',
    subject: 'Mail de prueba'
}).then(result => {
    console.log(result);
}).catch(err => console.log(err))