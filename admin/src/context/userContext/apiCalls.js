import axios from "axios";
import {
  createUserFailure,
  createUserStart,
  createUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  getUsersFailure,
  getUsersStart,
  getUsersSuccess,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  getSingleUserFailure,
  getSingleUserStart,
  getSingleUserSuccess
} from "./UserActions";

//get all
export const getUsers = async (dispatch) => {
  dispatch(getUsersStart());
  try {
    const res = await axios.get(global.proxy + "users", {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    const data = res.data.result.data;
    dispatch(getUsersSuccess(data));
  } catch (err) {
    dispatch(getUsersFailure());
  }
};

//create
export const createUser = async (user, dispatch) => {
  dispatch(createUserStart());
  try {
    const res = await axios.post(global.proxy + "auth/register", user, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    const data = res.data.result.data;
    dispatch(createUserSuccess(data));
  } catch (err) {
    dispatch(createUserFailure());
  }
};

//delete
export const deleteUser = async (id, user, dispatch) => {
  dispatch(deleteUserStart());
  try {
    await axios.delete(global.proxy + "users/" + id, user, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(deleteUserSuccess(id));
  } catch (err) {
    dispatch(deleteUserFailure());
  }
};

//update
export const updateUser = async (id, user, dispatch) => {
  dispatch(updateUserStart());
  try {
    const res = await axios.put(global.proxy + "users/" + id, user, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    const data = res.data.result.data;
    dispatch(updateUserSuccess(data));
  } catch (err) {
    dispatch(updateUserFailure());
  }
};

export const getSingleUser = async (id, dispatch) => {
  dispatch(getSingleUserStart());
  try {
    const res = await axios.get(global.proxy + "users/find/" + id, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    const data = res.data.result.data;
    dispatch(getSingleUserSuccess(data));
  } catch (err) {
    dispatch(getSingleUserFailure());
  }
};