import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./app.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import MovieList from "./pages/movieList/MovieList";
import Movie from "./pages/movie/Movie";
import NewMovie from "./pages/newMovie/NewMovie";
import ListList from "./pages/listList/ListList";
import List from "./pages/list/List";
import NewList from "./pages/newList/NewList";
import { AuthContext } from "./context/authContext/AuthContext";
import Login from "./pages/login/Login";
import { useContext, useState } from "react";
import LoaderBox from "./components/loaderBox/LoaderBox";

function App() {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true)

  return (
    <Router>
      <Switch>
        <Route path="/login">
          {user ? <Redirect to="/" /> : <Login />}
        </Route>
        {
          setTimeout(() => {
            setLoading(false)
          }, 2000)
        }
        {
          loading && (
            <div className="full">
              <LoaderBox />
            </div>
          )
        }
        {user && !loading ? (
          <>
            <Topbar />
            <div className="container">
              <Sidebar />
              <div className="main">
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/users">
                  <UserList />
                </Route>
                <Route path="/user/:userId">
                  <User />
                </Route>
                <Route path="/newUser">
                  <NewUser />
                </Route>
                <Route path="/movies">
                  <MovieList />
                </Route>
                <Route path="/movie/:movieId">
                  <Movie />
                </Route>
                <Route path="/newmovie">
                  <NewMovie />
                </Route>
                <Route path="/lists">
                  <ListList />
                </Route>
                <Route path="/list/:listId">
                  <List />
                </Route>
                <Route path="/newlist">
                  <NewList />
                </Route>
              </div>
            </div>
          </>
        ) : <Redirect to="/login" />}
      </Switch>
    </Router>
  );
}

export default App;
