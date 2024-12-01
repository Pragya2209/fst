import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signin } from "../apis/auth";
import { isValidEmail, isValidPassword } from "../utils";
import { Input, CustomButton, CustomAlert, Loader } from "../components";
import { Typography, Link } from "@mui/material";
import {formStyles} from "../styles";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false)
  
  const handleLogin = async () => {
    try {
      setLoader(true)
      setError(null)
      if (!isValidEmail(email)) {
        setError("Invalid email address.");
        setLoader(false)
        return;
      }
      if (!isValidPassword(password)) {
        setError("Password must be between 8 and 16 characters and include at least one number, one letter, and one special character.");
        setLoader(false)
        return;
      }
      const response = await signin({ email, password });
      if (response.code === 200) {
        const { accessToken } = response.data;
        localStorage.setItem("authToken", accessToken);
        window.location.reload(); 
      }
      else {
        setError(response?.message || "Invalid credentials!");
      }
    } catch (err) {
      setError(err.message || "Invalid credentials!");
    }
    finally {
      setLoader(false)

    }
  };

  return (
    <div style={formStyles.container}>
      <div style={formStyles.formContainer}>
        <Typography variant="h4" gutterBottom>
          Login</Typography>
          {loader && <Loader />}
        {error && <CustomAlert message={error} />}
        <Input label="Email" value={email} margin="normal" fullWidth onChange={(e) => setEmail(e.target.value)} />
        <Input label="Password" type="password" margin="normal" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />
        <CustomButton label="Login" margin="normal" fullWidth onClick={handleLogin} />
        <Typography style={formStyles.switch}>
          Are you a new user?{" "}
          <Link href="/signup" style={{ textDecoration: "none" }}>
            Sign Up
          </Link>
        </Typography>
      </div>
    </div>
  );
}

export default Login;
