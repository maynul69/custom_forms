import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./Pages/Home";
import Admin from "./Pages/Admin";
import Login from "./Pages/Login";

import Registration from "./Pages/Registration";
import UserProfile from "./Pages/UserProfile";
import Templates from "./Pages/Templates";
import CreateTemplate from "./Pages/CreateTemplate";


function App() {
  

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/login" element={<Login />} />
      <Route path="/templates" element={<Templates />} />
      <Route path="/createtemp" element={<CreateTemplate />} />
      <Route path="/reg" element={<Registration/>} />
      <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
