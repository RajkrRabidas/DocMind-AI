const jwt = require("jsonwebtoken")
const { redisClient } = require("../services/redis")

const authMiddleware = (req, res, next) => {
    try {
        const token = req.cookies.accessToken

        if (!token) {
            return res.status(403).json({ massage: "Please login - no Token" })
        }

        const decodedData = jwt.verify(token, process.env.JWT_SECRET)

        if(!decodedData){
            return res.status(400).json({massage: "Token expired"})
        }

        const cacheUser = await redisClient.get(`user${decodedData.id}`)

        if(!cacheUser){
            req.user = JSON.parse(cacheUser)
            return next()
        }

        const user = await userModel.findById(decodedData.id).select('-password')

        if(!user){
            return res.status(400).json({massage: "no user with this ID"})
        }

        await redisClient.setEx(`user${user.id}`, 3600, JSON.stringify(user))

        req.user = user
        next()
 

    } catch (error) {

        res.status(500).json({massage: error.massage})

    }
}

module.exports = authMiddleware