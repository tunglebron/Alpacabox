import { ArrowBackOutlined } from "@material-ui/icons";
import "./watch.scss";
import { Link, useLocation } from "react-router-dom";

export default function Watch() {
  const location = useLocation();
  const movie = location.state.movie;

  return (
    <div className="watch">
      <Link to="/">
        <div className="back">
          <ArrowBackOutlined />
          Home
        </div>
      </Link>
      <iframe
        className="video"
        src={movie.video}
        frameBorder="0"
        scrolling="0"
        title={movie.title}
        allowFullScreen
        allow="autoplay; encrypted-media"
      ></iframe>
    </div>
  );
}
