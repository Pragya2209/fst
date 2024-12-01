import types from "../types";
import { getUserDetails } from "../../apis/user";

export const fetchUserDetails = () => async (dispatch) => {
  try {
    const response = await getUserDetails();
    if (response.code == 200) {
      const data = response.data.user
      dispatch({ type: types.GET_USER_DETAIL, payload: data });
    }
    else {
      localStorage.removeItem("authToken");
      window.location.reload();
      return;
    }
  }
  catch (error) {
    localStorage.removeItem("authToken");
    window.location.reload();
  }
};