const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");
const { bmrAndDietSchema } = require("../config/input_validation");
const MODEL_NAME = process.env.MODEL_NAME
const API_KEY = process.env.API_KEY

const BMR_PROMPT = process.env.BMR_PROMPT
const DIET_PROMPT = process.env.DIET_PROMPT

const bmrAndDiet = async (req, res) => {
    try {
        const userInputs = bmrAndDietSchema.safeParse(req.body)
        if (userInputs.success) {
            const age = userInputs.data.age
            const height = userInputs.data.height
            const weight = userInputs.data.weight
            const activity = userInputs.data.activity
            const type = userInputs.data.type
            const meals = userInputs.data.meals
            const exception = userInputs.data.exception
            const forwhat = userInputs.data.forwhat

            const prompt = `${BMR_PROMPT} AGE:${age}, HEIGHT:${height}, WEIGHT:${weight} ,ACTIVITY LEVEL:${activity}; ${DIET_PROMPT} ${type}, MEALS ${meals}, DON'T INCLUDE THESE FOOD ITEMS IN THE DIET PLAN ${exception}, FOR ${forwhat}; ONLY PRINT BMR WHICH YOU CALCULATED AND ALL THE MEALS, THATS IT!`

            const genAI = new GoogleGenerativeAI(API_KEY);
            const model = genAI.getGenerativeModel({ model: MODEL_NAME });
            const safetySettings = [
                {
                    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                },
                {
                    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                },
                {
                    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                },
                {
                    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                },
            ];
            const generationConfig = {
                temperature: 0.9,
                topK: 1,
                topP: 1,
                maxOutputTokens: 2048,
            }
            const chat = model.startChat({
                generationConfig,
                safetySettings,
                history: [
                ],
            });

            const result = await chat.sendMessage(prompt);
            const response = result.response;
            const BMRandDIET = response.candidates[0].content.parts[0].text
            res.status(200).send(BMRandDIET);
        } else {
            res.status(411).json({ msg: "Invalid inputs" })
        }
    } catch (err) {
        res.status(500).json({ msg: "Error occured", /*err*/ })
        //console.log(err)
    }
}

module.exports = { bmrAndDiet }