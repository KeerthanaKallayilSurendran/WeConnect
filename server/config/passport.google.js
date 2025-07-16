const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const users = require('../models/userModel');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/google/callback',
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      try {
        const username = profile.displayName;
        const email = profile.emails && profile.emails[0]?.value;
        const profilePic = profile.photos && profile.photos[0]?.value;
        const googleId = profile.id;

        // console.log({ username, email, profilePic, googleId });

        if (!email) {
          return done(new Error('No email returned from Google'), null);
        }

        
        let user = await users.findOne({ email });

        if (!user) {
          user = new users({
            username,
            email,
            googleId,
            profilePic,
          });

          await user.save();
        }

        return done(null, user);
      } catch (err) {
        console.error(err);
        return done(err, null);
      }
    }
  )
);
