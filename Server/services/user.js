const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { login_schema, signup_schema } = require("../config/input_validation")
const { Users } = require("../config/database")
const JWT_SECRET = process.env.JWT_SECRET

const signup = async (req, res) => {
    try {
        const userInputs = signup_schema.safeParse(req.body)
        if (!userInputs.success) {
            res.status(411).json({ msg: "Invalid inputs, inputs must be string" })
        } else {
            const email = userInputs.data.email
            const username = userInputs.data.username
            const password = userInputs.data.password

            const emailWithoutExtraSpaces = email.split(" ").join("")
            const usernameWithoutExtraSpaces = username.split(" ").join("")
            const passwordWithoutExtraSpaces = password.split(" ").join("")

            const userExists = await Users.findOne({ username: usernameWithoutExtraSpaces, email: emailWithoutExtraSpaces })
            if (userExists) {
                res.status(500).json({ msg: "User already exists, Go to 'Login' page" })
            } else {
                const hashedpassword = await bcrypt.hash(passwordWithoutExtraSpaces, 10)
                const addUser = new Users({
                    email: emailWithoutExtraSpaces,
                    username: usernameWithoutExtraSpaces,
                    password: hashedpassword
                })
                await addUser.save()
                res.json({ msg: "User created" })
            }
        }
    } catch (err) {
        res.status(500).json({ msg: "Error occured while signing up", /*err*/ })
        //console.log(err)
    }
}

const login = async (req, res) => {
    try {
        const userInputs = login_schema.safeParse(req.body)
        if (!userInputs.success) {
            res.status(411).json({ msg: "Invalid inputs, inputs must be string" })
        } else {
            const username = userInputs.data.username
            const usernameWithoutExtraSpaces = username.split(" ").join("")
            const password = userInputs.data.password
            const userExists = await Users.findOne({ username: usernameWithoutExtraSpaces })
            if (userExists) {
                const isPassswordValid = await bcrypt.compare(password, userExists.password)
                if (isPassswordValid) {
                    const token = jwt.sign({ username }, JWT_SECRET)
                    res.json({ token ,usernameWithoutExtraSpaces})
                } else {
                    res.status(411).json({ msg: "Your password is incorrect" })
                }
            } else {
                res.status(404).json({ msg: "User doesn't exists, Go to 'Signup' page" })
            }
        }
    } catch (err) {
        res.status(500).json({ msg: "Error occured while loging in", /*err*/ })
        //console.log(err)
    }
}

module.exports = { signup, login, JWT_SECRET }
