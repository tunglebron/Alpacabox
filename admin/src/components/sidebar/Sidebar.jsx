import "./sidebar.css";
import {
  LineStyle,
  // Timeline,
  // TrendingUp,
  PermIdentity,
  // BarChart,
  // MailOutline,
  // DynamicFeed,
  // ChatBubbleOutline,
  // WorkOutline,
  // Report,
  PlayCircleOutline,
  List,
} from "@material-ui/icons";
import { NavLink } from "react-router-dom";


export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <NavLink exact to="/" className="link" activeClassName="active">
              <li className="sidebarListItem">
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </NavLink>
            {/* <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <TrendingUp className="sidebarIcon" />
              Sales
            </li> */}
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <NavLink to="/users" className="link" activeClassName="active">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </NavLink>
            <NavLink to="/movies" className="link" activeClassName="active">
              <li className="sidebarListItem">
                <PlayCircleOutline className="sidebarIcon" />
                Movies
              </li>
            </NavLink>
            <NavLink to="/lists" className="link" activeClassName="active">
              <li className="sidebarListItem">
                <List  className="sidebarIcon" />
                Lists
              </li>
            </NavLink>
            {/* <li className="sidebarListItem">
              <BarChart className="sidebarIcon" />
              Reports
            </li> */}
          </ul>
        </div>
        {/* <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <MailOutline className="sidebarIcon" />
              Mail
            </li>
            <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              Feedback
            </li>
            <li className="sidebarListItem">
              <ChatBubbleOutline className="sidebarIcon" />
              Messages
            </li>
          </ul>
        </div> */}
        {/* <div className="sidebarMenu">
          <h3 className="sidebarTitle">Staff</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <WorkOutline className="sidebarIcon" />
              Manage
            </li>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <Report className="sidebarIcon" />
              Reports
            </li>
          </ul>
        </div> */}
      </div>
    </div>
  );
}
