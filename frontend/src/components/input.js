import React from "react";
import TextField from "@mui/material/TextField";

export const Input = ({ label, value, onChange, type = "text", error, helperText, ...props }) => (
  <TextField
    label={label}
    value={value}
    onChange={onChange}
    type={type}
    error={!!error}
    helperText={helperText}
    {...props}
  />
);