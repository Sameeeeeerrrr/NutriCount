const { foodItem } = require("../config/database")
const { foodSchema } = require("../config/input_validation")

const additem = async (req, res) => {
    try {
        const foodinputs = foodSchema.safeParse(req.body)
        if (!foodinputs.success) {
            res.status(411).json({ msg: "Invalid food inputs" })
        } else {
            const food = foodinputs.data.food
            const foodWithoutExtraSpaces = food.split(" ").join("")
            const foodexists = await foodItem.findOne({ food: foodWithoutExtraSpaces })
            if (foodexists) {
                res.status(500).json({ msg: "Food item already exists" })
            } else {
                const addfood = new foodItem({
                    food: foodWithoutExtraSpaces,
                    calories: foodinputs.data.calories,
                    protein: foodinputs.data.protein,
                    carbs: foodinputs.data.carbs,
                    fats: foodinputs.data.fats,
                    fibre: foodinputs.data.fibre
                })
                await addfood.save()
                res.json({ msg: "Food item got added" })
            }
        }
    } catch (err) {
        res.status(500).json({ msg: "Error occured while adding food item", /*err*/ })
        //console.log(err)
    }
}

const finditem = async (req, res) => {
    try {
        const input = req.body.food
        const amount = parseInt(req.body.amount)
        const fooditem = await foodItem.findOne({ food: input })
        if (!fooditem) {
            res.status(404).json({ msg: "Food item doesn't exists" })
        } else {
            if (amount) {
                const food = fooditem.food
                const calories = (fooditem.calories * amount) / 100
                const protein = (fooditem.protein * amount) / 100
                const carbs = (fooditem.carbs * amount) / 100
                const fats = (fooditem.fats * amount) / 100
                const fibre = (fooditem.fibre * amount) / 100
                const Fooditem = { food, calories, protein, carbs, fats, fibre }
                res.json({ Fooditem })
            } else {
                const food = fooditem.food
                const calories = fooditem.calories
                const protein = fooditem.protein
                const carbs = fooditem.carbs
                const fats = fooditem.fats
                const fibre = fooditem.fibre
                const Fooditem = { food, calories, protein, carbs, fats, fibre }
                res.json({ Fooditem })
            }
        }
    } catch (err) {
        res.status(500).json({ msg: "Error occured while finding food item", /*err*/ })
        //console.log(err)
    }
}

const viewitems = async (req, res) => {
    try {
        const fooditem = await foodItem.find()
        if (fooditem) {
            res.json({ fooditem })
        } else {
            res.status(404).json({ msg: "Cannot find food items" })
        }
    } catch (err) {
        res.json({ msg: "Error occured while viewing all food items",/*err*/ })
        //console.log(err)
    }

}

module.exports = { additem, finditem, viewitems }