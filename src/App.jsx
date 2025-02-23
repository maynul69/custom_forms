import { BrowserRouter, Route, Routes, Navigate, Outlet } from "react-router-dom";
import Home from "./Pages/Home";
import Admin from "./Pages/Admin";
import Login from "./Pages/Login";
import Registration from "./Pages/Registration";
import UserProfile from "./Pages/UserProfile";
import Templates from "./Pages/Templates";
import CreateTemplate from "./Pages/CreateTemplate";

import './App.css';
import SingleForm from "./Pages/SingleForm";
import EditQuestion from "./Pages/EditQuestion";
import Response from "./Pages/Response";
import RecentTemp from "./Components/RecentTemp";


// Private Route Component
const PrivateRoute = () => {
  const token = localStorage.getItem("token"); // Check if user is authenticated
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <BrowserRouter>

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reg" element={<Registration />} />

        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/admin" element={<Admin />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/recentTemp" element={<RecentTemp />} />
          <Route path="/createtemp/:id" element={<CreateTemplate />} />
          <Route path="/form/:id" element={<SingleForm/>} />
          <Route path="/edit-question/:id" element={<EditQuestion />} />
          <Route path="/response/:id" element={<Response/>} />
          {/* <Route path="/create-template/:id" element={<CreateTemplate />} /> */}
          <Route path="/profile" element={<UserProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
 