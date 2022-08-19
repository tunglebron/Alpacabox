import {
  Add,
  PlayArrow,
  ThumbDownOutlined,
  ThumbUpOutlined,
} from "@material-ui/icons";
import { useState } from "react";
import { useEffect } from "react";
import "./listItem.scss";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ListItem({ index, item }) {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get(global.proxy + "movies/find/" + item, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setMovie(res.data.result.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMovie();
  }, [item]);

  return (
    <>
      <div
        className="listItem"
        style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={movie.img} alt="" className={isHovered ? "ease" : ""} />
        {isHovered && (
          <div className="ease">
            <iframe src={movie.trailer + "?autoplay=1&mute=1"} title="trailer" allow="autoplay"></iframe>
            <div className="itemInfo">
              <div className="icons">
                <Link
                  to={{ pathname: "/watch" }}
                  state={{ movie: movie }}
                  className="link"
                >
                  <PlayArrow className="icon" />
                </Link>
                <Add className="icon" />
                <ThumbUpOutlined className="icon" />
                <ThumbDownOutlined className="icon" />
              </div>
              <div className="title">{movie.title}</div>
              <div className="itemInfoTop">
                <span className="limit">+{movie.limit}</span>
                <span>Year: {movie.year}</span>
              </div>
              <div className="desc">{movie.desc}</div>
              <div className="genre">{movie.genre}</div>
            </div>
          </div>
        )}
      </div>
      {
        isHovered && <div className="listItem"></div>
      }
    </>
  );
}
