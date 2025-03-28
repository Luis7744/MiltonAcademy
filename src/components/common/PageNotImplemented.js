import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import '../../assets/styles/components/common/PageNotImplemented.css';

function PageNotImplemented() {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      
      <main className="flex-grow-1">
        <Container className="py-5">
          <Row className="justify-content-center">
            <Col md={8} className="text-center">
              <div className="not-implemented-container">
                <h1 className="display-4">Página en construcción</h1>
                <p className="lead">
                  Esta funcionalidad estará disponible próximamente.
                </p>
                <div className="construction-icon">
                  <i className="bi bi-cone-striped"></i>
                </div>
                <Button 
                  variant="primary" 
                  className="mt-4"
                  onClick={() => navigate('/')}
                >
                  Volver al inicio
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </main>
      
      <Footer />
    </div>
  );
}

export default PageNotImplemented; 