require("dotenv").config()
const express = require("express")
const cors = require("cors")
const { userRouter, serviceRouter, apiRouter } = require("./routes/routes")

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api', userRouter)
app.use('/api', serviceRouter)
app.use('/api', apiRouter)

app.use((err, req, res, next) => {
    res.status(411).json({ msg: "Oops, Some error occured",/*err*/ })
    //console.log(err)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`This server is running on port ${PORT}`)
})

