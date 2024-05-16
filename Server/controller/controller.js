const { bmrAndDiet } = require("../services/api")
const { additem, finditem, viewitems, removeitem } = require("../services/service")
const { signup, login } = require("../services/user")

const signupHandler = (signup)
const loginHandler = (login)
const additemHandler = (additem)
const finditemHandler = (finditem)
const allitemsHandler = (viewitems)
const bmrAndDietHandler = (bmrAndDiet)
const removeitemHandler = (removeitem)

module.exports = { signupHandler, loginHandler, additemHandler, finditemHandler, allitemsHandler, bmrAndDietHandler ,removeitemHandler}