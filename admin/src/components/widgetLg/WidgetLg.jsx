import "./widgetLg.css";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Visibility } from "@material-ui/icons";
import axios from "axios";

export default function WidgetLg() {
  const [lastestMovies, setLastestMovies] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const getNewUsers = async () => {
      try {
        const res = await axios.get(global.proxy + "movies", {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        const data = res.data.result.data;
        setLastestMovies(
          data
            .sort(function (a, b) {
              return a._id - b._id;
            })
            .slice(0, 4)
        );
      } catch (err) {
        console.log(err);
      }
    };
    getNewUsers();
  }, []);

  return (
    <div className="widgetLg">
      {lastestMovies && (
        <>
          <h3 className="widgetLgTitle">Latest movies</h3>
          <table className="widgetLgTable">
            <tbody>
              <tr className="widgetLgTr">
                <th className="widgetLgTh">Title</th>
                <th className="widgetLgTh">Year</th>
                <th className="widgetLgTh">Genre</th>
                <th className="widgetLgTh">Action</th>
              </tr>
              {lastestMovies.map((movie, index) => {
                return (
                  <tr className="widgetLgTr" key={index}>
                    <td className="widgetLgUser">
                      <img src={movie.img} alt="" className="widgetLgImg" />
                      <span className="widgetLgName">{movie.title}</span>
                    </td>
                    <td className="widgetLgDate">{movie.year}</td>
                    <td className="widgetLgAmount">{movie.genre}</td>
                    <td className="widgetLgStatus">
                      <button
                        className="widgetSmButton"
                        onClick={() => {
                          history.push("/movie/" + movie._id);
                        }}
                      >
                        <Visibility className="widgetSmIcon" />
                        Display
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
