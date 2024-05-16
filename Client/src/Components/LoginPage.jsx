import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../Styles/Login.css"
import backgroundImage from "../assets/4452328.jpg"
import Logo from "../assets/Logo.jpg"
import { LINK } from "../App"

export function LoginPage() {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

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
            username: username,
            password: password
        }
        if (username && password) {
            try {
                const response = await axios.post(`${LINK}/api/login`, data)
                if (response.status === 200) {
                    localStorage.setItem("token", response.data.token)
                    localStorage.setItem("username", response.data.usernameWithoutExtraSpaces)
                    navigate("/services")
                }
            } catch (err) {
                alert(err.response.data.msg)
                //console.log(err)
            }
        } else {
            alert("Please enter both username and password.")
        }
    }

    return (
        <div
            style={{
                backgroundImage: `url(${backgroundImage})`, // Apply background image
                backgroundSize: 'cover', // Adjust the size of the image to cover the entire container
                backgroundPosition: 'center', // Center the image
                width: '100vw', // Full width
                height: '100vh', // Full height
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            
            <div className="loginpage">
            
                <div className="loginbox">
                <img src={Logo}></img>
                    <h1><div className="logo">Login to your account</div></h1>
                    <input className="username" placeholder="Username" type="text" value={username} onChange={usernameHandler} />
                    <br />

                    <input className="password" placeholder="Password" type={showPassword ? 'text' : 'password'} value={password} onChange={passwordHandler} />
                    <button className="see-password" onClick={togglePasswordVisibility}>{showPassword ? `Hide` : `Show`}</button>
                    
                    <br />
                    <button className="loginbtn" onClick={sendReq}>Log in</button>
                    <div className="signupbtnbox">
                        Don't have an account? <span className="signupbtn" onClick={() => { navigate("/signup") }} style={{ cursor: "pointer" }}>Sign up</span>
                    </div>
                </div>
            </div>
        </div>
    )
}


