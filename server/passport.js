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
passport.serializeUser((user, done) => {
  console.log(user, "serialize")
  done(null, user)
  // here we can grab user id or some unique key that will help us locate user identity from our records or db
  // and then we wil use that information to create a cookie that will be sent to browser 
  // e.g. done(null, user.id)
})

passport.deserializeUser((cookieStr /*|| id*/, done) => {
  console.log(cookieStr, "de-serialize")
  done(null, cookieStr)
  // if it returns a unique id which we might have stored in a db potentially
  // we can use that id to look it up in our database to locate and grab that user info from db  
  /**
   * User.find({_id: id}).then((foundUser) => done(null, foundUser))
   */
})