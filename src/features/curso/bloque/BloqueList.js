// src/pages/BloqueList.js
import React from "react";
import { Link } from "react-router-dom";
import data from "../../../data/miltonData.js";

import { Card, Button, Container, Row, Col } from "react-bootstrap";

function BloqueList() {
  const bloques = data.bloque;

  return (
    <Container style={{ padding: "1rem" }}>
      <h1>Bloques del Curso {data["codigo-curso"]}</h1>

      <Row className="mt-4" xs={1} sm={2} md={3} lg={4} >
        {bloques.map((b) => (
          <Col key={b.codigo} className="mb-3">
            <Card style={{ width: "100%" }}>
              <Card.Body>
                <Card.Title>{b.descripcion}</Card.Title>
                <Button variant="primary" as={Link} to={`/bloque/${b.codigo}`}>
                  Ver detalle
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default BloqueList;
