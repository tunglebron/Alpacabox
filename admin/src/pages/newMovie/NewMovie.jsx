import { useContext, useEffect, useState } from "react";
import "./newMovie.css";
import storage from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { createMovie } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import makeAnimated from "react-select/animated";

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

const typeOptions = [
  { value: "true", label: "Series" },
  { value: "false", label: "Movie" },
];

export default function NewMovie() {
  const [movie, setMovie] = useState({
    title: null,
    desc: null,
    img: null,
    imgTitle: null,
    imgSm: null,
    trailer: null,
    video: null,
    year: null,
    limit: null,
    genre: null,
    isSeries: null,
  });
  const [img, setImg] = useState(null);
  const [imgTitle, setImgTitle] = useState(null);
  const [imgSm, setImgSm] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [subtitles, setSubtitles] = useState([]);
  const [uploaded, setUploaded] = useState(false);
  const [create, setCreate] = useState(false);
  const history = useHistory();

  const { dispatch } = useContext(MovieContext);

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
      if (checked) setCreate(true);
      else setCreate(false);
    }
  }, [movie]);

  const makeid = (length) => {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const upload = async (items) => {
    items.forEach((item) => {
      if (item.file !== null && item.singleFile) {
        const fileName = new Date().getTime() + item.label + item.file.name;

        const storageRef = ref(
          storage,
          `/movies/${movie.title || makeid(10)}/${fileName}`
        );

        const uploadTask = uploadBytesResumable(storageRef, item.file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // const progress =
            //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // console.log("Upload " + item.label + " is " + progress + "% done");
          },
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
      } else if (item.file !== [] && !item.singleFile) {
        item.file.forEach((subItem) => {
          new Promise((resolve, reject) => {
            const fileName = new Date().getTime() + item.label + subItem.name;

            const storageRef = ref(
              storage,
              `/movies/${movie.title || makeid(10)}/${fileName}`
            );

            const uploadTask = uploadBytesResumable(storageRef, subItem);

            uploadTask.on(
              "state_changed",
              (snapshot) => {
                // const progress =
                //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                // console.log(
                //   "Upload " + item.label + " is " + progress + "% done"
                // );
              },
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

  const handleChange = (e) => {
    const value = e.target.value;
    setMovie({ ...movie, [e.target.name]: value });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    createMovie(movie, dispatch);
    history.push("/movies");
  };

  return (
    <div className="newMovie">
      <h1 className="addMovieTitle">New Movie</h1>
      <form className="addMovieForm">
        <div className="addMovieItem">
          <label>Title</label>
          <input
            type="text"
            placeholder="John Wick"
            name="title"
            value={movie.title ? movie.title : ""}
            onChange={handleChange}
          />
        </div>
        <div className="addMovieItem">
          <label>Description</label>
          <input
            type="text"
            placeholder="Description"
            name="desc"
            value={movie.desc ? movie.desc : ""}
            onChange={handleChange}
          />
        </div>
        <div className="addMovieItem">
          <label>Year</label>
          <input
            type="text"
            placeholder="Year"
            name="year"
            value={movie.year ? movie.year : ""}
            onChange={handleChange}
          />
        </div>
        <div className="addMovieItem">
          <label>Limit</label>
          <input
            type="text"
            placeholder="Limit"
            name="limit"
            value={movie.limit ? movie.limit : ""}
            onChange={handleChange}
          />
        </div>
        <div className="addMovieItem">
          <label>Genre</label>
          <Select
            options={genreOptions}
            onChange={(selected) => {
              setMovie({ ...movie, genre: selected.value });
            }}
            components={animatedComponents}
          />
        </div>
        <div className="addMovieItem">
          <label>Type</label>
          <Select
            options={typeOptions}
            onChange={(selected) => {
              setMovie({ ...movie, isSeries: selected.value });
            }}
            components={animatedComponents}
          />
        </div>
        <div className="addMovieItem">
          <label>Image</label>
          <input
            type="file"
            id="img"
            name="img"
            accept="image/*"
            onChange={(e) => setImg(e.target.files[0])}
            disabled={uploaded}
          />
          <div style={{ textAlign: "center", padding: "10px 0px" }}>
            or external link
          </div>
          <input
            type="url"
            name="img"
            placeholder="Image Link"
            value={movie.img ? movie.img : ""}
            onChange={handleChange}
            disabled={img ? true : false}
          />
        </div>
        <div className="addMovieItem">
          <label>Title image</label>
          <input
            type="file"
            id="imgTitle"
            name="imgTitle"
            accept="image/*"
            onChange={(e) => setImgTitle(e.target.files[0])}
            disabled={uploaded}
          />
          <div style={{ textAlign: "center", padding: "10px 0px" }}>
            or external link
          </div>
          <input
            type="url"
            name="imgTitle"
            placeholder="Title Image Link"
            value={movie.imgTitle ? movie.imgTitle : ""}
            onChange={handleChange}
            disabled={imgTitle ? true : false}
          />
        </div>
        <div className="addMovieItem">
          <label>Thumbnail image</label>
          <input
            type="file"
            id="imgSm"
            name="imgSm"
            accept="image/*"
            onChange={(e) => setImgSm(e.target.files[0])}
            disabled={uploaded}
          />
          <div style={{ textAlign: "center", padding: "10px 0px" }}>
            or external link
          </div>
          <input
            type="url"
            name="imgSm"
            placeholder="Thumbnail Link"
            value={movie.imgSm ? movie.imgSm : ""}
            onChange={handleChange}
            disabled={imgSm ? true : false}
          />
        </div>
        <div className="addMovieItem">
          <label>Subtitles</label>
          <input
            multiple
            type="file"
            name="subtitles"
            accept=".srt"
            onChange={(e) => {
              let value = Array.from(e.target.files);
              setSubtitles(value);
            }}
            disabled={uploaded}
          />
        </div>
        <div className="addMovieItem">
          <label>Trailer</label>
          <input
            type="file"
            name="trailer"
            accept="video/mp4,video/x-m4v,video/*"
            onChange={(e) => setTrailer(e.target.files[0])}
            disabled={uploaded}
          />
          <div style={{ textAlign: "center", padding: "10px 0px" }}>
            or external link
          </div>
          <input
            type="url"
            name="trailer"
            placeholder="Trailer Link"
            value={movie.trailer ? movie.trailer : ""}
            onChange={handleChange}
            disabled={trailer ? true : false}
          />
        </div>
        <div className="addMovieItem">
          <label>Video</label>
          <input
            type="file"
            name="video"
            accept="video/mp4,video/x-m4v,video/*"
            onChange={(e) => setVideo(e.target.files[0])}
            disabled={uploaded}
          />
          <div style={{ textAlign: "center", padding: "10px 0px" }}>
            or external link
          </div>
          <input
            type="url"
            name="video"
            placeholder="Video Link"
            value={movie.video ? movie.video : ""}
            onChange={handleChange}
            disabled={video ? true : false}
          />
        </div>
        <div className="addMovieItem">
          <button
            className="addMovieButton"
            onClick={handleUpload}
            disabled={
              (img || movie.img) &&
              (imgTitle || movie.imgTitle) &&
              (imgSm || movie.imgSm) &&
              (trailer || movie.trailer) &&
              (video || movie.video) &&
              !uploaded
                ? false
                : true
            }
          >
            Upload
          </button>
          {create && (
            <button className="addMovieButton" onClick={handleSubmit}>
              Create
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
