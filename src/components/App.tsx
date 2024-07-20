import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import axios from "axios";
import { Constants } from "../constants/constants";
import { Product } from "../interfaces/product";
import ProductCard from "./ProductCard";
const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

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
    <div className="container sx">
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
    </div>
  );
};

export default App;
