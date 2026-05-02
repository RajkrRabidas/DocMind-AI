const crypto = require('crypto');

const generateCSRFToken = (userId, res) => {

    const CSRFToken = crypto.randomBytes(32).toString("hex")

    const CSRFKey = `csrf:${userId}`

    await redisClient.setEx(CSRFKey, 3600, CSRFToken)

    res.cookies("CSRFToken", CSRFToken, {
        httpOnly: false,
        secure: true,
        sameSite: "none",
        maxAge: 60*60*1000
    })
    return CSRFToken
}

