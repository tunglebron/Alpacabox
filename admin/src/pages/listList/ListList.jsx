import { useRef } from "react";
import "./listList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ListContext } from "../../context/listContext/ListContext";
import { deleteList, getLists } from "../../context/listContext/apiCalls";
import LoaderSpinner from "../../components/loaderSpinner/LoaderSpinner";
import Modal from "../../components/modal/Modal";
import ConfirmDialog from "../../components/confirmDialog/ConfirmDialog";

export default function ListList() {
  const { lists, dispatch, isFetching } = useContext(ListContext);
  const [loading, setLoading] = useState(null);
  const modalRef = useRef();
  const [selected, setSelected] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState(null);

  useEffect(() => {
    getLists(dispatch);
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
    if (selected !== null) deleteList(selected, dispatch);
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
    { field: "_id", headerName: "ID", width: 250 },
    { field: "title", headerName: "Title", width: 250 },
    { field: "genre", headerName: "Genre", width: 150 },
    { field: "type", headerName: "Type", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={{
                pathname: "/list/" + params.row._id,
              }}
              state={{ id: params.row._id }}
            >
              <button className="listListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="listListDelete"
              onClick={() => handleOpen(params.row._id, params.row.title)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="listList">
      {lists && !loading ? (
        <>
          <div className="movieTitleContainer">
            <h1 className="movieTitle">All Lists</h1>
            <Link to="/newlist">
              <button className="listAddButton">New List</button>
            </Link>
          </div>
          <div className="movieGridContainer">
            <DataGrid
              rows={lists}
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
                "</b> list?"
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
