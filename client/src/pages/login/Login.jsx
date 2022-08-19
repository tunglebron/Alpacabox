import { AuthContext } from "../../context/authContext/AuthContext";
import { login } from "../../context/authContext/apiCalls";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./login.scss";
import { useEffect } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useState } from "react";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Login() {
  const { dispatch, error } = useContext(AuthContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      setOpen(true);
    }
  }, [error])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    login({ email: data.email, password: data.password }, dispatch);
  };

  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://firebasestorage.googleapis.com/v0/b/alpacabox-fb0fd.appspot.com/o/images%2Falpacabox_logo.svg?alt=media&token=d9f2fa78-c55d-4867-ba1e-5a041b1a1abc"
            alt=""
          />
        </div>
      </div>
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Sign In</h1>
          {errors.email && <span className="error">Email/Username is required</span>}
          <input
            type="text"
            placeholder="Email/Username"
            {...register("email", {
              required: true,
              //pattern: /^\S+@\S+$/i,
            })}
          />
          {errors.password && (
            <span className="error">Password is required</span>
          )}
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
          />
          <button className="loginButton" type="submit">
            Sign In
          </button>
          <span>
            New to Alpacabox?{" "}
            <b style={{ cursor: "pointer" }} onClick={() => {navigate("/register")}}>
              Sign up now.
            </b>
          </span>
          {/* <small>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. <b>Learn more</b>.
          </small> */}
        </form>
      </div>
      <div className="toastDiv" style={{ display: open ? "block" : "none" }}>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error">
            Email/Username or password is not correct!
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}
