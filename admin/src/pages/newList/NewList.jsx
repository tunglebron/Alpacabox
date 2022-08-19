import { useContext, useEffect, useState } from "react";
import "./newList.css";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { getMovies } from "../../context/movieContext/apiCalls";
import { createList } from "../../context/listContext/apiCalls";
import { ListContext } from "../../context/listContext/ListContext";
import { UserContext } from "../../context/userContext/UserContext";
import { useHistory } from "react-router-dom";
import { MovieContext } from "../../context/movieContext/MovieContext";
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

export default function NewList() {
  const [list, setList] = useState(null);
  const [listType, setListType] = useState("");
  const [isUserList, setIsUserList] = useState(false);
  const history = useHistory();

  const { dispatch } = useContext(ListContext);
  const { movies, dispatch: dispatchMovie } = useContext(MovieContext);
  const [selectOptions, setSelectOptions] = useState([]);

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

  const handleChange = (e) => {
    const value = e.target.value;
    setList({ ...list, [e.target.name]: value });
  };

  const handleSelect = (selectedOptions) => {
    setList({ ...list, content: selectedOptions });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createList(list, dispatch);
    history.push("/lists");
  };

  return (
    <div className="newList">
      <h1 className="addListTitle">New List</h1>
      <form className="addListForm">
        <div className="formLeft">
          <div className="addListItem">
            <label>Title</label>
            <input
              type="text"
              placeholder="Popular Movies"
              name="title"
              onChange={handleChange}
            />
          </div>
          <div className="addListItem">
            <label>Genre</label>
            <Select
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
              onChange={(selected) => {
                if (selected.value === "user") setIsUserList(true);
                else {
                  setIsUserList(false);
                  setList({ ...list, owner: null });
                }
                setList({ ...list, view: selected.value });
              }}
            />
          </div>
        </div>
        <div className="formRight">
          <div className="addListItem">
            <label>Type</label>
            <Select
              options={[
                { value: "series", label: "Series" },
                { value: "movie", label: "Movie" },
              ]}
              onChange={(selected) => {
                setList({ ...list, type: selected.value });
                setListType(selected.value);
              }}
            />
          </div>
          <div className="addListItem">
            <label>Content</label>
            <Select
              isMulti
              maxMenuHeight={240}
              components={animatedComponents}
              options={selectOptions}
              onChange={handleSelect}
            />
          </div>
          {isUserList && (
            <div className="addListItem">
              <label>User</label>
              <Select
                maxMenuHeight={240}
                components={animatedComponents}
                options={userOptions}
                onChange={(selected) => {
                  setList({ ...list, owner: selected.value });
                }}
              />
            </div>
          )}
        </div>
        <div style={{ display: "flex" }}>
          <button className="addListButton" onClick={handleSubmit}>
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
