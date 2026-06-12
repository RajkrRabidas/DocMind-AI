const crypto = require('crypto');
const {redisClient} = require('../services/redis');

const generateCSRFToken = async (userId, res) => {

    const CSRFToken = crypto.randomBytes(32).toString("hex")

    const CSRFKey = `csrf:${userId}`

    await redisClient.set(CSRFKey, CSRFToken, { EX: 60 * 60 }) // 1 hour

    res.cookie("CSRFToken", CSRFToken, {
        httpOnly: false,
        secure: true,
        sameSite: "none",
        maxAge: 60 * 60 * 1000
    })
    return CSRFToken
}

const verifyCSRFToken = async (req, res, next) => {
    try {
        if (req.method === "GET") {
            return next()
        }

        const userId = req.user?._id

        if (!userId) {
            return res.status(401).json({
                message: "User not authenticated"
            })
        }

        const clientToken = req.headers["x-csrf-token"]

        if(!clientToken) {
            return res.status(403).json({
                message: "CSRF Token missing please refrece the page", 
                code: "CSRF_TOKEN_MISSING"})
        }

        const CSRFKey = `csrf:${userId}`

        const storeToken = await redisClient.get(CSRFKey)


        if(!storeToken){
            return res.status(403).json({
                message: "CSRF Token missing please try again", 
                code: "CSRF_TOKEN_EXPIRED"})
        }

        if(storeToken !== clientToken){
            return res.status(403).json({
                message: "Invalid CSRF Token. please refresh token",
                code: "CSRF_TOKEN_INVALID"
            })
        }

        next()

    } catch (error) {
        console.log("CSRF verification error", error)
        return res.status(500).json({
            message: "CSRF Varification failed",
            code: "CSRF_VARIFICATION_ERROR"
        })
    }
}


const revokeCSRFToken = async (id) => {
    const csrfKey = `csrf:${id}`

    await redisClient.del(csrfKey)
}

const refreshCSRFToeken = async (id, res) => {

    await revokeCSRFToken(id)

    return await generateCSRFToken(id, res)
}

module.exports = {
    generateCSRFToken,
    verifyCSRFToken,
    revokeCSRFToken,

}