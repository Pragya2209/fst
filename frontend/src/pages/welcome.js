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
      Welcome to the application, {props.user.user.name && props.user.user.name.toUpperCase()}!
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
