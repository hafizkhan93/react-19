import React, { useActionState, useState } from "react";
import { Badge, Button, Form, InputGroup, Modal } from "react-bootstrap";
import { FormAction } from "../types/FormAction";
import { FormState } from "../types/FormState";

interface AddProductModalProps {
  show: boolean;
  onHide: () => void;
  onProductCreated: () => void;
}
const AddProductModal: React.FC<AddProductModalProps> = ({
  show,
  onHide,
  onProductCreated,
}) => {
  const initialState: FormState = {
    name: "",
    description: "",
    price: 0.0,
    picture: "",
    errors: {},
  };
  // Define the update action for form state
  const [showToast, setShowToast] = useState(false);
  const [state, dispatch, isPending] = useActionState<FormState, FormAction>(
    (state, action) => {
      switch (action.type) {
        case "update":
          return {
            ...state,
            [action.field]: action.value,
            errors: { ...state.errors, [action.field]: "" }, // Clear the error for the field
          };

        case "validate": {
          const errors = { ...state.errors };
          if (action.field === "name" && state.name.trim().length < 3) {
            errors.name = "Name must be at least 3 characters long.";
          }
          return { ...state, errors };
        }

        case "submit":
          // Validate all fields on submit
          const newErrors: { [key: string]: string } = {};
          if (Object.keys(newErrors).length > 0) {
            return { ...state, errors: newErrors };
          }
          onHide();
          onProductCreated();
          console.log("Form submitted successfully:", state);
          return state; // No changes, just log successful submit
        default:
          return state;
      }
    },
    initialState // Initial form state
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: "update", field: e.target.name, value: e.target.value });
  }
  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    dispatch({ type: "validate", field: e.target.name });
  }
  function handleSubmit() {
    dispatch({ type: "submit" });
  }
  const showSuccessModal = () => {
    return (
      <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  };

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
            <Form.Control
              type="name"
              name="name"
              value={state.name}
              placeholder="Enter product's name"
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={!!state.errors?.name}
            />
            <Form.Control.Feedback type="invalid">
              {state.errors?.name}
            </Form.Control.Feedback>
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

          <Button variant="primary" type="button" onClick={handleSubmit}>
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
