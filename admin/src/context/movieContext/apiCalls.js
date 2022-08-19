import axios from "axios";
import {
  createMovieFailure,
  createMovieStart,
  createMovieSuccess,
  deleteMovieFailure,
  deleteMovieStart,
  deleteMovieSuccess,
  getMoviesFailure,
  getMoviesStart,
  getMoviesSuccess,
  updateMovieStart,
  updateMovieSuccess,
  updateMovieFailure,
  getSingleMovieFailure,
  getSingleMovieStart,
  getSingleMovieSuccess
} from "./MovieActions";

export const getMovies = async (dispatch) => {
  dispatch(getMoviesStart());
  try {
    const res = await axios.get(global.proxy + "movies", {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    const data = res.data.result.data;
    dispatch(getMoviesSuccess(data));
  } catch (err) {
    dispatch(getMoviesFailure());
  }
};

//create
export const createMovie = async (movie, dispatch) => {
  dispatch(createMovieStart());
  try {
    const res = await axios.post(global.proxy + "movies", movie, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    const data = res.data.result.data;
    dispatch(createMovieSuccess(data));
  } catch (err) {
    dispatch(createMovieFailure());
  }
};

//delete
export const deleteMovie = async (id, dispatch) => {
  dispatch(deleteMovieStart());
  try {
    await axios.delete(global.proxy + "movies/" + id, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(deleteMovieSuccess(id));
  } catch (err) {
    dispatch(deleteMovieFailure());
  }
};

//update
export const updateMovie = async (id, movie, dispatch) => {
  dispatch(updateMovieStart());
  try {
    const res = await axios.put(global.proxy + "movies/" + id, movie, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    const data = res.data.result.data;
    dispatch(updateMovieSuccess(data));
  } catch (err) {
    dispatch(updateMovieFailure());
  }
};

export const getSingleMovie = async (id, dispatch) => {
  dispatch(getSingleMovieStart());
  try {
    const res = await axios.get(global.proxy + "movies/find/" + id, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    const data = res.data.result.data;
    dispatch(getSingleMovieSuccess(data));
  } catch (err) {
    dispatch(getSingleMovieFailure());
  }
};