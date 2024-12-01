import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const Input = ({
  label,
  value,
  onChange,
  type = "text",
  error,
  helperText,
  ...props
}) => {

  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      type={isPassword && showPassword ? "text" : type}
      error={!!error}
      helperText={helperText}
      InputProps={{
        endAdornment: isPassword ? (
          <InputAdornment position="end">
            <IconButton
              onClick={togglePasswordVisibility}
              edge="end"
              aria-label="toggle password visibility"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ) : null,
      }}
      {...props}
    />
  );
};