const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../services/user")

const AUTHENTICATION = (req,res,next)=>{
    try {
        const token = req.query.token
        const decode = jwt.verify(token, JWT_SECRET)
        if (!decode) {
            res.status(411).json({ msg: "Your jwt token is invalid"})
        } else {
            next()
        }
    } catch (err) {
        res.status(500).json({ msg: "Error occured while authentication ", /*err*/ })
        //console.log(err)
    }
}

const FrontEndAuth = (req,res)=>{
    try{
        const token = req.query.token
        const decode = jwt.verify(token,JWT_SECRET)
        if(decode){
            res.status(200).json({code:200}) 
        }
        else{
            res.status(411).json({msg:"You are not authorized"})           
        }
    }catch(err){
        res.status(500).json({msg:"Error occured while checkin", /*err*/})
        //console.log(err)
    }
}

module.exports = {AUTHENTICATION,FrontEndAuth}