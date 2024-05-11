import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import backgroundImage from "../../assets/4452328.jpg"
import { NavBar } from "../NavBar"
import "./Api.css"


export function ApiPage() {
    const [output, setOutput] = useState("*Your Diet plan will be printed here*")
    const navigate = useNavigate()
    const token = localStorage.getItem("token")

    useEffect(() => {
        async function checkin() {
            try {
                const response = await axios.get(`http://localhost:8080/api/auth?token=${token}`)
                if (response.status === 200) {
                    console.log(response.data.msg)
                } else {
                    //alert("Login in first")
                    navigate("/")
                }
            } catch (err) {
                //alert("Login in first")
                navigate("/")
                console.log(err)
            }
        }
        checkin()
    }, [])

    const [age, setAge] = useState("")
    const [height, setHeight] = useState("")
    const [weight, setWeight] = useState("")
    const [activity, setActivity] = useState("")
    const [type, setType] = useState("")
    const [meals, setMeals] = useState("")
    const [exception, setException] = useState("")
    const [forwhat, setForwhat] = useState("")

    function ageHandler(e) {
        setAge(e.target.value)
    }
    function heightHandler(e) {
        setHeight(e.target.value)
    }
    function weightHandler(e) {
        setWeight(e.target.value)
    }
    function activityHandler(e) {
        setActivity(e.target.value)
    }
    function typeHandler(e) {
        setType(e.target.value)
    }
    function mealsHandler(e) {
        setMeals(e.target.value)
    }
    function exceptionHandler(e) {
        setException(e.target.value)
    }
    function forwhatHandler(e) {
        setForwhat(e.target.value)

    }

    const sendReq = async () => {
        const data = {
            age: age,
            height: height,
            weight: weight,
            activity: activity,
            type: type,
            meals: meals,
            exception: exception,
            forwhat: forwhat
        }
        if (age) {
            if (height) {
                if (weight) {
                    if (activity) {
                        if (type) {
                            if (meals) {
                                if (forwhat) {
                                    try {
                                        const response = await axios.post(`http://localhost:8080/api/bmranddiet?token=${token}`, data)
                                        const result = response.data
                                        const boldResult = result.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                        setOutput(boldResult) 
                                        //console.log(response.data)
                                    } catch (err) {
                                        alert(err.response.data.msg)
                                        //console.log(err)
                                    }
                                } else {
                                    alert("Enter the last input section")
                                }
                            } else {
                                alert("Enter no. of meals you want in a day")
                            }
                        } else {
                            alert("Enter a diet type")
                        }
                    } else {
                        alert("Enter your activity level")
                    }
                } else {
                    alert("Enter your weight")
                }
            } else {
                alert("Enter your height")
            }
        } else {
            alert("Enter your age")
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
        <div className="apipage" >
            <div className="apinavbar"><NavBar /></div>
            <div className="apibox"><div>
                <div className="apiheading">Create your personal Diet plan</div>
                <input className="inputboxapi" placeholder="Age" type="text" value={age} onChange={ageHandler}></input>
                <input className="inputboxapi" placeholder="Height in cm" type="number" value={height} onChange={heightHandler}></input>
                <input className="inputboxapi" placeholder="Weight in kg" type="number" value={weight} onChange={weightHandler}></input>
                <input className="inputboxapi" placeholder="Activity" type="text" value={activity} onChange={activityHandler}></input>
                <input className="inputboxapi" placeholder="Veg,Non-veg,Vegan,Etc" type="text" value={type} onChange={typeHandler}></input>
                <input className="inputboxapi" placeholder="Number of meals" type="number" value={meals} onChange={mealsHandler}></input>
                <input className="inputboxapi" placeholder="Food items you dont want" type="text" value={exception} onChange={exceptionHandler}></input>
                <input className="inputboxapi" placeholder="Fatloss,Musclegain,etc" type="text" value={forwhat} onChange={forwhatHandler}></input>
                <button className="inputboxapi" id="createbtn" onClick={sendReq}>Create</button>
                <button className="inputboxapi" id="servicebtn" onClick={() => { navigate("/services") }}>Search food</button>
            </div>
            </div>
            <div className="apioutput"><pre dangerouslySetInnerHTML={{ __html: output }}></pre></div>
        </div>
    </div>
}

