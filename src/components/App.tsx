import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Offcanvas, Toast, ToastContainer } from "react-bootstrap";
import { CheckCircleFill } from "react-bootstrap-icons";
import { Constants } from "../constants/constants";
import { Product } from "../interfaces/product";
import AddProductModal from "./AddProductModal";
import ProductCard from "./ProductCard";
const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [show, setShow] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showAddProductModal, setShowProductModal] = useState(false);

  function handleClose() {
    setShow(false);
  }
  function handleShow() {
    setShow(true);
  }

  function openShowAddProductModal() {
    setShowProductModal(true);
  }
  function handleProductCreated() {
    setShowToast(true);
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  async function getAllProducts() {
    axios
      .get(Constants.MOCKSERVER_URL + "/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return (
    <div className="container sx mt-5">
      <Button
        style={{ float: "right", marginRight: "30px" }}
        variant="primary"
        onClick={handleShow}
      >
        Cart
      </Button>
      <Button
        style={{ marginLeft: "30px" }}
        variant="primary"
        onClick={openShowAddProductModal}
      >
        Add new Product
      </Button>
      <div className="row mx-3 my-3">
        {products.map((productData) => (
          <div className="col">
            <ProductCard
              key={productData.id}
              product={productData}
            ></ProductCard>
          </div>
        ))}
      </div>
      {showAddProductModal && (
        <AddProductModal
          show={showAddProductModal}
          onHide={() => setShowProductModal(false)}
          onProductCreated={() => handleProductCreated()}
        />
      )}

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            Your current items in the shopping cart
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>
      <ToastContainer style={{ zIndex: 1 }} position="top-center">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={5000}
          autohide
        >
          <Toast.Header>
            <CheckCircleFill
              size="16"
              style={{ marginRight: "0.5rem" }}
            ></CheckCircleFill>
            <strong>Success 👍</strong>
          </Toast.Header>
          <Toast.Body>
            New product has been created, you should now see it in the overview!
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default App;
