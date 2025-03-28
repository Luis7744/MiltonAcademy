// src/pages/BloqueDetail.js
import React from "react";
import { useParams, Link } from "react-router-dom";
import data from "./data/miltonData";
import { Card, Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";

function BloqueDetail() {
  const { bloqueId } = useParams();
  const bloque = data.bloque.find((b) => b.codigo === bloqueId);

  if (!bloque) {
    return <div>Bloque no encontrado: {bloqueId}</div>;
  }

  return (
    <Container style={{ padding: "1rem" }}>
      <h2>{bloque.descripcion}</h2>

      {bloque.tema && bloque.tema.length > 0 ? (
        <Row className="mt-4" xs={1} sm={2} md={3}>
          {bloque.tema.map((t) => (
            <Col key={t.codigo} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title>{t.descripcion}</Card.Title>
                  <Button variant="primary" as={Link} to={`/tema/${t.codigo}`}>
                    Ver detalle tema
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p>No hay temas en este bloque.</p>
      )}
    </Container>
  );
}

export default BloqueDetail;
