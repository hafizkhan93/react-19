import React from "react";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
const App: React.FC = () => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
      <Button variant="primary">Go somewhere</Button>
    </Card>
  );
};

export default App;
