import { useContext, useEffect, useState } from "react";
import "./newUser.css";
import Select from "react-select";
import storage from "../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useHistory } from "react-router-dom";
import { createUser } from "../../context/userContext/apiCalls";
import { UserContext } from "../../context/userContext/UserContext";

const isAdminOptions = [
  { value: "true", label: "Admin" },
  { value: "false", label: "Client" },
];

const makeid = (length) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export default function NewUser() {
  const [user, setUser] = useState({
    username: null,
    email: null,
    password: null,
    profilePic: null,
    birthDate: new Date(),
    isAdmin: null,
  });
  const [profilePic, setProfilePic] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const [create, setCreate] = useState(false);
  const history = useHistory();
  const { dispatch } = useContext(UserContext);

  useEffect(() => {
    if (user.username !== null && user.email !== null && user.isAdmin !== null && user.password !== null) setCreate(true);
    else setCreate(false)
  }, [user])

  const handleChange = (e) => {
    const value = e.target.value;
    setUser({ ...user, [e.target.name]: value });
  };

  const upload = async (items) => {
    items.forEach((item) => {
      if (item.file !== null && item.singleFile) {
        const fileName = new Date().getTime() + item.label + item.file.name;

        const storageRef = ref(
          storage,
          `/users/${user.username || makeid(10)}/${fileName}`
        );

        const uploadTask = uploadBytesResumable(storageRef, item.file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // const progress =
            //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // console.log("Upload " + item.label + " is " + progress + "% done");
          },
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

    upload([
      { file: profilePic, label: "profilePic", singleFile: true }
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser(user, dispatch);
    history.push("/users");
  };

  return (
    <div className="newUser">
      <h1 className="addMovieTitle">New Movie</h1>
      <form className="addMovieForm">
        <div className="addMovieItem">
          <label>User Name</label>
          <input
            type="text"
            placeholder="User Name"
            name="username"
            value={user.username ? user.username : ""}
            onChange={handleChange}
          />
        </div>
        <div className="addMovieItem">
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={user.email ? user.email : ""}
            onChange={handleChange}
          />
        </div>
        <div className="addMovieItem">
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={user.password ? user.password : ""}
            onChange={handleChange}
          />
        </div>
        <div className="addMovieItem">
          <label>Profile Picture</label>
          <input
            type="file"
            name="profilePic"
            onChange={(e) => setProfilePic(e.target.files[0])}
          />
        </div>
        <div className="addMovieItem">
          <label>Birth Date</label>
          <input
            type="date"
            placeholder="Birth Date"
            name="birthDate"
            value={user.birthDate ? user.birthDate : ""}
            onChange={handleChange}
          />
        </div>
        <div className="addMovieItem">
          <label>User Role</label>
          <Select
            options={isAdminOptions}
            onChange={(selected) => {
              setUser({ ...user, isAdmin: selected.value });
            }}
          />
        </div>
        <div className="addMovieItem">
          <button
            className="addMovieButton"
            onClick={handleUpload}
            disabled={profilePic && !uploaded ? false : true}
          >
            Upload
          </button>
          {create && ((profilePic && uploaded) || !profilePic) && (
            <button className="addMovieButton" onClick={handleSubmit}>
              Create
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
