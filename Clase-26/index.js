// VciMZfCuzYGjEkRcrgDQNMGOG

// qBjXOKxvTvfpqLsIO4iawMJXkRKIKWaRsDpoLOAFqth5iW8ySp

// AAAAAAAAAAAAAAAAAAAAAI6dewEAAAAA3%2FhzUuhwuXJ%2F2NoAEwJNa%2FVHmyQ%3DHC9nwfytQSbK2FSdMq09pLXSvhi75khnuiF7y8R982FHzLI3dH

require('dotenv').config();
const express = require('express');
const app = express()
const passport = require('./passport');
const session = require('express-session')

app.use(session({
    secret: 'Matias',
    resave: true,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.get('/auth/twitter',passport.authenticate('twitter'))
app.get('/auth/twitter/callback',passport.authenticate('twitter'))

app.listen(3000,() => {
    console.log('Server running on port 3000');
})