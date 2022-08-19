import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./AuthActions";

export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(global.proxy + "auth/login", user);
    const data = res.data.result.data;
    data.isAdmin && dispatch(loginSuccess(data));
  } catch (err) {
    dispatch(loginFailure());
  }
};