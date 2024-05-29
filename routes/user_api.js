const express = require('express')
const router = express.Router()
const userController = require('../controller/user_controller')
const authController = require('../controller/auth_controller')

// 1. 회원가입 endpoint
router.post("/", userController.createUser)
router.post("/login", userController.loginWithEmail)

// get는 req.body에 정보를 담아서 보낼 수 없다.
// 따라서 이메일과 패스워드를 받아와야하는 작업에 대해서 get과 비슷하지만 req.body를 사용하기 위해 post를 쓴다.

// 토큰을 통해 유저 id빼내고 => 그 아이디로 유저 객체 찾아서 보내주기
router.get('/me', authController.authenticate, userController.getUser)      // 미들웨어 사용 중

module.exports = router
