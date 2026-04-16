const jwt = require("jsonwebtoken")
const { redisClient } = require("../services/redis")

const generateToken = async (id, res) => {
    const accessToken = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1m'
    })
    const refreshToken = jwt.sign({ id }, process.env.REFRESH_SECERET, {
        expiresIn: "7d"
    })

    const refreshTokenKey = `refresh_token:${id}`

    await redisClient.set(refreshTokenKey, refreshToken, { EX: 7 * 24 * 60 * 60 })

    res.cookie("access_token", accessToken, {

        httpOnly: true,
        // secure: true,
        sameSite: "strict",
        maxAge: 60 * 1000, // 1 minute

    })

    res.cookie("refresh_token", refreshToken, {

        httpOnly: true,
        // secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })

    return { accessToken, refreshToken }

}

module.exports = generateToken
