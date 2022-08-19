import {
  CalendarToday,
  MailOutline,
  PermIdentity,
  Publish,
} from "@material-ui/icons";
import storage from "../../firebase";
import { useHistory, useLocation } from "react-router-dom";
import "./user.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext/UserContext";
import { getSingleUser, updateUser } from "../../context/userContext/apiCalls";
import LoaderSpinner from "../../components/loaderSpinner/LoaderSpinner";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

var formatDateToString = (date) => {
  let newDate = null;

  if (typeof date === "string") {
    let toDate = new Date(Date.parse(date));

    const yyyy = toDate.getFullYear();
    let mm = toDate.getMonth() + 1; // Months start at 0!
    let dd = toDate.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    newDate = dd + "/" + mm + "/" + yyyy;
  }

  return newDate;
};

var formatDate = (date) => {
  let newDate = date;

  if (typeof date === "string") {
    if (date.length > 10) {
      let toDate = new Date(Date.parse(date));

      const yyyy = toDate.getFullYear();
      let mm = toDate.getMonth() + 1; // Months start at 0!
      let dd = toDate.getDate();

      if (dd < 10) dd = "0" + dd;
      if (mm < 10) mm = "0" + mm;

      newDate = yyyy + "-" + mm + "-" + dd;
      //newDate = new Date(Date.parse(newDate));
      //console.log(toDate)
    }
  }

  return newDate;
};

const UserShow = ({ user }) => {
  return (
    <>
      <div className="userShow">
        <div className="userShowTop">
          <img
            src={
              user.profilePic ||
              "https://m.media-amazon.com/images/I/71v1cI2gm2L._AC_SL1500_.jpg"
            }
            alt=""
            className="userShowImg"
          />
          <div className="userShowTopTitle">
            <span className="userShowUsername">{user.username || ""}</span>
          </div>
        </div>
        <div className="userShowBottom">
          <span className="userShowTitle">User Details</span>
          <div className="userShowInfo">
            <PermIdentity className="userShowIcon" />
            <span className="userShowInfoTitle">{user.username || ""}</span>
          </div>
          <div className="userShowInfo">
            <CalendarToday className="userShowIcon" />
            <span className="userShowInfoTitle">
              {user.birthDate && <>{formatDateToString(user.birthDate)}</>}
            </span>
          </div>
          <div className="userShowInfo">
            <MailOutline className="userShowIcon" />
            <span className="userShowInfoTitle">{user.email || ""}</span>
          </div>
        </div>
      </div>
    </>
  );
};

const UserUpdate = ({ user, setUser, handleSubmit }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    if (
      user.username !== null &&
      user.email !== null &&
      user.isAdmin !== null
    )
      setUpdate(true);
    else setUpdate(false);
  }, [user]);

  const handleChange = (e) => {
    const value = e.target.value;
    setUser({ ...user, [e.target.name]: value });
  };

  const upload = async (items) => {
    items.forEach((item) => {
      if (item.file !== null && item.singleFile) {
        const fileName = new Date().getTime() + item.label + item.file.name;

        const storageRef = ref(storage, `/movies/${user.username}/${fileName}`);

        const uploadTask = uploadBytesResumable(storageRef, item.file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              setUser((prev) => {
                return { ...prev, [item.label]: url };
              });
              setUploaded(true);
            });
          }
        );
      }
    });
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    upload([{ file: profilePic, label: "profilePic", singleFile: true }]);
  };

  return (
    <div className="userUpdate">
      <span className="userUpdateTitle">Edit</span>
      <form className="userUpdateForm">
        <div className="userUpdateLeft">
          <div className="userUpdateItem">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="User Name"
              className="userUpdateInput"
              value={user.username || ""}
              onChange={handleChange}
            />
          </div>
          <div className="userUpdateItem">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="userUpdateInput"
              value={user.email || ""}
              onChange={handleChange}
            />
          </div>
          <div className="userUpdateItem">
            <label>Birth Date</label>
            {user.birthDate && (
              <input
                type="date"
                name="birthDate"
                className="userUpdateInput"
                value={formatDate(user.birthDate) || ""}
                onChange={(e) => {
                  setUser({ ...user, birthDate: e.target.value });
                }}
              />
            )}
          </div>
        </div>
        <div className="userUpdateRight">
          <div className="userUpdateUpload">
            <img
              className="userUpdateImg"
              style={{minWidth: '100px'}}
              src={
                user.profilePic ||
                "https://m.media-amazon.com/images/I/71v1cI2gm2L._AC_SL1500_.jpg"
              }
              alt=""
            />
            <label className="labelUpload" htmlFor="profilePic">
              <Publish className="userUpdateIcon" />
              <span className="shortSpan">
                {profilePic ? profilePic.name : "Choose File"}
              </span>
            </label>
            <input
              type="file"
              id="profilePic"
              style={{ display: "none" }}
              onChange={(e) => {
                setProfilePic(e.target.files[0]);
              }}
              disabled={uploaded ? true : false}
            />
          </div>
          {profilePic && !uploaded ? (
            <button className="movieButton" onClick={handleUpload}>
              Upload
            </button>
          ) : (
            <>
              {update && (
                <button className="userUpdateButton" onClick={handleSubmit}>
                  Update
                </button>
              )}
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default function User() {
  const { singleUser, dispatch, isFetching } = useContext(UserContext);
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const pathname = location.pathname;

    const fields = pathname.split("/");

    getSingleUser(fields[2], dispatch);
  }, [dispatch, location.pathname]);

  useEffect(() => {
    async function tempSetUser() {
      setUser(singleUser);
    }
    async function setState() {
      await tempSetUser();
    }
    setState();
  }, [singleUser]);

  useEffect(() => {
    if (isFetching) {
      setLoading(true);
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [isFetching]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(user._id, user, dispatch);
    history.push("/users");
  };

  return (
    <div className="user">
      {user && !loading ? (
        <>
          <div className="userTitleContainer">
            <h1 className="userTitle">Edit User</h1>
          </div>
          <div className="userContainer">
            <UserShow user={user} />
            <UserUpdate
              user={user}
              setUser={setUser}
              handleSubmit={handleSubmit}
            />
          </div>
        </>
      ) : (
        <div style={{ height: "calc(85vh)" }}>
          <LoaderSpinner size={120} />
        </div>
      )}
    </div>
  );
}
