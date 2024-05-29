const authController = {}
const jwt = require('jsonwebtoken')
require("dotenv").config()
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

authController.authenticate = (req, res, next) => {
    try {
        const tokenString = req.headers.authorization // "Bearer "
        if (!tokenString) {
            throw new Error("invalid token")
        }
        const token = tokenString.replace("Bearer ", "")
        jwt.verify(token, JWT_SECRET_KEY, (error, payload) => {
            if (error) {
                throw new Error("invalid token")
            }
            req.userId = payload._id
        })

        next();          // 미들웨어 사용으로 다음꺼 호출
    } catch (error) {
        res.status(400).json({ status: "token fail", message: error.message })
    }
}

module.exports = authController

// 미들웨어
