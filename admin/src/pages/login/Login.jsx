import React, { useContext, useState } from "react";
import { login } from "../../context/authContext/apiCalls";
import { AuthContext } from "../../context/authContext/AuthContext";
import "./login.css";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useEffect } from "react";

const Particle = () => {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const options = {
    fpsLimit: 60,
    fullScreen: { enable: true },
    particles: {
      number: {
        value: 50,
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: 0.5,
      },
      size: {
        value: 400,
        random: {
          enable: true,
          minimumValue: 200,
        },
      },
      move: {
        enable: true,
        speed: 10,
        direction: "top",
        outModes: {
          default: "out",
          top: "destroy",
          bottom: "none",
        },
      },
    },
    interactivity: {
      detectsOn: "canvas",
      events: {
        resize: true,
      },
    },
    detectRetina: true,
    themes: [
      {
        name: "light",
        default: {
          value: true,
          mode: "light",
        },
        options: {
          background: {
            color: "#f7f8ef",
          },
          particles: {
            color: {
              value: ["#5bc0eb", "#fde74c", "#9bc53d", "#e55934", "#fa7921"],
            },
          },
        },
      },
      {
        name: "dark",
        default: {
          value: true,
          mode: "dark",
        },
        options: {
          background: {
            color: "#080710",
          },
          particles: {
            color: {
              value: ["#004f74", "#5f5800", "#245100", "#7d0000", "#810c00"],
            },
          },
        },
      },
    ],
    emitters: {
      direction: "top",
      position: {
        x: 50,
        y: 150,
      },
      rate: {
        delay: 0.2,
        quantity: 2,
      },
      size: {
        width: 100,
        height: 0,
      },
    },
  };

  return (
    <Particles
      init={particlesInit}
      options={options}
      shouldComponentUpdate={() => {
        return false;
      }}
    />
  );
};

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isFetching, dispatch, error } = useContext(AuthContext);

  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");

  useEffect(() => {
    if (error) {
      handleClick();
      setMessage("Login failed");
    }
  }, [error])

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (email !== "" && password !== "") {
      login({ email, password }, dispatch);
    } else {
      handleClick();
      setMessage("Email or password is empty!");
    }
  };

  return (
    <>
      <div className="login-box">
        <h2>Login</h2>
        <form>
          <div className="user-box">
            <input
              type="text"
              className="loginInput"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Email/Username</label>
          </div>
          <div className="user-box">
            <input
              type="password"
              className="loginInput"
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
          </div>
          <div className="center">
            <button onClick={handleLogin} disabled={isFetching}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Submit
            </button>
          </div>
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
            {message}
          </Alert>
        </Snackbar>
      </div>
    </>
  );
};

export default function Login() {
  return (
    <div className="login">
      <Particle />
      <LoginForm />
    </div>
  );
}
