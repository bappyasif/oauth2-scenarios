const express = require("express");
const passport = require("passport");
// const jwt = require("jsonwebtoken");
const { generateJwtAccessToken, verifyJwtAccessToken, generateJwtRefreshToken, verifyRefreshTokenAndProvideAnAccessToken } = require("../jwt");

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

    console.log(req.session.id, "req.user!!", req?.session?.passport?.user.id, req.isAuthenticated(), req.cookies)

    if (req.user) {
        // we can intentioanlly change session data if we need to and later on check on it when
        req.session.isAuth = true

        // console.log(req.session.id, 'sessionid') // this will match with browser stored session sub string value

        const token = generateJwtAccessToken(req.user);

        // const token = jwt.sign(req.user, process.env.JWT_SECRET, { expiresIn: '30s' })

        // console.log(newToken, "newToken!!")

        // saving this jwt signed cookie on browser so that we can later on use this for authentication
        res.cookie("token", token, { httpOnly: true })

        // saving refresh token in session as well
        const refreshToken = generateJwtRefreshToken(req.user);

        // keeping it in cookie
        res.cookie("refreshToken", refreshToken, { httpOnly: true });
        // keeping it in session
        req.session.refreshToken = refreshToken;

        res.status(200).json({
            msg: "login successfull!!",
            user: req.user,
            cookies: req.cookies,
            // jwt: req.jwt
        })
    } else {
        // res.redirect(`${CLIENT_URL}/login`)
        res.status(401).json({ msg: "authentication failed!!" })
    }
})

router.get("/login/failed", (req, res) => {
    res.status(401).json({
        success: false,
        message: "failure",
    });
});

function cookieJwtTokenAuth(req, res, next) {
    const token = req.cookies?.token;
    const refreshToken = req.cookies?.refreshToken;

    console.log(Boolean(token), Boolean(refreshToken))
    const user = verifyJwtAccessToken(token, refreshToken)

    if(user) {
        req.user = user;
    }

    if(!req.user) return res.status(401).json({ msg: "authentication failed" })

    next();
}

router.get("/secretPage", cookieJwtTokenAuth, (req, res) => {
    console.log("secret page!!");
    res.status(200).json({ msg: "auth successfull!!" })
})

router.get("/newToken", (req, res) => {
    const newToken = verifyRefreshTokenAndProvideAnAccessToken(req.session.refreshToken)
    res.cookie("token", newToken, { httpOnly: true })
    return res.status(200).json({ msg: "new token is authorized!!" })
})

router.get("/logout", isAuth, (req, res) => {
    console.log(req.session.passport?.user?.id, req.session.id)

    res.clearCookie("token");

    res.clearCookie("refreshToken");

    req.session.destroy(err => {
        if (err) return res.status(401).json({ msg: "logout failed!!" })
        // return res.redirect(CLIENT_URL);
        return res.redirect(`${CLIENT_URL}/login`)
    });
});

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
    "/google/callback",
    passport.authenticate("google", {
        successRedirect: CLIENT_URL,
        failureRedirect: "/login/failed",
    })
);

module.exports = router;