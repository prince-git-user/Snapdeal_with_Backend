const passport = require("passport")
require("dotenv").config()

const User = require("../models/user.model")

const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
 
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:2161/auth/google/callback",
    passReqToCallback   : true
  },
  async function(request, accessToken, refreshToken, profile, done) {

    let user = await User.findOne({email:profile.email}).lean().exec()

    if(!user){
        user = await User.create({
            name:profile?.displayName,
            email:profile?.email,
        })
    }

    return done(null, user);
  }
));

module.exports = passport;