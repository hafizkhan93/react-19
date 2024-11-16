import React from "react";
import { Badge, Button, Form, InputGroup, Modal } from "react-bootstrap";
import { useFormState } from "react-dom";
import { FormState } from "../types/form.type";

interface AddProductModalProps {
  show: boolean;
  onHide: () => void;
}
const AddProductModal: React.FC<AddProductModalProps> = ({ show, onHide }) => {
  const initialState: FormState = { email: "", password: "" };
  // Define the update action for form state
  const action = (state: FormState): FormState => {
    // Here we modify the state based on the change (we'll use a field change later)
    return state;
  };
  const [state, dispatch] = useFormState<FormState>(action, initialState);
  console.log("state: ", state);

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
        <Form>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>
              <Badge bg="secondary">Name</Badge>
            </Form.Label>
            <Form.Control type="name" placeholder="Enter product's name" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBaiscDescription">
            <Form.Label>
              <Badge bg="secondary">Description</Badge>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter a descriptive text"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>
              <Badge bg="secondary">Price</Badge>
            </Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text>€</InputGroup.Text>
              <Form.Control type="number" placeholder="Enter a decimal value" />
            </InputGroup>
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>
              <Badge bg="secondary">Upload a Picture</Badge>
            </Form.Label>
            <Form.Control type="file" accept="image/*" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddProductModal;
