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
    },
    author: {
        type: Schema.Types.ObjectId,         // id를 받아오는 타입
        required: true,
        ref: "User"                  // 외래키로 설정 ( 참조 테이블(컬렉션)은 User )
    },
}, { timestamps: true })
// timestamp는 데이터 생성 날짜를 추가해준다

const Task = mongoose.model('Task', taskSchema)

module.exports = Task