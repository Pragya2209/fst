import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Link } from "@mui/material";
import { isValidEmail, isValidPassword } from "../utils";
import { signup } from "../apis/auth";
import { Input, CustomButton, CustomAlert, Loader} from "../components";
import { formStyles } from "../styles";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = React.useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loader, setLoader] = useState(false)
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      setLoader(true)
      setError(null)
      if (!email || !password || !name) {
        setError("All fields are required.");
        setLoader(false)
        return;
      }
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

      let response = await signup({ name, email, password });
      if (response.code === 200) {
        setError(null);
        setSuccessMessage("Signup successful! Please login.");
        setTimeout(() => {
          navigate('/')
        }, 1000);
      }
      else {
        setError(response.message || "Something went wrong!");
      }
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    finally {
      setLoader(false)
    }
  };

  return (
    <div style={formStyles.container}>
      <div style={formStyles.formContainer}>
        <Typography variant="h4" gutterBottom>Signup</Typography>
        {loader && <Loader />}
        {error && <CustomAlert message={error} />}
        {successMessage && <CustomAlert severity="success" message={successMessage} />}

        <Input label="Name"
          variant="outlined"
          margin="normal"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input label="Email"
          variant="outlined"
          margin="normal"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input label="Password" type="password"
          variant="outlined"
          margin="normal"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}

        />

        <CustomButton label="Signup"
          margin="normal" type="submit" fullWidth onClick={handleSubmit} />
        <Typography style={formStyles.switch}>
          Already exising?{" "}
          <Link href="/" style={{ textDecoration: "none" }}>
            Sign In
          </Link>
        </Typography>
      </div>
    </div>
  );
}

export default Signup;
