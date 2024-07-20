import { Card, Button } from "react-bootstrap";
import { Product } from "../interfaces/product";
import React from "react";
import { useState } from "react";
import "../styles.css";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Card className="card-hover-effect">
      <Card.Img
        variant="top"
        src={product.picture}
        style={{ height: "200px" }}
      />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text style={{ height: "100px" }}>{product.description}</Card.Text>
        <Button variant="primary">Add to Cart</Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
