const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

// const callbackRoute = "http://localhost:3000"
const callbackRoute = "http://localhost:4000"

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

// passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: `${callbackRoute}/auth/google/callback`
//   },
//   function(req, accessToken, refreshToken, profile, done) {
//     console.log(accessToken, refreshToken, profile, "here")

//     // req.user = profile
    
//     done(null, profile)
//     // User.findOrCreate({ googleId: profile.id }, function (err, user) {
//     //   return cb(err, user);
//     // });
//   }
// ));

// these serialize or deserialize functions are used when Sessions are in use
passport.serializeUser((user, done) => done(null, user))

passport.deserializeUser((user, done) => done(null, user))