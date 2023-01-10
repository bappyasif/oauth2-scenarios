const express = require("express");
const passport = require("passport");

const router = express();

const CLIENT_URL = "http://localhost:3000"

// router.get("/login/success", (req, res) => {
//     if (req.user) {
//         res.status(200).json({
//             success: true,
//             message: "successfull",
//             user: req.user,
//             //   cookies: req.cookies
//         });
//     }
// });

router.get("/login/success", (req, res) => {
    console.log(req.user, "req.user!!", req?.session?.passport?.user, req.isAuthenticated())
    if (req.user) {
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

router.get("/logout", (req, res) => {
    if (req.isAuthenticated()) {
        req.logout(err => {
            if (err) return res.status(401).json({ msg: "logout failed!!" })
            // return res.status(200).json({ msg: "logout successfull" })
            return res.redirect(CLIENT_URL);
        });
    }
    // res.redirect(CLIENT_URL);
    // res.status(401).json({ msg: "logout failed!!" })
});

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
    "/google/callback",
    passport.authenticate("google", {
        successRedirect: CLIENT_URL,
        failureRedirect: "/login/failed",
    })
);

// router.get('/login', (req, res) => {
//     res.render('login', { user: req.user });
// });

// // auth logout
// router.get('/logout', (req, res) => {
//     // handle with passport
//     res.send('logging out');
// });

// // auth with google+
// router.get('/google', passport.authenticate('google', {
//     scope: ['profile']
// }));

// // callback route for google to redirect to
// router.get('/google/callback',  passport.authenticate('google'), (req, res) => {
//     // res.redirect("http://localhost:3000/")
//     res.status(200).json({msg: 'you reached the redirect URI', user: req.user});
// });

// callback route for google to redirect to
// router.get('/google/callback',  passport.authenticate('google'), (req, res) => {

//     res.status(200).json({msg: 'you reached the redirect URI', user: req.user});
// });


module.exports = router;

/**
 * 
 * 
 // router.get("/google", passport.authenticate("google", {scope: ["profile", "email"]}))
// router.get("/google/callback", passport.authenticate("google", {
//     // successMessage: "successfull login",
//     // successRedirect: `${process.env.CLIENT_URL}/login/success`,
//     // successRedirect: `http://localhost:4000/login/success`,
//     successRedirect: `http://localhost:3000/`,
//     // successRedirect: `http://localhost:4000/auth/login/success`,
//     // successRedirect: `/auth/login/success`,
//     // failureMessage: "Login failed",
//     failureRedirect: `http://localhost:4000/auth/login/failed`,
//     // failureRedirect: `${process.env.CLIENT_URL}/login/failed`,
// }));

// router.get("/login/failed", (req, res) => res.status(401).json({msg: "login failed"}))

// router.get("/login/success", (req, res) => {
//     console.log(req.user, "req.user!!", req?.session?.passport?.user, req.isAuthenticated())
//     if(req.user) {
//         res.status(200).json({
//             msg: "login successfull!!", 
//             user: req.user, 
//             cookies: req.cookies,
//             // jwt: req.jwt
//         })
//     } 
//     // else {
//     //     res.status(401).json({msg: "authentication failed!!"})
//     // }
// })

// router.get("/logout", (req, res) => {
//     req.logOut();
//     req.cookies = null
//     res.status(200).json({msg: "logout successfull"})
//     // res.redirect(process.env.CLIENT_URL)
// })
 */