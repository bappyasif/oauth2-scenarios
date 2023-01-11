const jwt = require("jsonwebtoken");

const generateJwtAccessToken = (user) => {
    return jwt.sign(user, process.env.JWT_SECRET, {expiresIn: "30s"})
}

const generateJwtRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN)
}

const verifyRefreshTokenAndProvideAnAccessToken = (refreshTokenFromRequest) => {
    return jwt.verify(refreshTokenFromRequest, process.env.REFRESH_TOKEN, (err, user) => {
        if(err) return undefined
        const accessToken = generateJwtAccessToken(user)
        return accessToken;
    })
}

const verifyJwtAccessToken = (accessTokenFromRequest) => {
    return jwt.verify(accessTokenFromRequest, process.env.JWT_SECRET)
}

// const verifyJwtAccessToken = (accessTokenFromRequest, refreshTokenFromRequest) => {
//     const tokenVerifed = jwt.verify(accessTokenFromRequest, process.env.JWT_SECRET)
//     console.log(tokenVerifed, 'tokenVerifed!!')

//     if(!tokenVerifed && refreshTokenFromRequest) {
//         tokenVerifed = verifyRefreshTokenAndProvideAnAccessToken(refreshTokenFromRequest)
//     }

//     return tokenVerifed
// }

module.exports = {
    generateJwtAccessToken,
    generateJwtRefreshToken,
    verifyJwtAccessToken,
    verifyRefreshTokenAndProvideAnAccessToken
} 