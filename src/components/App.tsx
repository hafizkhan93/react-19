import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Offcanvas, Toast, ToastContainer } from "react-bootstrap";
import { CheckCircleFill } from "react-bootstrap-icons";
import { Constants } from "../constants/Constants";
import { Product } from "../interfaces/Product";
import AddProductModal from "./AddProductModal";
import ProductCard from "./ProductCard";
const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [showAddProductModal, setShowProductModal] = useState(false);
  const [showCart, setShowCart] = useState(false);

  function handleCloseCart() {
    setShowCart(false);
  }
  function handleShowCart() {
    setShowCart(true);
  }

  function openShowAddProductModal() {
    setShowProductModal(true);
  }
  async function handleProductCreated(addProduct: Product) {
    axios
      .post(Constants.MOCKSERVER_URL + "/products", addProduct)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
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
        onClick={handleShowCart}
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
          onProductCreated={(addProduct: Product) =>
            handleProductCreated(addProduct)
          }
        />
      )}

      <Offcanvas show={showCart} onHide={handleCloseCart} placement="end">
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
