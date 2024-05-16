const mongoose = require("mongoose");

const DATABASE_URL = process.env.DATABASE_URL

mongoose.connect(`${DATABASE_URL}`); 

const Users = mongoose.model("Users",
    {
        email:String,
        username:String,
        password:String
    })

const foodItem = mongoose.model("fooditems",
    {
        food:String,
        calories:String,
        protein:String,
        carbs:String,
        fats:String,
        fibre:String
    })

const UsersList = mongoose.model("UsersList",
    {
        username : String,
        foodList : []
    }
)

module.exports = {Users,foodItem, UsersList}    