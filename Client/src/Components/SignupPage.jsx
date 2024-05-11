import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import backgroundImage from "../assets/4452328.jpg"
import "../Styles/Signup.css"
import Logo from "../assets/Logo.jpg"

export function SigupPage() {
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate()

    function emailHandler(e) {
        setEmail(e.target.value)
    }
    function usernameHandler(e) {
        setUsername(e.target.value)
    }
    function passwordHandler(e) {
        setPassword(e.target.value)
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const sendReq = async () => {

        const data = {
            email: email,
            username: username,
            password: password
        }
        if (email) {
            if (username) {
                if (password) {
                    try {
                        const response = await axios.post("http://localhost:8080/api/signup", data)
                        if (response.status == 200) {
                            navigate("/")
                            alert("Your account has been created")
                        }
                    } catch (err) {
                        alert(err.response.data.msg)
                        //console.log(err)
                    }
                } else {
                    alert("enter your inputs")
                }
            } else {
                alert("enter your inputs")
            }
        } else {
            alert("enter your inputs")
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
        <div className="signuppage">
            <div className="signupbox">
            <img src={Logo}></img>
                <h1><div className="logo">Create Your Account</div></h1>
                <input className="email" type="text" value={email} onChange={emailHandler} placeholder="Email"></input><br></br>
                <input className="usernameS" type="text" value={username} onChange={usernameHandler} placeholder="Username"></input><br></br>
                <input className="password" placeholder="Password" type={showPassword ? 'text' : 'password'} value={password} onChange={passwordHandler} />
                    <button className="see-password" onClick={togglePasswordVisibility}>{showPassword ? `Hide` : `Show`}</button>
                <button className="signupbutton" onClick={sendReq}>Sign up</button>
            </div>
        </div>
    </div>
}