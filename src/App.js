import "./App.css";
import Homepage from "./components/Homepage/Homepage";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Shared/Login/Login";
import Register from "./components/Shared/Register/Register";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { selectUserEmail } from "./features/userSlice";

function App() {
  const [userInfo, setUserInfo] = useState(null);
  const userEmail = useSelector(selectUserEmail);
  const [open, setOpen] = useState({ show: false, type: "", message: "" });
  useEffect(() => {
    setUserInfo(Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null);
  }, []);
  return (
    <BrowserRouter>
      <Navbar open={open} setOpen={setOpen} />
      <Routes>
        {userInfo?.useremail || userEmail ? (
          <Route
            path="/"
            element={<Homepage open={open} setOpen={setOpen} />}
          />
        ) : (
          <Route path="/" element={<Login open={open} setOpen={setOpen} />} />
        )}
        <Route
          path="/register"
          element={<Register open={open} setOpen={setOpen} />}
        />
        {/* <Route
          exact
          path="/"
          element={
            <PrivateRoute>
              <Homepage />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
