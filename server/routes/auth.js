const express = require("express");
const passport = require("passport");

const router = express();

router.get("/google", passport.authenticate("google", {scope: ["profile", "email"]}))
router.get("/google/callback", passport.authenticate("google", {
    // successMessage: "successfull login",
    // successRedirect: `${process.env.CLIENT_URL}/login/success`,
    // successRedirect: `http://localhost:4000/login/success`,
    successRedirect: `http://localhost:3000/`,
    // successRedirect: `http://localhost:4000/auth/login/success`,
    // successRedirect: `/auth/login/success`,
    // failureMessage: "Login failed",
    failureRedirect: `http://localhost:4000/auth/login/failed`,
    // failureRedirect: `${process.env.CLIENT_URL}/login/failed`,
}));

router.get("/login/failed", (req, res) => res.status(401).json({msg: "login failed"}))

router.get("/login/success", (req, res) => {
    console.log(req.user, "req.user!!", req?.session?.passport?.user, req.isAuthenticated())
    if(req.user) {
        res.status(200).json({
            msg: "login successfull!!", 
            user: req.user, 
            cookies: req.cookies,
            // jwt: req.jwt
        })
    } 
    // else {
    //     res.status(401).json({msg: "authentication failed!!"})
    // }
})

router.get("/logout", (req, res) => {
    req.logOut();
    req.cookies = null
    res.status(200).json({msg: "logout successfull"})
    // res.redirect(process.env.CLIENT_URL)
})

module.exports = router;