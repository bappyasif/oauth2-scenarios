const express = require("express");
const passport = require("passport");

const router = express();

const CLIENT_URL = "http://localhost:3000"

const isAuth = (req, res, next) => {
    if (req.session.isAuth) {
        next()
    } else {
        console.log("user is not authenticated")
        res.redirect(`${CLIENT_URL}/login`)
    }
}

router.get("/login/success", (req, res) => {
    // console.log(req.user, "req.user!!", req?.session?.passport?.user, req.isAuthenticated())
    // console.log(req.session, "req.user!!", req?.session?.passport?.user, req.isAuthenticated())
    console.log(req.session.id, "req.user!!", req?.session?.passport?.user.id, req.isAuthenticated())
    if (req.user) {
        // we can intentioanlly change session data if we need to
        req.session.isAuth = true

        console.log(req.session.id, 'sessionid') // this will match with browser stored session sub string value
        
        res.status(200).json({
            msg: "login successfull!!",
            user: req.user,
            cookies: req.cookies,
            // jwt: req.jwt
        })
    } else {
        res.status(401).json({ msg: "authentication failed!!" })
    }
})

router.get("/login/failed", (req, res) => {
    res.status(401).json({
        success: false,
        message: "failure",
    });
});

router.get("/logout", isAuth, (req, res) => {
    console.log(req.session.passport?.user?.id, req.session.id)
    req.session.destroy(err => {
        if (err) return res.status(401).json({ msg: "logout failed!!" })
        return res.redirect(CLIENT_URL);
    });
});

// router.get("/logout", isAuth, (req, res) => {
//     console.log(req.session.passport?.user?.id, req.session.id)
//     if (req.isAuthenticated()) {
//         req.logout(err => {
//             if (err) return res.status(401).json({ msg: "logout failed!!" })
//             return res.redirect(CLIENT_URL);
//         });
//     }
//     // res.redirect(CLIENT_URL);
//     // res.status(401).json({ msg: "logout failed!!" })
// });

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
    "/google/callback",
    passport.authenticate("google", {
        successRedirect: CLIENT_URL,
        failureRedirect: "/login/failed",
    })
);

module.exports = router;