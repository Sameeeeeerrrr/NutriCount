import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { NavBar } from "../NavBar"
import backgroundImage from "../../assets/4452328.jpg"
import "./Service.css"


export function ServicesPage() {
    const [page, setPage] = useState(<Viewallitems />)
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
                //console.log(err)
            }
        }
        checkin()
    }, [])

    const [food, SetFood] = useState("")
    const [amount, Setamount] = useState("")
    const foodHandler = (e) => {
        SetFood(e.target.value)
    }
    const amountHandler = (e) => {
        Setamount(e.target.value)
    }
    const sendReq = async () => {
        if (food == "") {
            alert("enter a food item")
        } else {
            try {
                const data = { food: food, amount: amount }
                const response = await axios.post(`http://localhost:8080/api/find?token=${token}`, data)
                const output = response.data.Fooditem
                //console.log(response)
                setPage(<>
                    <h3><p>Food: {output.food}</p></h3>
                    <p>Calories: {output.calories + "cal"}</p>
                    <p>Protein: {output.protein + "g"}</p>
                    <p>Carbs: {output.carbs + "g"}</p>
                    <p>Fats:  {output.fats + "g"}</p>
                    <p>Fibre: {output.fibre + "g"}</p>
                </>
                )
            } catch (err) {
                alert(err.response.data.msg)
                //console.log(err)
            }
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
    }}><div className="servicepage">
            <div className="navbarServicepage"><NavBar/></div>
            <div className="servicebox">
                <div className="heading">Search for food items</div>
                <div className="searchbar">
                    <input className="fooditem" type="text" placeholder="food item" value={food} onChange={foodHandler}></input>
                    <input className="amount" type="number" placeholder="amount in gram" value={amount} onChange={amountHandler}></input>
                    <button className="findbtn" onClick={sendReq}>Find Food item</button>
                </div>
                <div><div className="outputbox">{page}</div></div>
                <div className="buttons">
                    <button className="dietpagebtn" onClick={() => { navigate("/api") }}>Make your custom diet plan</button>
                    <button className="addpagebtn" onClick={() => { navigate("/services/add") }}>Add food item</button>
                </div>
            </div>
        </div>
    </div>

}

function Viewallitems() {
    const [items, setItems] = useState([])

    useEffect(() => {
        async function run() {
            const token = localStorage.getItem("token")
            const response = await axios.get(`http://localhost:8080/api/all?token=${token}`)
            const output = response.data.fooditem
            setItems(output)
            console.log(response)
        }
        run()
    }, [])

    return <div className="viewitems">
        {items.map(item => (
            <div key={item._id}>
                <h3><p>Food: {item.food}</p></h3>
                <p>Calories: {item.calories + "cal"}</p>
                <p>Protein: {item.protein + "g"}</p>
                <p>Carbs: {item.carbs + "g"}</p>
                <p>Fats: {item.fats + "g"}</p>
                <p>Fibre: {item.fibre + "g"}</p>
                <div>-----------------------------------------------------</div>
            </div>
        ))}
    </div>
}
