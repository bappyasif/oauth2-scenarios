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

// router.get("/login/success", (req, res) => {
//     console.log(req.session.id, "req.user!!", req?.session?.passport?.user.id, req.isAuthenticated())
//     if (req.user) {
//         // we can intentioanlly change session data if we need to and later on check on it when
//         req.session.isAuth = true

//         // console.log(req.session.id, 'sessionid') // this will match with browser stored session sub string value

//         const token = jwt.sign(req.user, process.env.JWT_SECRET, { expiresIn: '30s' })

//         // saving this jwt signed cookie on browser so that we can later on use this for authentication
//         res.cookie("token", token, { httpOnly: true })

//         res.status(200).json({
//             msg: "login successfull!!",
//             user: req.user,
//             cookies: req.cookies,
//             // jwt: req.jwt
//         })
//     } else {
//         res.status(401).json({ msg: "authentication failed!!" })
//     }
// })

router.get("/login/success", (req, res) => {
    console.log(req.session.id, "req.user!!", req?.session?.passport?.user.id, req.isAuthenticated(), req.cookies)
    if (req.user) {
        // we can intentioanlly change session data if we need to and later on check on it when
        req.session.isAuth = true

        // console.log(req.session.id, 'sessionid') // this will match with browser stored session sub string value

        const token = jwt.sign(req.user, process.env.JWT_SECRET, { expiresIn: '30s' })

        // saving this jwt signed cookie on browser so that we can later on use this for authentication
        res.cookie("token", token, { httpOnly: true })

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

// const cookieJwtTokenAuth = (req, res, next) => {
//     // console.log(req.cookies, req.session.id, req?.headers?.authorization?.split(' '))
//     // console.log(req.headers.cookie, req.session.id, req.headers, req?.headers?.authorization?.split(' '))
//     const splits = req.headers.cookie.split(";")
//     const authToken = `Bearer ${splits[1].split("=")[1]}`
//     console.log(splits, authToken)
//     const token = req.cookies?.token;
//     try {
//         const user = jwt.verify((token || authToken), process.env.JWT_SECRET);
//         req.user = user;
//         next();
//     } catch (err) {
//         console.log("err in jwt auth", err)
//         // res.clearCookie("token");
//         // res.redirect(`${CLIENT_URL}/login`)
//         // next()
//     }
// }

function cookieJwtTokenAuth (req, res, next) {
    const token = req.cookies?.token;
    console.log(Boolean(token), "token", req.cookies)
    try {
        const user = jwt.verify((token), process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch (err) {
        console.log("err in jwt auth", err)
        // res.status(401).json({msg: "auth failed!!"})
        // res.clearCookie("token");
        // window.open(`${CLIENT_URL}/login`, "_self");
        // return res.redirect(CLIENT_URL);
        return res.redirect(`${CLIENT_URL}/login`)
        // next()
    }
}

router.get("/secretPage", cookieJwtTokenAuth, (req, res) => {
    console.log("secret page!!");
    res.status(200).json({msg: "auth successfull!!"})

    // return res.redirect(`${CLIENT_URL}/login/success`)
    // window.open(`${CLIENT_URL}/login/success`, "_self");
    // res.redirect(`${CLIENT_URL}/login/success`, "_self")
})

router.get("/logout", isAuth, cookieJwtTokenAuth, (req, res) => {
    console.log(req.session.passport?.user?.id, req.session.id)
    
    res.clearCookie("token");
    
    req.session.destroy(err => {
        if (err) return res.status(401).json({ msg: "logout failed!!" })
        // return res.redirect(CLIENT_URL);
        return res.redirect(`${CLIENT_URL}/login`)
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