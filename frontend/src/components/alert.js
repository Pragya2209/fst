import React from "react";
import Alert from "@mui/material/Alert";

export const CustomAlert = ({ message, severity = "error" }) => (
  <Alert severity={severity}>{message}</Alert>
);