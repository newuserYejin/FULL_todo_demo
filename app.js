const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const indexRouter = require('./routes/index')

const app = express()
require('dotenv').config()

const MONGODB_URI_PROD = process.env.MONGODB_URI_PROD

// cors 에러 해결하기 위함
const cors = require('cors')
app.use(cors())

app.use(bodyParser.json())
app.use("/api", indexRouter)     // 이렇게 작성하면 전체 주소의 앞에 /api 가 붙어야한다. ( 불필요하다고 생각되면 반값으로 둬도 된다. )

const mongoURI = MONGODB_URI_PROD

mongoose.connect(mongoURI, { useNewUrlParser: true }).then(() => {
    console.log('mongoose connected')
}).catch((err) => {
    console.log("DB connect failed : ", err)
})

app.listen(process.env.PORT || 5000, () => {
    console.log('server on 5000')
})

// 1. 회원가입
// 이메일, 패스워드, 유저 이름 입력 후 보내기
// 받은 정보를 저장함 (DB 모델 필요)
// 비밀번호는 암호화 시켜서 저장

// 1. 라우터
// 2. 모델 생성
// 3. 데이터 받아서 저장(이미 가입된 유저 유무 파악, 패스워드는 암호화해서)
// 4. 응답 보내기

// 2. 로그인
// 이메일, 패스워드를 입력해서 보냄.
// 데이터베이스에 해당 이메일과 패스워드 가진 유저 있는지 확인
// 없으면 로그인 실패
// 있다면? 유저 정보 + token

// 1, 라우터
// 2. 이메일, 패스워드 정보 읽어오기
// 3. 이메일로 유저 접오 가져오기
// 4. 있다면 해당 정보의 패스워드와 입력받은 패스워드가 일치하는지 확인
// 5. 일치하면 토큰 발행
// 6. 틀리면 에러 메세지 출력
// 7. 응답으로 유저정보 + 토큰 보냄
