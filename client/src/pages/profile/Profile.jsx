import React from "react";
import { useState } from "react";
import { useContext } from "react";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { AuthContext } from "../../context/authContext/AuthContext";
import "./profile.scss";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import DeleteIcon from "@material-ui/icons/Delete";

const UpdateInformation = () => {
  return <>This site is under construction</>;
};

const UpdatePassword = () => {
  return <>This site is under construction</>;
};

const DeleteAccount = () => {
  return <>This site is under construction</>;
};

export default function Profile() {
  const [settingMode, setSettingMode] = useState(0);
  const { user } = useContext(AuthContext);

  return (
    <div className="edit-profile">
      <Navbar />
      <div className="main">
        <div className="left">
          <img
            src={
              user.profilePic ||
              "https://img.freepik.com/free-vector/cute-business-llama-icon-illustration-alpaca-mascot-cartoon-character-animal-icon-concept-isolated_138676-989.jpg"
            }
            alt=""
            className="user-icon"
          />
          <div className="username">{user.username}</div>
          <div className="settings">
            <div
              className={"setting top " + (settingMode === 1 ? "selected" : "")}
              onClick={() => setSettingMode(1)}
            >
              <AccountCircleIcon />
              <div className="settingTitle">Change Information</div>
            </div>
            <div
              className={
                "setting bottom " + (settingMode === 2 ? "selected" : "")
              }
              onClick={() => setSettingMode(2)}
            >
              <VpnKeyIcon />
              <div className="settingTitle">Change Password</div>
            </div>
          </div>
          <div className="settings">
            <div
              className={
                "setting top bottom warning " +
                (settingMode === 3 ? "selected" : "")
              }
              onClick={() => setSettingMode(3)}
            >
              <DeleteIcon />
              <div className="settingTitle">Delete Account</div>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="right-top">
            {settingMode === 1
              ? "Information"
              : settingMode === 2
              ? "Password"
              : settingMode === 3
              ? "Delete Account"
              : ""}
          </div>
          <div className="right-bottom">
            <div className="bottom-left"></div>
            <div className="bottom-right">
              {settingMode === 1 ? (
                <UpdateInformation />
              ) : settingMode === 2 ? (
                <UpdatePassword />
              ) : settingMode === 3 ? (
                <DeleteAccount />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
