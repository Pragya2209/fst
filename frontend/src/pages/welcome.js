import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { CustomButton, Loader } from "../components";
import { fetchUserDetails } from "../redux/actions/user";
import { Box, Typography } from "@mui/material";
import { welcomeStyles } from "../styles/welcome";

function Welcome(props) {
  useEffect(() => {
    props.fetchUserDetails()
  }, [props.fetchUserDetails]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.reload()
  };

  const displayName = (name = "") => {
    if (name && name.length) {
      return name.charAt(0).toUpperCase() + name.slice(1);
    }
  }
  if (!props?.user?.user?.name) {
    return <Loader/>
  }
  return (
    <Box
    style={welcomeStyles.conteianerBox}
  >
    <Typography
      variant="h4"
      style={welcomeStyles.headerText}
    >
      Welcome to the application, {displayName(props.user.user.name)}!
    </Typography>

    <CustomButton
      label="Logout"
      onClick={handleLogout}
    />
  </Box>
  );
}


const mapStateToProps = (state) => ({
  user: state.user,
});
export default connect(mapStateToProps, { fetchUserDetails })(Welcome);
