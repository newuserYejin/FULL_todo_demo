const express = require('express')
const taskController = require('../controller/tast_controller')
const router = express.Router()

// router.post('/', (req, res) => {
//     res.send('create task')
// })

// taskController 안의 createTask 실행
router.post('/', taskController.createTask)

router.get('/', taskController.getTask)

router.put('/:id', taskController.updateTask)

router.delete('/:id', (req, res) => {
    res.send('delete task')
})

module.exports = router
