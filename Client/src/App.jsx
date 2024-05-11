import { BrowserRouter, Route, Routes } from "react-router-dom"
import { LoginPage } from "./Components/LoginPage"
import { SigupPage } from "./Components/SignupPage"
import { ServicesPage } from "./Components/ServicesPage/ServicesPage"
import { ApiPage } from "./Components/ApiPage/ApiPage"
import { AddItemPage } from "./Components/ServicesPage/AddItemsPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SigupPage />}></Route>
        <Route path="/services" element={<ServicesPage />}></Route>
        <Route path="/api" element={<ApiPage />}></Route>
        <Route path="/services/add" element={<AddItemPage/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
