import "./app.scss";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Watch from "./pages/watch/Watch";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthContext } from "./context/authContext/AuthContext";
import { useContext } from "react";
import Profile from "./pages/profile/Profile";

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={user ? <Home /> : <Navigate to="/register" replace />}
        ></Route>
        <Route
          path="/movies"
          element={
            user ? <Home type="movie" /> : <Navigate to="/register" replace />
          }
        ></Route>
        <Route
          path="/series"
          element={
            user ? <Home type="series" /> : <Navigate to="/register" replace />
          }
        ></Route>
        <Route
          path="/mylist"
          element={
            user ? <Home view="mylist" /> : <Navigate to="/register" replace />
          }
        ></Route>
        <Route
          path="/watch"
          element={user ? <Watch /> : <Navigate to="/register" replace />}
        ></Route>
        <Route
          path="/profile"
          element={user ? <Profile /> : <Navigate to="/register" replace />}
        ></Route>
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" replace />}
        ></Route>
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" replace />}
        ></Route>
      </Routes>
    </Router>
  );
};

export default App;
