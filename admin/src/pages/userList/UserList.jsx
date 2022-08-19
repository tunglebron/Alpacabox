import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../context/userContext/UserContext";
import { getUsers, deleteUser } from "../../context/userContext/apiCalls";
import LoaderSpinner from "../../components/loaderSpinner/LoaderSpinner";
import Modal from "../../components/modal/Modal";
import ConfirmDialog from "../../components/confirmDialog/ConfirmDialog";

var formatDateToString = (date) => {
  let newDate = null;

  if (typeof date === "string") {
    let toDate = new Date(Date.parse(date));

    const yyyy = toDate.getFullYear();
    let mm = toDate.getMonth() + 1; // Months start at 0!
    let dd = toDate.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    newDate = dd + "/" + mm + "/" + yyyy;
  }

  return newDate;
};

export default function UserList() {
  const { users, dispatch, isFetching } = useContext(UserContext);
  const [loading, setLoading] = useState(null);
  const [selected, setSelected] = useState(null);
  const [selectedName, setSelectedName] = useState(null);
  const modalRef = useRef();

  useEffect(() => {
    getUsers(dispatch);
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

  const handleDelete = () => {
    if (selected !== null) {
      const admin = localStorage.getItem("user");
      deleteUser(selected, admin, dispatch);
    }
  };

  const handleOpen = (id, name) => {
    setSelected(id);
    setSelectedName(name);
    modalRef.current.handleShow();
  };

  const handleClose = () => {
    modalRef.current.handleClose();
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 120 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img
              className="userListImg"
              src={
                params.row.profilePic ||
                "https://m.media-amazon.com/images/I/71v1cI2gm2L._AC_SL1500_.jpg"
              }
              alt=""
            />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 300 },
    {
      field: "birthDate",
      headerName: "Birth Date",
      headerAlign: 'center',
      width: 150,
      renderCell: (params) => {
        return (
          <>{formatDateToString(params.row.birthDate)}</>
        );
      },
    },
    {
      field: "isAdmin",
      headerName: "User Role",
      width: 160,
      renderCell: (params) => {
        return <>{params.row.isAdmin ? "Admin" : "Client"}</>;
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id} state={{ id: params.row._id }}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleOpen(params.row._id, params.row.username)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      {users && !loading ? (
        <>
          <div className="movieTitleContainer">
            <h1 className="movieTitle">User List</h1>
            <Link to="/newuser">
              <button className="movieAddButton">New User</button>
            </Link>
          </div>
          <div className="movieGridContainer">
            <DataGrid
              rows={users}
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
                selectedName +
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
