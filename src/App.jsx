import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./Pages/Home";
import Admin from "./Pages/Admin";
import Login from "./Pages/Login";
import Template from "./Pages/Template";
import Registration from "./Pages/Registration";
import UserProfile from "./Pages/UserProfile";


function App() {
  

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/login" element={<Login />} />
      <Route path="/template" element={<Template />} />
      <Route path="/reg" element={<Registration/>} />
      <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
