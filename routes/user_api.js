const express = require('express')
const router = express.Router()
const userController = require('../controller/user_controller')

// 1. 회원가입 endpoint
router.post("/", userController.createUser)
router.post("/login", userController.loginWithEmail)

// get는 req.body에 정보를 담아서 보낼 수 없다.
// 따라서 이메일과 패스워드를 받아와야하는 작업에 대해서 get과 비슷하지만 req.body를 사용하기 위해 post를 쓴다.

module.exports = router
