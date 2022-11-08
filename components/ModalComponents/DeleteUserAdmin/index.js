import React, { useContext, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { AuthContext } from "../../../context";
import { adminService } from "../../../service/adminService";

function DeleteUserAdmin({ item }) {
  const state = useContext(AuthContext);
  const [callback, setCallback] = state.User.callback;
  const { deleteUser } = adminService();
  const [updateCollaboratorModal, setUpdateCollaboratorModal] = useState(false);
  const [showAlert, setShowAlert] = state.User.alert;
  const handleClose = () => {
    setUpdateCollaboratorModal(false);
  };

  const submit = async () => {
    const res = await deleteUser(item._id);
    if (res.status !== 200) {
      setShowAlert({
        status: true,
        message: "there was an error please try again!!!",
        type: "ERROR",
        duration: 3000,
        position: "top-right",
      });
    } else {
      setShowAlert({
        status: true,
        message: "Deleted",
        type: "SUCCESS",
        duration: 5000,
        position: "top-right",
      });
    }
    setCallback(!callback);
  };

  return (
    <>
      <svg
        onClick={() => setUpdateCollaboratorModal(true)}
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-trash-fill"
        viewBox="0 0 16 16"
      >
        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
      </svg>

      <Modal show={updateCollaboratorModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Are you sure you want to delete {item.name} {item.lastName}?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            type="submit"
            variant="primary"
            onClick={() => {
              submit();
            }}
          >
            Delete {item.name}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteUserAdmin;
