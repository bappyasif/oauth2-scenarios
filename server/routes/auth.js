const express = require("express");
const passport = require("passport");

const router = express();

const authCheck = (req, res, next) => {
    if(req.user) {
        next()
    } else {
        res.redirect("http://localhost:3000/login")
    }
}

// router.get('/login', authCheck, (req, res) => {
//     passport.authenticate("google", {session: false}, (err, user) => {
//         res.cookie = ("coookiiiieee", user)
//         res.status(200).json({msg: 'you are logged, look into cookie', user: req.user});
//     })
//     res.status(200).json({msg: 'not really!!', user: req.user});
// });

router.get('/login', (req, res) => {
    res.status(200).json({msg: 'you are logged, look into cookie', user: req.user});
    // res.render('login', { user: req.user });
});

// auth logout
router.get('/logout', (req, res) => {
    // handle with passport
    req.logOut()
    res.redirect("http://localhost:3000/")
});

// auth with google+
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

// callback route for google to redirect to
router.get('/google/callback',  passport.authenticate('google'), (req, res) => {
    res.cookie = ("session_cookie", req.user)
    res.redirect("http://localhost:3000/")
    // res.status(200).json({msg: 'you reached the redirect URI', user: req.user});
});

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