const Task = require("../model/Task")

const taskController = {

}

taskController.createTask = async (req, res) => {
    try {
        const { task, isComplete } = req.body

        const newTask = new Task({ task, isComplete })
        await newTask.save()

        res.status(200).json({ status: 'success', data: newTask })
    } catch (err) {
        res.status(400).json({ status: 'fail', error: err })
    }
}

taskController.getTask = async (req, res) => {
    try {
        // Task 테이블의 모든 데이터 받아오기
        const taskList = await Task.find({}).select("-__v")     // __v는 버전 정보(내가 추가한 데이터 아님)
        res.status(200).json({ status: 'success', data: taskList })
    } catch (err) {
        res.status(400).json({ status: 'fail', error: err })
    }
}

// taskController.updateTask = async (req, res) => {
//     try {
//         // const { task: updateTarget, isComplete: updateComplete } = req.body          // req에서 받은 데이터로 찾지 않고 url의 id를 이용해서 찾을 수 있어야한다.
//         const updateTarget = await Task.findById(req.params.id)             // 1. url의 params중 id를 가지고 Task에서 해당 id를 가진 대상을 찾는다.
//         if (!updateTarget) {
//             throw new Error("don't find task")
//         }
//         // const modifyTask = await Task.updateOne({ task: updateTarget }, { $set: { isComplete: updateComplete } })
//         const modifyTask = Object.keys(req.body)                    // 2. 변경될 내용을 저장할건데, complete뿐만이 아닌 task내용도 바꿀 수 있도록 바꿀 내용 body에서 받아 객체 형태로 만들기
//         modifyTask.map((item) => updateTarget[item] = req.body[item])
//         await updateTarget.save()                   // 3. 타겟 task를 변경된 내용을 가진채로 저장시키기
//         res.status(200).json({ status: 'success', data: modifyTask })
//     } catch (err) {
//         res.status(400).json({ status: 'fail', err })
//     }
// }

taskController.updateTask = async (req, res) => {
    try {
        // const { task: updateTarget, isComplete: updateComplete } = req.body          // req에서 받은 데이터로 찾지 않고 url의 id를 이용해서 찾을 수 있어야한다.
        // const updateTarget = await Task.findById(req.params.id)             // 1. url의 params중 id를 가지고 Task에서 해당 id를 가진 대상을 찾는다.
        // if (!updateTarget) {
        //     throw new Error("don't find task")
        // }
        const modifyTask = await Task.updateOne({ _id: req.params.id }, { $set: { isComplete: req.body.isComplete, task: req.body.task } })
        res.status(200).json({ status: 'success', data: modifyTask })
    } catch (err) {
        res.status(400).json({ status: 'fail', err })
    }
}

module.exports = taskController