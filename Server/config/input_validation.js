const zod = require("zod")

const signup_schema = zod.object({
    email:zod.string(),
    username: zod.string(),
    password: zod.string()
})

const login_schema = zod.object({
    username: zod.string(),
    password: zod.string()
})

const foodSchema = zod.object({
    food: zod.string(),
    calories: zod.number(),
    protein: zod.number(),
    carbs: zod.number(),
    fats: zod.number(),
    fibre: zod.number()
})

const bmrAndDietSchema = zod.object({
    age: zod.string(),// age 
    height: zod.string(),// height
    weight: zod.string(),// weight ,kg/lbs 
    activity: zod.string(),// activity level
    type: zod.string(),// veg/non-veg/vegan
    meals: zod.string(),// how many meals does the user wants in his/her diet plan
    exception: zod.string(),// food items that they dont want in their diet plan
    forwhat: zod.string(),// fatloss,weightloss,maintain,muscle-gain,etc
    gender: zod.string()
})

module.exports = { foodSchema, login_schema, signup_schema, bmrAndDietSchema }