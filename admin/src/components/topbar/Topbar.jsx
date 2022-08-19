import React, { useEffect } from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/authContext/AuthContext";
import { logout } from "../../context/authContext/AuthActions";

export default function Topbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const history = useHistory();
  const [img, setImg] = React.useState(
    "https://i.pinimg.com/736x/3b/6f/fb/3b6ffbdc2ef00f64bd7484c15801bcb9.jpg"
  );
  const { user, dispatch } = React.useContext(AuthContext);

  useEffect(() => {
    if (user.hasOwnProperty("profilePic")) setImg(user.profilePic);
  }, [user]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    dispatch(logout());
  };

  const handleProfile = () => {
    handleClose();
    history.push("/user/" + user._id);
  };

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span
            className="logo"
            onClick={() => {
              history.push("/");
            }}
          >
            alpacabox
          </span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer" style={{ display: "none" }}>
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer" style={{ display: "none" }}>
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer" style={{ display: "none" }}>
            <Settings />
          </div>

          <Toolbar>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              PaperProps={{
                style: {
                  marginTop: "30px",
                },
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleProfile}>Profile</MenuItem>
              <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
            </Menu>
          </Toolbar>

          <div className="topbarIconContainer">
            <img src={img} alt="" className="topAvatar" onClick={handleMenu} />
          </div>
        </div>
      </div>
    </div>
  );
}
