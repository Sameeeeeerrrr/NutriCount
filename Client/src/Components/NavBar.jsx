import { useNavigate } from "react-router-dom"
import "../Styles/Navbar.css"

export function NavBar(){
    const navigate = useNavigate()

    return <div className="nav">
        <h1><div className="nameparentdiv"><div className="name">NutriCount</div></div></h1>
        <div className="usernameNlogoutbtn"> 
        <div className="user">User : {localStorage.getItem("username")}</div>
        <div className="logout"><button className="logoutbtn" onClick={()=>{localStorage.removeItem("token");localStorage.removeItem("username");navigate("/")}}>Logout</button></div>
        </div>      
    </div>
}