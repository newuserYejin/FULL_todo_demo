const User = require("../model/User")
const bcrypt = require('bcryptjs')
const saltRounds = 10

const userController = {}

userController.createUser = async (req, res) => {
    try {
        const { email, name, password } = req.body
        const user = await User.findOne({ email })          // 해당 email의 데이터가 기존에 있는지 찾아보기

        if (user) {
            throw new Error("이미 가입된 이메일입니다.")
        }

        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        console.log("hash:", hash)
        const newUser = new User({ email, name, password: hash })
        await newUser.save()

        res.status(200).json({ status: "user add success" })

    } catch (error) {
        res.status(400).json({ status: "user add fail", error })
    }
}

userController.loginWithEmail = async (req, res) => {
    try {
        const { email, password } = req.body
        // const compareUser = await User.findOne({ email })
        const compareUser = await User.findOne({ email }, "-createdAt -updatedAt -__v")     // 필요없는 정보 빼기
        if (compareUser) {
            const isMatch = bcrypt.compareSync(password, compareUser.password)
            if (isMatch) {
                const token = compareUser.generateToken()
                return res.status(200).json({ status: "login success", compareUser, token })
            }
        }
        throw new Error("Your Id or Password is not match!!")
    } catch (error) {
        res.status(400).json({ status: "login fail", message: error.message })
    }
}

userController.getUser = async (req, res) => {
    try {
        const { userId } = req
        const user = await User.findById(userId)
        if (!user) {
            throw new Error("can not find user")
        }
        res.status(200).json({ status: "get user success", user })
    } catch (error) {
        res.status(400).json({ status: "get user fail", message: error.message })
    }
}

module.exports = userController
