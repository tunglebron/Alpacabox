import "./navbar.scss";
import { ArrowDropDown } from "@material-ui/icons";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext/AuthContext";
import { logout } from "../../context/authContext/AuthActions";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <img
            alt=""
            src="https://firebasestorage.googleapis.com/v0/b/alpacabox-fb0fd.appspot.com/o/images%2Falpacabox_logo.svg?alt=media&token=d9f2fa78-c55d-4867-ba1e-5a041b1a1abc"
            onClick={() => {
              navigate("/");
            }}
          />
          <Link to="/" className="link">
            <span>Homepage</span>
          </Link>
          <Link to="/series" className="link">
            <span className="navbarmainLinks">Series</span>
          </Link>
          <Link to="/movies" className="link">
            <span className="navbarmainLinks">Movies</span>
          </Link>
          <Link to="/mylist" className="link">
            <span className="navbarmainLinks">My Lists</span>
          </Link>
        </div>
        <div className="right">
          <Link to="/profile" className="link">
            <img
              src={
                user.profilePic ||
                "https://img.freepik.com/free-vector/cute-business-llama-icon-illustration-alpaca-mascot-cartoon-character-animal-icon-concept-isolated_138676-989.jpg"
              }
              alt=""
            />
          </Link>
          <div className="profile">
            <ArrowDropDown className="icon" />
            <div className="options">
              <span onClick={handleLogout}>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
