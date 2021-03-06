import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Header from "./components/Header";
import Cookies from "js-cookie";
import NotMatch from "./pages/NotMatch";
import Publish from "./pages/Publish";
import Payment from "./pages/Payment";

const App = () => {
  const [token, setToken] = useState(Cookies.get("userToken") || null);

  const setUser = (token) => {
    if (token) {
      Cookies.set("userToken", token, { expires: 10 });
    } else {
      Cookies.remove("userToken");
    }
    setToken(token);
  };

  return (
    <Router>
      <Header token={token} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offer/:id" element={<Offer token={token} />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
        <Route
          path="/login"
          element={<Login setUser={setUser} token={token} />}
        />
        <Route path="/publish" element={<Publish token={token} />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="*" element={<NotMatch />} />
      </Routes>
    </Router>
  );
};

export default App;
