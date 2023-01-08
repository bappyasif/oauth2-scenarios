require("dotenv").config();
require("./passport");
const express = require("express");
// const cookieSession = require("cookie-session");
const expressSession = require("express-session");
const passport = require("passport");
const cors = require("cors");
const app = express();
const authRoute = require("./routes/auth");

app.use(expressSession({
    name: "authSession",
    secret: process.env.SESSION_SECRET_KEYS,
    maxAge: 100 * 60 * 60 * 24,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

app.use(passport.initialize())
app.use(passport.session())

app.use(cors({
    origin: ["http://localhost:3001", "http://localhost:3000"],
    methods: "GET,PUT,POST,DELETE",
    credentials: true
}));

app.use("/auth", authRoute)

app.listen(4000, () => console.log("server is running on port 4000"))