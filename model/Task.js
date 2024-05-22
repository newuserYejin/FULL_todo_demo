// 스키마 작성
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = Schema({
    task: {
        type: String,
        required: true
    },
    isComplete: {
        type: Boolean,
        required: true
    }
}, { timestamps: true })
// timestamp는 데이터 생성 날짜를 추가해준다

const Task = mongoose.model('Task', taskSchema)

module.exports = Task