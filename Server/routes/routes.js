const express = require("express")
const { additemHandler, finditemHandler, allitemsHandler,signupHandler, loginHandler, bmrAndDietHandler } = require("../controller/controller")
const {AUTHENTICATION,FrontEndAuth} = require("../middlewares/authentication")

const apiRouter = express.Router()
const serviceRouter = express.Router()
const userRouter = express.Router()

apiRouter.post('/bmranddiet',bmrAndDietHandler)
serviceRouter.post('/add', AUTHENTICATION, additemHandler)
serviceRouter.post('/find', AUTHENTICATION, finditemHandler)
serviceRouter.get('/all', AUTHENTICATION, allitemsHandler)
userRouter.post('/signup', signupHandler)
userRouter.post('/login', loginHandler)
userRouter.get("/auth",FrontEndAuth)

module.exports = {apiRouter,serviceRouter,userRouter}