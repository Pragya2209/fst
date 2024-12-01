import React from "react";
import Button from "@mui/material/Button";

export const CustomButton = ({ onClick, label, variant = "contained", ...props }) => (
  <Button onClick={onClick} variant={variant} {...props}>
    {label}
  </Button>
);
