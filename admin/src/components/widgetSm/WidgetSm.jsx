import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function WidgetSm() {
  const [newUsers, setNewUsers] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const getNewUsers = async () => {
      try {
        const res = await axios.get(global.proxy + "users?new=true", {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setNewUsers(res.data.result.data);
      } catch (err) {
        console.log(err);
      }
    };
    getNewUsers();
  }, []);

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {newUsers.map((user, index) => (
          <li className="widgetSmListItem" key={index}>
            <img
              src={
                user.profilePic ||
                "https://banner2.cleanpng.com/20180625/req/kisspng-computer-icons-avatar-business-computer-software-user-avatar-5b3097fcae25c3.3909949015299112927133.jpg"
              }
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.username}</span>
            </div>
            <button className="widgetSmButton" onClick={() => {
              history.push("/user/" + user._id);
            }}>
              <Visibility className="widgetSmIcon" />
              Display
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
