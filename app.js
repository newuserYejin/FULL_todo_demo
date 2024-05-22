const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const indexRouter = require('./routes/index')

const app = express()

app.use(bodyParser.json())
app.use("/api", indexRouter)     // 이렇게 작성하면 전체 주소의 앞에 /api 가 붙어야한다. ( 불필요하다고 생각되면 반값으로 둬도 된다. )

const mongoURI = 'mongodb://localhost:27017/todo-demo'

mongoose.connect(mongoURI, { useNewUrlParser: true }).then(() => {
    console.log('mongoose connected')
}).catch((err) => {
    console.log("DB connect failed : ", err)
})

app.listen(5000, () => {
    console.log('server on 5000')
})