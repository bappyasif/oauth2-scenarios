require("dotenv").config();
require("./passport");
const expressSession = require("express-session");
const express = require("express");
const cors = require("cors");
// const passportSetup = require("./passport");
const passport = require("passport");
const authRoute = require("./routes/auth");
const app = express();

// resaving cookie as im not currently using mongodb, otherwise i would have kept it as false
// app.use(
//     cookieSession({ name: "session", secret: process.env.SESSION_SECRET_KEYS, maxAge: 24 * 60 * 60 * 100, resave: true })
// );
app.use(expressSession({
    name: "session",
    secret: process.env.SESSION_SECRET_KEYS,
    maxAge: 100 * 60 * 60 * 24,
    resave: true,
    // these two options were causing session and authentication to be false
    // saveUninitialized: false,
    // cookie: { secure: true }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
})
);

app.use("/auth", authRoute);

app.listen("4000", () => {
    console.log("Server is running!");
});


// const express = require("express");
// // const cookieSession = require("cookie-session");
// const expressSession = require("express-session");
// const passport = require("passport");
// const cors = require("cors");
// const app = express();
// const authRoute = require("./routes/auth");

// app.use(expressSession({
//     name: "session",
//     secret: process.env.SESSION_SECRET_KEYS,
//     maxAge: 100 * 60 * 60 * 24,
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: true }
// }));

// app.use(express.urlencoded({extended: true}));
// app.use(passport.initialize())
// app.use(passport.session())

// app.use(cors({
//     origin: ["http://localhost:3001", "http://localhost:3000"],
//     methods: "GET,PUT,POST,DELETE",
//     credentials: true
// }));

// app.use("/auth", authRoute)

// app.listen(4000, () => console.log("server is running on port 4000"))