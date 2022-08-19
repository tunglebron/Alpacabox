import axios from "axios";
import {
  createListFailure,
  createListStart,
  createListSuccess,
  deleteListFailure,
  deleteListStart,
  deleteListSuccess,
  getListsFailure,
  getListsStart,
  getListsSuccess,
  updateListStart,
  updateListSuccess,
  updateListFailure,
  getSingleListFailure,
  getSingleListStart,
  getSingleListSuccess
} from "./ListActions";

export const getLists = async (dispatch) => {
  dispatch(getListsStart());
  try {
    const res = await axios.get(global.proxy + "lists/all", {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    const data = res.data.result.data;
    dispatch(getListsSuccess(data));
  } catch (err) {
    dispatch(getListsFailure());
  }
};

//create
export const createList = async (list, dispatch) => {
  dispatch(createListStart());
  try {
    const res = await axios.post(global.proxy + "lists", list, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    const data = res.data.result.data;
    dispatch(createListSuccess(data));
  } catch (err) {
    dispatch(createListFailure());
  }
};

//delete
export const deleteList = async (id, dispatch) => {
  dispatch(deleteListStart());
  try {
    await axios.delete(global.proxy + "lists/" + id, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(deleteListSuccess(id));
  } catch (err) {
    dispatch(deleteListFailure());
  }
};

//update
export const updateList = async (id, list, dispatch) => {
  dispatch(updateListStart());
  try {
    const res = await axios.put(global.proxy + "lists/" + id, list, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    const data = res.data.result.data;
    dispatch(updateListSuccess(data));
  } catch (err) {
    dispatch(updateListFailure());
  }
};

export const getSingleList = async (id, dispatch) => {
  dispatch(getSingleListStart());
  try {
    const res = await axios.get(global.proxy + "lists/find/" + id, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    const data = res.data.result.data;
    dispatch(getSingleListSuccess(data));
  } catch (err) {
    dispatch(getSingleListFailure());
  }
};