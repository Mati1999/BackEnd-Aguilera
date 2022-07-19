const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;

const { TWITTER_CLIENT_ID,TWITTER_CLIENT_SECRET } = process.env;

passport.use(new TwitterStrategy({
    callbackURL: 'http://localhost:3000/auth/twitter/callback',
    consumerKey: TWITTER_CLIENT_ID,
    consumerSecret: TWITTER_CLIENT_SECRET
},(accessToken,refreshToken,profile,done) => {
    console.log(profile);
    callback(null,profile);
}))

module.exports = passport;