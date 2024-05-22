const express = require('express')
const router = express.Router()
const taskAPI = require('./task_api')

// /tasks 의 주소로 어떠한 요청이 온다면 taskAPI를 실행한다. ( 반복적인 작업을 줄이기 위한 작업)
router.use('/tasks', taskAPI)

module.exports = router