import React, { useEffect,} from "react";
import { Modal, Button } from "react-bootstrap";
 
interface AddProductModalProps {
  show: boolean;
  onHide: () => void;
}
const AddProductModal: React.FC<AddProductModalProps> = ({ show, onHide }) => {
  const { data, pending method, action}= useFormStatus();
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create new Product
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form action=""></form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddProductModal;
