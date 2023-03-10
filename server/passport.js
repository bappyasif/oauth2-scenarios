const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require("./models/user");

// const callbackRoute = "http://localhost:3000"
const callbackRoute = "http://localhost:4000"

const findOrCreateUser = async (profile) => {
  const user = await User.findOne({ id: profile.id })
  if (user) {
    console.log("user found", user)
  } else {
    console.log("user is not found")
    const newuser = new User({
      name: profile.displayName,
      id: profile.id,
      password: "password"
    })
    newuser.save().then(() => console.log("user created")).catch(err=> console.log("save error....", err))
  }
}

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      findOrCreateUser(profile);
      done(null, profile);
    }
  )
);

// these serialize or deserialize functions are used when Sessions are in use
passport.serializeUser((user, done) => {
  console.log(user.id, "serialize")
  // whatever we will serialize thats what is going to be deserilize later on with deserlizer function
  done(null, user)
  // here we can grab user id or some unique key that will help us locate user identity from our records or db
  // and then we wil use that information to create a cookie that will be sent to browser 
  // e.g. done(null, user.id)
})

passport.deserializeUser((cookieStr /*|| id*/, done) => {
  // console.log(cookieStr, "de-serialize")
  console.log(cookieStr.id, "de-serialize")
  done(null, cookieStr)
  // if it returns a unique id which we might have stored in a db potentially
  // we can use that id to look it up in our database to locate and grab that user info from db  
  /**
   * User.find({_id: id}).then((foundUser) => done(null, foundUser))
   */
})