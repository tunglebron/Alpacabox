import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import "./featured.scss";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Featured({ type, setGenre }) {
  const [content, setContent] = useState({});
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    const getRandomContent = async () => {
      try {
        const res = await axios.get(
          global.proxy + `movies/random?type=${type}`,
          {
            headers: {
              token:
                "Bearer " +
                JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
        );
        setContent(res.data.result.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomContent();
  }, [type]);

  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movie" ? "Movies" : "Series"}</span>
          <select
            name="genre"
            id="genre"
            onChange={(e) => setGenre(e.target.value)}
          >
            <option value="-1">All Genre</option>
            <option value="Adventure">Adventure</option>
            <option value="Action">Action</option>
            <option value="Animation">Animation</option>
            <option value="Comedy">Comedy</option>
            <option value="Crime">Crime</option>
            <option value="Drama">Drama</option>
            <option value="Documentary">Documentary</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Historical">Historical</option>
            <option value="Horror">Horror</option>
            <option value="Romance">Romance</option>
            <option value="Sci-fi">Sci-fi</option>
            <option value="Thriller">Thriller</option>
          </select>
        </div>
      )}
      <img src={content.img} alt="" />
      <div className="info">
        {typeof content.imgTitle === "string" && (
          <img src={content.imgTitle} alt="" />
        )}
        <br></br>
        <div className="content">
          <p className={'desc ' + (showInfo ? 'showInfo' : '')}>{content.desc}</p>
          <div className="buttons">
            <Link
              to={{ pathname: "/watch" }}
              state={{ movie: content }}
              className="link"
            >
              <button className="play">
                <PlayArrow />
                <span>Play</span>
              </button>
            </Link>
            <button
              className="more"
              onClick={() => {
                setShowInfo((prev) => !prev);
              }}
            >
              <InfoOutlined />
              <span>Info</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
