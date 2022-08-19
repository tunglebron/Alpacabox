import { useHistory, useLocation } from "react-router-dom";
import "./list.css";
import { useContext, useEffect, useState } from "react";
import { ListContext } from "../../context/listContext/ListContext";
import { getSingleList, updateList } from "../../context/listContext/apiCalls";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { getMovies } from "../../context/movieContext/apiCalls";
import { UserContext } from "../../context/userContext/UserContext";
import { getUsers } from "../../context/userContext/apiCalls";
const animatedComponents = makeAnimated();

const genreOptions = [
  { value: "Adventure", label: "Adventure" },
  { value: "Comedy", label: "Comedy" },
  { value: "Crime", label: "Crime" },
  { value: "Fantasy", label: "Fantasy" },
  { value: "Historical", label: "Historical" },
  { value: "Horror", label: "Horror" },
  { value: "Romance", label: "Romance" },
  { value: "Sci-fi", label: "Sci-fi" },
  { value: "Thriller", label: "Thriller" },
  { value: "Action", label: "Action" },
  { value: "Animation", label: "Animation" },
  { value: "Drama", label: "Drama" },
  { value: "Documentary", label: "Documentary" },
];

function groupBy(list, keyGetter) {
  const map = new Map();
  list.forEach((item) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
}

export default function List() {
  const { singleList, dispatch } = useContext(ListContext);
  const location = useLocation();
  const [list, setList] = useState(null);
  const [content, setContent] = useState(null);
  const [listType, setListType] = useState("");
  const history = useHistory();

  const [selectOptions, setSelectOptions] = useState([]);

  const { movies, dispatch: dispatchMovie } = useContext(MovieContext);

  const { dispatch: dispatchUser, users } = useContext(UserContext);
  const [userOptions, setUserOptions] = useState([]);

  useEffect(() => {
    getUsers(dispatchUser);
  }, [dispatchUser]);

  useEffect(() => {
    if (users) {
      setUserOptions([]);
      users.forEach((user) => {
        setUserOptions((prev) => [
          ...prev,
          { value: user._id, label: user.username },
        ]);
      });
    }
  }, [users]);

  useEffect(() => {
    getMovies(dispatchMovie);
  }, [dispatchMovie]);

  useEffect(() => {
    const pathname = location.pathname;

    const fields = pathname.split("/");

    getSingleList(fields[2], dispatch);
  }, [dispatch, location.pathname]);

  useEffect(() => {
    setList(singleList);
  }, [singleList]);

  useEffect(() => {
    if (movies) {
      setSelectOptions([]);
      const grouped = groupBy(movies, (movie) => movie.genre);

      genreOptions.forEach((genre) => {
        const newGroup = grouped.get(genre.value);
        if (newGroup !== undefined) {
          let value = [];
          newGroup.forEach((item) => {
            if (
              (item.isSeries && listType === "series") ||
              (!item.isSeries && listType === "movie") ||
              listType === ""
            )
              value.push({ value: item._id, label: item.title });
          });
          setSelectOptions((prev) => [
            ...prev,
            {
              label: genre.label,
              options: value,
            },
          ]);
        }
      });
    }
  }, [movies, listType]);

  useEffect(() => {
    if (list !== null && list !== undefined) {
      try {
        if (list.hasOwnProperty("content")) {
          setContent([]);
          list.content.forEach((item) => {
            setContent((prev) => [
              ...prev,
              { value: item.value, label: item.label },
            ]);
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [list]);

  const handleChange = (e) => {
    const value = e.target.value;
    setList({ ...list, [e.target.name]: value });
  };

  const handleSelect = (selectedOptions) => {
    console.log(selectedOptions);
    setList({ ...list, content: selectedOptions });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateList(list._id, list, dispatch);
    history.push("/lists/");
  };

  return (
    <div className="list">
      {list && (
        <>
          <div className="listTitleContainer">
            <h1 className="listTitle">{list.title}</h1>
          </div>
          <div className="listTop">
            <div className="listTopRight">
              <div className="listInfoTop">
                <span className="listName">{list.title}</span>
              </div>
              <div className="listInfoBottom">
                <div className="listInfoItem">
                  <span className="listInfoKey">id:</span>
                  <span className="listInfoValue">{list._id}</span>
                </div>
                <div className="listInfoItem">
                  <span className="listInfoKey">genre:</span>
                  <span className="listInfoValue">{list.genre}</span>
                </div>
                <div className="listInfoItem">
                  <span className="listInfoKey">type:</span>
                  <span className="listInfoValue">{list.type}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="listBottom">
            <form className="addListForm">
              <div className="formLeft">
                <div className="addListItem">
                  <label>Title</label>
                  <input
                    type="text"
                    placeholder="Popular Movies"
                    name="title"
                    value={list.title}
                    onChange={handleChange}
                  />
                </div>
                <div className="addListItem">
                  <label>Genre</label>
                  <Select
                    value={{ value: list.genre, label: list.genre }}
                    maxMenuHeight={240}
                    options={genreOptions}
                    onChange={(selected) => {
                      setList({ ...list, genre: selected.value });
                    }}
                  />
                </div>
                <div className="addListItem">
                  <label>View</label>
                  <Select
                    maxMenuHeight={240}
                    options={[
                      { value: "all", label: "All" },
                      { value: "normal", label: "Normal" },
                      { value: "user", label: "User" },
                    ]}
                    value={{
                      value: list.view,
                      label: list.view
                    }}
                    onChange={(selected) => {
                      setList({ ...list, view: selected.value });
                    }}
                  />
                </div>
              </div>
              <div className="formRight">
                <div className="addListItem">
                  <label>Type</label>
                  <Select
                    value={{
                      value: list.type,
                      label: list.type === "series" ? "Series" : "Movie",
                    }}
                    options={[
                      { value: "series", label: "Series" },
                      { value: "movie", label: "Movie" },
                    ]}
                    onChange={(selected) => {
                      setListType(selected.value);
                      setList({ ...list, type: selected.value });
                    }}
                  />
                </div>
                <div className="addListItem">
                  <label>User</label>
                  <Select
                    maxMenuHeight={240}
                    components={animatedComponents}
                    options={userOptions}
                    value={{
                      value: list.owner,
                      label: list.owner
                    }}
                    onChange={(selected) => {
                      setList({ ...list, owner: selected.value });
                    }}
                  />
                </div>
                <div className="addListItem">
                  <label>Content</label>
                  {content && (
                    <Select
                      value={content}
                      isMulti
                      maxMenuHeight={240}
                      components={animatedComponents}
                      options={selectOptions}
                      onChange={handleSelect}
                      menuPlacement={"top"}
                    />
                  )}
                </div>
              </div>
              <div style={{ display: "flex" }}>
                <button className="addListButton" onClick={handleSubmit}>
                  Update
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
