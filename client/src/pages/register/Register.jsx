import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.scss";
import { useForm } from "react-hook-form";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Register() {
  const [start, setStart] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleStart = () => {
    setStart(true);
  };

  const onSubmit = async (data) => {
    const res = await axios.post(global.proxy + "auth/register", {
      email: data.email,
      password: data.password,
      username: data.username,
      birthDate: data.birthDate,
    });
    if (res.data.code === 200) {
      setToastType("success");
      setMessage("Register success!");
      setOpen(true);
      setTimeout(() => {
        onClickLogin();
      }, 2000);
    } else {
      setToastType("error");
      setMessage(res.data.error || "Register fail!");
      setOpen(true);
    }
  };

  const onClickLogin = () => {
    navigate("/login");
  };

  const handleCloseToast = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://firebasestorage.googleapis.com/v0/b/alpacabox-fb0fd.appspot.com/o/images%2Falpacabox_logo.svg?alt=media&token=d9f2fa78-c55d-4867-ba1e-5a041b1a1abc"
            alt=""
          />
          <button className="loginButton" onClick={onClickLogin}>
            Sign In
          </button>
        </div>
      </div>
      <div className="container">
        {start ? (
          <>
            <form className="input" onSubmit={handleSubmit(onSubmit)}>
              <h1>Register</h1>
              {errors.email && <span className="error">Email is required</span>}
              <input
                type="email"
                placeholder="Email Address"
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
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
              {errors.username && (
                <span className="error">User name is required</span>
              )}
              <input
                type="text"
                placeholder="User name"
                {...register("username", { required: true })}
              />
              {errors.birthDate && (
                <span className="error">Birth Date is required</span>
              )}
              <input
                type="text"
                placeholder="Birth Date"
                {...register("birthDate", { required: true })}
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
              />
              <button className="registerButton" type="submit">
                Start
              </button>
            </form>
          </>
        ) : (
          <>
            <h1>Unlimited movies, TV shows, and more.</h1>
            <h2>Watch anywhere. Cancel anytime.</h2>
            <p>
              Ready to watch? Enter your email to create.
            </p>
            <button className="registerButton" onClick={handleStart}>
              Get Started
            </button>
          </>
        )}
      </div>
      <div>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          autoHideDuration={6000}
          onClose={handleCloseToast}
        >
          <Alert onClose={handleCloseToast} severity={toastType}>
            {message}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}
