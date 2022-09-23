import { useContext, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { AuthContext } from "../../../../context";
import { clientService } from "../../../../service/clientService";

function DeleteClient({ item }) {
  const state = useContext(AuthContext);
  const [callback, setCallback] = state.User.callback;
  const { deleteClient } = clientService();
  const [deleteModal, setDeleteModal] = useState(false);
  const handleClose = () => {
    setDeleteModal(false);
  };

  const submit = async () => {
    const res = await deleteClient(item._id);
    setCallback(!callback);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setDeleteModal(true)}
        className="btn btn-danger btn-small"
      >
        Delete Client
      </button>

      <Modal show={deleteModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Are you sure you want to delete {item.subject}?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>This task will be deleted for ever</Modal.Body>

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
            Delete {item.subject}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteClient;
