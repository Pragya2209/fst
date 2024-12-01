import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/signin";
import Signup from "./pages/signup";
import Welcome from "./pages/welcome";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(token && token !== "undefined");
  }, []);

  return (
    <Router>
      <Routes>
        {
          isAuthenticated ? (
            <>
            <Route path="/welcome" element={<Welcome/>} />
            <Route path="*" element={<Navigate to="/welcome" />} />
            </>
          ) : (
            <>
            <Route path="/" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="*" element={<Navigate to="/" />} />
            </>
          )
        }
      </Routes>
    </Router>
  );
}

export default App;
