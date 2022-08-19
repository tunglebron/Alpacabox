import { useRef } from "react";
import "./movieList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { deleteMovie, getMovies } from "../../context/movieContext/apiCalls";
import LoaderSpinner from "../../components/loaderSpinner/LoaderSpinner";
import Modal from "../../components/modal/Modal";
import ConfirmDialog from "../../components/confirmDialog/ConfirmDialog";

export default function MovieList() {
  const { movies, dispatch, isFetching } = useContext(MovieContext);
  const [loading, setLoading] = useState(null);
  const modalRef = useRef();
  const [selected, setSelected] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState(null);

  useEffect(() => {
    getMovies(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (isFetching) {
      setLoading(true);
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [isFetching]);

  const handleDelete = (id) => {
    if (selected !== null) deleteMovie(selected, dispatch);
  };

  const handleOpen = (id, title) => {
    setSelected(id);
    setSelectedTitle(title);
    modalRef.current.handleShow();
  };

  const handleClose = () => {
    modalRef.current.handleClose();
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 120 },
    {
      field: "movie",
      headerName: "Movie",
      width: 400,
      renderCell: (params) => {
        return (
          <div className="movieListItem">
            <img className="movieListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "genre", headerName: "Genre", width: 120 },
    {
      field: "year",
      headerName: "Year",
      width: 120,
    },
    {
      field: "limit",
      headerName: "Limit",
      width: 120,
    },
    {
      field: "isSeries",
      headerName: "Type",
      width: 120,
      renderCell: (params) => {
        return <>{params.row.isSeries ? <>Series</> : <>Movie</>}</>;
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={{
                pathname: "/movie/" + params.row._id,
              }}
              state={{ id: params.row._id }}
            >
              <button className="movieListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="movieListDelete"
              onClick={() => handleOpen(params.row._id, params.row.title)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="movieList">
      {movies && !loading ? (
        <>
          <div className="movieTitleContainer">
            <h1 className="movieTitle">Movie List</h1>
            <Link to="/newmovie">
              <button className="movieAddButton">New Movie</button>
            </Link>
          </div>
          <div className="movieGridContainer">
            <DataGrid
              rows={movies}
              disableSelectionOnClick
              columns={columns}
              pageSize={8}
              checkboxSelection
              getRowId={(r) => r._id}
            />
          </div>
          <Modal ref={modalRef}>
            <ConfirmDialog
              msg={
                "Are you sure you want to delete<br/><b>" +
                selectedTitle +
                "</b>?"
              }
              handleYes={handleDelete}
              handleNo={handleClose}
            />
          </Modal>
        </>
      ) : (
        <>
          <LoaderSpinner size={120} />
        </>
      )}
    </div>
  );
}
