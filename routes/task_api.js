const express = require('express')
const taskController = require('../controller/tast_controller')
const authController = require('../controller/auth_controller')
const router = express.Router()

// router.post('/', (req, res) => {
//     res.send('create task')
// })

// taskController 안의 createTask 실행
router.get('/', taskController.getTask)

router.post('/', authController.authenticate, taskController.createTask)

router.put('/:id', taskController.updateTask)

router.delete('/:id', taskController.deleteTask)

module.exports = router
