import { useHistory, useLocation } from "react-router-dom";
import "./movie.css";
import { Publish } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import { MovieContext } from "../../context/movieContext/MovieContext";
import {
  getSingleMovie,
  updateMovie,
} from "../../context/movieContext/apiCalls";
import storage from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import LoaderSpinner from "../../components/loaderSpinner/LoaderSpinner";
import Select from "react-select";

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

const typeOptions = [
  { value: "true", label: "Series" },
  { value: "false", label: "Movie" },
];

const MovieTop = ({ movie }) => {
  return (
    <div className="movieTop">
      <div className="movieTopRight">
        <div className="movieInfoTop">
          <img src={movie.img || ""} alt="" className="movieInfoImg" />
          <span className="movieName">{movie.title || ""}</span>
        </div>
        <div className="movieInfoBottom">
          <div className="movieInfoItem">
            <span className="movieInfoKey">Genre:</span>
            <span className="movieInfoValue">{movie.genre || ""}</span>
          </div>
          <div className="movieInfoItem">
            <span className="movieInfoKey">Year:</span>
            <span className="movieInfoValue">{movie.year || ""}</span>
          </div>
          <div className="movieInfoItem">
            <span className="movieInfoKey">Limit:</span>
            <span className="movieInfoValue">{movie.limit || ""}</span>
          </div>
          <div className="movieInfoItem">
            <span className="movieInfoKey">ID:</span>
            <span className="movieInfoValue">{movie._id}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const MovieBottom = ({ movie, setMovie, updateMovie }) => {
  const [img, setImg] = useState(null);
  const [imgTitle, setImgTitle] = useState(null);
  const [imgSm, setImgSm] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [subtitles, setSubtitles] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    function check() {
      for (var key in movie) {
        if (Object.prototype.hasOwnProperty.call(movie, key)) {
          var val = movie[key];
          if (val === null || val === "" || val === undefined) return false;
        }
      }
      return true;
    }
    if (movie !== null) {
      const checked = check();
      if (checked) setUpdate(true);
      else setUpdate(false);
    }
  }, [movie]);

  const handleChange = (e) => {
    const value = e.target.value;
    setMovie({ ...movie, [e.target.name]: value });
  };

  const upload = async (items) => {
    items.forEach((item) => {
      if (item.file !== null && item.singleFile) {
        const fileName = new Date().getTime() + item.label + item.file.name;

        const storageRef = ref(storage, `/movies/${movie.title}/${fileName}`);

        const uploadTask = uploadBytesResumable(storageRef, item.file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              setMovie((prev) => {
                return { ...prev, [item.label]: url };
              });
              setUploaded(true);
            });
          }
        );
      } else if (item.file !== null && !item.singleFile) {
        item.file.forEach((subItem) => {
          new Promise((resolve, reject) => {
            const fileName = new Date().getTime() + item.label + subItem.name;

            const storageRef = ref(
              storage,
              `/movies/${movie.title}/${fileName}`
            );

            const uploadTask = uploadBytesResumable(storageRef, subItem);

            uploadTask.on(
              "state_changed",
              (snapshot) => {},
              (error) => {
                console.log(error);
              },
              () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                  let prevSub = movie.subtitles || [];
                  prevSub.push(url);
                  setMovie((prev) => {
                    return {
                      ...prev,
                      subtitles: prevSub,
                    };
                  });
                  setUploaded(true);
                });
              }
            );
          });
        });
      }
    });
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    upload([
      { file: img, label: "img", singleFile: true },
      { file: imgTitle, label: "imgTitle", singleFile: true },
      { file: imgSm, label: "imgSm", singleFile: true },
      { file: trailer, label: "trailer", singleFile: true },
      { file: video, label: "video", singleFile: true },
      { file: subtitles, label: "subtitles", singleFile: false },
    ]);
  };

  return (
    <div className="movieBottom">
      <form className="movieForm">
        <div className="movieFormLeft">
          <label>Movie Title</label>
          <input
            type="text"
            name="title"
            value={movie.title || ""}
            onChange={handleChange}
          />

          <label>Movie Description</label>
          <textarea
            name="desc"
            value={movie.desc || ""}
            onChange={handleChange}
          ></textarea>

          <label>Genre</label>
          <Select
            options={genreOptions}
            onChange={(selected) => {
              setMovie({ ...movie, genre: selected.value });
            }}
            tabSelectsValue={true}
            value={{ value: movie.genre, label: movie.genre }}
          />

          <label>Year</label>
          <input
            name="year"
            type="number"
            value={movie.year || ""}
            onChange={handleChange}
          />

          <label>Limit</label>
          <input
            name="limit"
            type="text"
            value={movie.limit || ""}
            onChange={handleChange}
          />

          <label>Type</label>
          <Select
            menuPlacement={"top"}
            options={typeOptions}
            onChange={(selected) => {
              setMovie({ ...movie, isSeries: selected.value });
            }}
            tabSelectsValue={true}
            value={{
              value: movie.isSeries,
              label: movie.isSeries ? "Series" : "Movie",
            }}
          />
        </div>

        <div className="movieFormCenter">
          <label>Trailer</label>
          {movie.trailer && (
            <div>
              <iframe
                className="video"
                src={movie.trailer}
                title="trailer"
              ></iframe>
            </div>
          )}
          <div className="uploadLine" style={{ justifyContent: "center" }}>
            <label htmlFor="trailer">
              <Publish />
              <span className="shortSpan">
                {trailer ? trailer.name : "Choose File"}
              </span>
            </label>
            <input
              id="trailer"
              type="file"
              style={{ display: "none" }}
              placeholder={movie.trailer}
              onChange={(e) => {
                setTrailer(e.target.files[0]);
              }}
              disabled={uploaded ? true : false}
            />
          </div>
          <div>
            <div style={{ textAlign: "center" }}>or using external link</div>
            <input
              style={{ width: "100%" }}
              type="url"
              name="trailer"
              onChange={handleChange}
              value={movie.trailer}
              disabled={trailer || uploaded ? true : false}
            />
          </div>

          <label style={{ paddingTop: "15px" }}>Video</label>
          {movie.video && (
            <div>
              <iframe
                className="video"
                src={movie.video}
                title="video"
              ></iframe>
            </div>
          )}
          <div className="uploadLine" style={{ justifyContent: "center" }}>
            <label htmlFor="video">
              <Publish />
              <span className="shortSpan">
                {video ? video.name : "Choose File"}
              </span>
            </label>
            <input
              id="video"
              type="file"
              style={{ display: "none" }}
              placeholder={movie.video}
              onChange={(e) => {
                setVideo(e.target.files[0]);
              }}
              disabled={uploaded ? true : false}
            />
          </div>
          <div>
            <div style={{ textAlign: "center" }}>or using external link</div>
            <input
              style={{ width: "100%" }}
              type="url"
              name="video"
              onChange={handleChange}
              value={movie.video}
              disabled={video || uploaded ? true : false}
            />
          </div>
        </div>

        <div className="movieFormRight">
          <div className="movieUpload">
            <label>Subtitles</label>
            <div className="uploadLine">
              <img
                src="https://cdn-icons-png.flaticon.com/512/29/29546.png"
                alt=""
                className="movieUploadImg"
              />
              <label htmlFor="subtitles">
                <Publish />
                <span className="shortSpan">
                  {subtitles
                    ? subtitles.length +
                      (subtitles.length === 1
                        ? " file selected"
                        : " files selected")
                    : "Choose File"}
                </span>
              </label>
              <input
                name="subtitles"
                id="subtitles"
                style={{ display: "none" }}
                type="file"
                onChange={(e) => {
                  let value = Array.from(e.target.files);
                  if (value.length === 0) value = null;
                  setSubtitles(value);
                }}
                disabled={uploaded ? true : false}
              />
            </div>
          </div>

          <div className="movieUpload">
            <label>Image</label>
            <div className="uploadLine">
              <img src={movie.img || ""} alt="" className="movieUploadImg" />
              <div style={{ display: "block" }}>
                <label htmlFor="img" style={{ display: "flex" }}>
                  <Publish />
                  <span className="shortSpan">
                    {img ? img.name : "Choose File"}
                  </span>
                </label>
                <input
                  name="img"
                  type="file"
                  id="img"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    setImg(e.target.files[0]);
                  }}
                  disabled={uploaded ? true : false}
                />
                <div style={{ textAlign: "center" }}>
                  or using external link
                </div>
                <input
                  style={{ width: "100%" }}
                  type="url"
                  name="img"
                  onChange={handleChange}
                  value={movie.img}
                  disabled={img || uploaded ? true : false}
                />
              </div>
            </div>
          </div>

          <div className="movieUpload">
            <label>Image Title</label>
            <div className="uploadLine">
              <img
                src={movie.imgTitle || ""}
                alt=""
                className="movieUploadImg"
              />
              <div style={{ display: "block" }}>
                <label htmlFor="imgTitle" style={{ display: "flex" }}>
                  <Publish />
                  <span className="shortSpan">
                    {imgTitle ? imgTitle.name : "Choose File"}
                  </span>
                </label>
                <input
                  name="imgTitle"
                  type="file"
                  id="imgTitle"
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={(e) => {
                    setImgTitle(e.target.files[0]);
                  }}
                  disabled={uploaded ? true : false}
                />
                <div style={{ textAlign: "center" }}>
                  or using external link
                </div>
                <input
                  style={{ width: "100%" }}
                  type="url"
                  name="imgTitle"
                  onChange={handleChange}
                  value={movie.imgTitle}
                  disabled={imgTitle || uploaded ? true : false}
                />
              </div>
            </div>
          </div>

          <div className="movieUpload">
            <label>Thumbnail Image</label>
            <div className="uploadLine">
              <img src={movie.imgSm || ""} alt="" className="movieUploadImg" />
              <div style={{ display: "block" }}>
                <label htmlFor="imgSm" style={{ display: "flex" }}>
                  <Publish />
                  <span className="shortSpan">
                    {imgSm ? imgSm.name : "Choose File"}
                  </span>
                </label>
                <input
                  name="imgSm"
                  type="file"
                  id="imgSm"
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={(e) => {
                    setImgSm(e.target.files[0]);
                  }}
                  disabled={uploaded ? true : false}
                />
                <div style={{ textAlign: "center" }}>
                  or using external link
                </div>
                <input
                  style={{ width: "100%" }}
                  type="url"
                  name="imgSm"
                  onChange={handleChange}
                  value={movie.imgSm}
                  disabled={imgSm || uploaded ? true : false}
                />
              </div>
            </div>
          </div>
          <div style={{ marginTop: "40px" }}>
            {(img || imgTitle || imgSm || trailer || video || subtitles) &&
              !uploaded && (
                <button className="movieButton" onClick={handleUpload}>
                  Upload
                </button>
              )}
            {update && (
              <button className="movieButton" onClick={updateMovie} style={{marginTop: '10px'}}>
                Update
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default function Movie() {
  const { singleMovie, dispatch, isFetching } = useContext(MovieContext);
  const location = useLocation();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const pathname = location.pathname;

    const fields = pathname.split("/");

    getSingleMovie(fields[2], dispatch);
  }, [dispatch, location.pathname]);

  useEffect(() => {
    async function tempSetMovie() {
      setMovie(singleMovie);
    }
    async function setState() {
      await tempSetMovie();
    }
    setState();
  }, [singleMovie]);

  useEffect(() => {
    if (isFetching) {
      setLoading(true);
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [isFetching]);

  useEffect(() => {}, [movie]);

  const clickUpdate = () => {
    updateMovie(movie._id, movie, dispatch);
    history.push("/movies/");
  };

  return (
    <div className="movie">
      {movie && !loading ? (
        <>
          <div className="movieTitleContainer">
            <h1 className="movieTitle">{movie.title}</h1>
          </div>
          <MovieTop movie={movie} />
          <MovieBottom
            movie={movie}
            setMovie={setMovie}
            updateMovie={clickUpdate}
          />
        </>
      ) : (
        <div style={{ height: "calc(85vh)" }}>
          <LoaderSpinner size={120} />
        </div>
      )}
    </div>
  );
}
