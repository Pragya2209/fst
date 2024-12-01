import types from "../types";
import { getUserDetails } from "../../apis/user";

export const fetchUserDetails = () => async (dispatch) => {
    const response = await getUserDetails();
    const data = response.data.user
    dispatch({ type: types.GET_USER_DETAIL, payload: data });
  };