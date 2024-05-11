import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import backgroundImage from "../../assets/4452328.jpg"
import "./Additems.css"

export function AddItemPage() {
    const navigate = useNavigate()
    const [fooditem, setFooditem] = useState("")
    const [calories, setCalories] = useState("")
    const [protein, setProtein] = useState("")
    const [carbs, setCarbs] = useState("")
    const [fats, setFats] = useState("")
    const [fibre, setFibre] = useState("")

    function fooditemHandler(e) {
        setFooditem(e.target.value)
    }
    function caloriesHandler(e) {
        setCalories(e.target.value)
    }
    function proteinHandler(e) {
        setProtein(e.target.value)
    }
    function carbsHandler(e) {
        setCarbs(e.target.value)
    }
    function fatsHandler(e) {
        setFats(e.target.value)
    }
    function fibreHandler(e) {
        setFibre(e.target.value)
    }

    const sendReq = async () => {
        const token = localStorage.getItem("token")
        const data = {
            food: fooditem,
            calories: parseInt(calories),
            protein: parseInt(protein),
            carbs: parseInt(carbs),
            fats: parseInt(fats),
            fibre: parseInt(fibre)
        }
        if (fooditem) {
            if (calories) {
                if (protein) {
                    if (carbs) {
                        if (fats) {
                            if (fibre) {
                                try {
                                    const response = await axios.post(`http://localhost:8080/api/add?token=${token}`, data)
                                    if (response.status = 200) {
                                        alert(response.data.msg)
                                        navigate("/services")
                                    } else {
                                        alert("OOPS try again")
                                        navigate("/services/add")
                                    }
                                } catch (err) {
                                    alert("OOPS try again")
                                    navigate("/services/add")
                                    console.log(err)
                                }
                            } else {
                                alert("Enter amount of fibre")
                            }
                        } else {
                            alert("Enter amount of fats")
                        }
                    } else {
                        alert("Enter amount of carbs")
                    }
                } else {
                    alert("Enter amount of protein")
                }
            } else {
                alert("Enter amount of calories")
            }
        } else {
            alert("Enter food item")
        }
    }

    return <div style={{
        backgroundImage: `url(${backgroundImage})`, // Apply background image
        backgroundSize: 'cover', // Adjust the size of the image to cover the entire container
        backgroundPosition: 'center', // Center the image
        width: '100vw', // Full width
        height: '100vh', // Full height
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }}>
        <div className="addpage">
            <div className="addbox">
                <h3><div className="addlogo">Add food items nutritional value based on 100 gm/ml</div></h3>
                <input className="inputboxes" placeholder="Food item" type="text" value={fooditem} onChange={fooditemHandler}></input><br></br>
                <input className="inputboxes" placeholder="Calories per 100 gm/ml" type="number" value={calories} onChange={caloriesHandler}></input><br></br>
                <input className="inputboxes" placeholder="Protein per 100 gm/ml" type="number" value={protein} onChange={proteinHandler}></input><br></br>
                <input className="inputboxes" placeholder="Carbs per 100 gm/ml" type="number" value={carbs} onChange={carbsHandler}></input><br></br>
                <input className="inputboxes" placeholder="Fats per 100 gm/ml" type="number" value={fats} onChange={fatsHandler}></input><br></br>
                <input className="inputboxes" placeholder="Fibre per 100 gm/ml" type="number" value={fibre} onChange={fibreHandler}></input><br></br>
                <button className="addbtn" onClick={() => { sendReq() }}>Add</button>
                <button className="cancelbtn" onClick={() => { navigate("/services") }}>Cancel</button>
            </div>
        </div>
    </div>

}
