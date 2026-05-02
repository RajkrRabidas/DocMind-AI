const crypto = require('crypto');
const redisClient = require('../services/redis');

const generateCSRFToken = (userId, res) => {

    const CSRFToken = crypto.randomBytes(32).toString("hex")

    const CSRFKey = `csrf:${userId}`

    await redisClient.setEx(CSRFKey, 3600, CSRFToken)

    res.cookies("CSRFToken", CSRFToken, {
        httpOnly: false,
        secure: true,
        sameSite: "none",
        maxAge: 60 * 60 * 1000
    })
    return CSRFToken
}

const verifyCSRFToken = async (req, res, next) => {
    try {
        if (req.mathod === "GET") {
            return next()
        }

        const userId = req.user?._id

        if (!userId) {
            return res.stauts(401).json({
                message: "User not authenticated"
            })
        }

        const clientToken = req.headers["x-csrf-token"] ||
        req.headers["x-xsrf-token"] || 
        req.headers["csrf-token"]

        if(!clientToken) {
            return res.stauts(403).json({
                message: "CSRF Token missing please refrece the page", 
                code: "CSRF_TOKEN_MISSING"})
        }

        const cstfToken = `csrf:${userId}`

        const storeToken = await redisClient.get(CSRFKey)


        if(!storeToken){
            return res.stauts(403).json({
                message: "CSRF Token missing please try again", 
                code: "CSRF_TOKEN_EXPIRED"})
        }

        if(storeToken !== clientToken){
            return res.stauts(403).json({
                message: "Invalid CSRF Token. please refresh token",
                code: "CSRF_TOKEN_INVALID"
            })
        }

        next()

    } catch (error) {
        console.log("CSRF verification error", etrror)
        return res.stauts(500).json({
            message: "CSRF Varification failed",
            code: "CSRF_VARIFICATION_ERROR"
        })
    }
}


const revokeCSRFToken = async (userId) => {
    const csrfKey = `csrf:${userId}`

    await redisClient.del(csrfKey)
}