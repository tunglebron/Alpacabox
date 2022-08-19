import jwt_decode from "jwt-decode";
import AuthReducer from "./AuthReducer";
import { createContext, useEffect, useReducer } from "react";

const init = () => {

  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    const token = user.accessToken;
    const decodedToken = jwt_decode(token);
    let currentDate = new Date();

    // JWT exp is in seconds
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      localStorage.removeItem('user');
      return {
        user: null,
        isFetching: false,
        error: false,
      }
    } else {
      return {
        user: JSON.parse(localStorage.getItem("user")),
        isFetching: false,
        error: false,
      }
    }
  } else {
    return {
      user: null,
      isFetching: false,
      error: false,
    }
  }
}

export const AuthContext = createContext(init());

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, init());

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

