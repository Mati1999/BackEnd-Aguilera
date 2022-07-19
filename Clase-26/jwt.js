require('dotenv').config();
const jwt = require('jsonwebtoken');


const token = jwt.sign({ data: 'matias' },process.env.JWT_SECRET,{ expiresIn: '24h' })
console.log(token);