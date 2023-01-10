const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

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
    console.log(req.session.id, "req.user!!", req?.session?.passport?.user.id, req.isAuthenticated())
    if (req.user) {
        // we can intentioanlly change session data if we need to and later on check on it when
        req.session.isAuth = true

        // console.log(req.session.id, 'sessionid') // this will match with browser stored session sub string value

        const token = jwt.sign(req.user, process.env.JWT_SECRET, {expiresIn: '2s'})

        // saving this jwt signed cookie on browser so that we can later on use this for authentication
        res.cookie("token", token, {httpOnly: true})
        
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

const cookieJwtTokenAuth = (req, res, next) => {
    console.log(req.cookies, req.session.id)
    const token = req.cookies?.token;
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch (err) {
        res.clearCookie("token");
        return res.redirect("/login")
    }
}

router.get("/secretPage", cookieJwtTokenAuth, (req, res) => {
    console.log("secret page!!");
    res.redirect(`${CLIENT_URL}/login/success`)
})

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