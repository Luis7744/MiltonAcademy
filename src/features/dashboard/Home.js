import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import SearchBar from '../../components/search/SearchBar';
import NavMenu from '../../components/menu/NavMenu';
import '../../assets/styles/features/dashboard/Home.css';

function Home() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      
      <main className="flex-grow-1">
        <Container>
          {/* Hero section */}
          <div className="hero-section text-center">
            <h1>Milton Academy</h1>
            <p className="lead">Plataforma de aprendizaje tecnológico avanzado</p>
            <SearchBar />
          </div>
          
          {/* Menú de navegación */}
          <NavMenu />
          
          {/* Secciones principales */}
          <Row className="mt-5 g-4">
            <Col md={4}>
              <Card className="h-100 shadow-sm feature-card">
                <Card.Body className="text-center">
                  <div className="feature-icon">
                    <i className="bi bi-book"></i>
                  </div>
                  <Card.Title>Cursos</Card.Title>
                  <Card.Text>
                    Explora nuestra amplia gama de cursos tecnológicos diseñados para profesionales.
                  </Card.Text>
                  <Button as={Link} to="/cursos" variant="primary">Ver cursos</Button>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={4}>
              <Card className="h-100 shadow-sm feature-card">
                <Card.Body className="text-center">
                  <div className="feature-icon">
                    <i className="bi bi-calendar-event"></i>
                  </div>
                  <Card.Title>Eventos</Card.Title>
                  <Card.Text>
                    Participa en nuestros eventos y webinars para ampliar tus conocimientos.
                  </Card.Text>
                  <Button as={Link} to="/eventos" variant="primary">Ver eventos</Button>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={4}>
              <Card className="h-100 shadow-sm feature-card">
                <Card.Body className="text-center">
                  <div className="feature-icon">
                    <i className="bi bi-file-earmark-text"></i>
                  </div>
                  <Card.Title>Recursos</Card.Title>
                  <Card.Text>
                    Accede a materiales complementarios para mejorar tu aprendizaje.
                  </Card.Text>
                  <Button as={Link} to="/recursos" variant="primary">Ver recursos</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          
          {/* Novedades */}
          <div className="mt-5">
            <h2 className="text-center mb-4">Últimas novedades</h2>
            <Row className="g-4">
              <Col md={6}>
                <Card className="news-card">
                  <Card.Body>
                    <Card.Title>Nuevo curso de ciberseguridad</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">15 de mayo, 2023</Card.Subtitle>
                    <Card.Text>
                      Hemos lanzado un nuevo curso sobre ciberseguridad avanzada con las últimas técnicas y herramientas.
                    </Card.Text>
                    <Button variant="outline-primary" size="sm">Leer más</Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card className="news-card">
                  <Card.Body>
                    <Card.Title>Actualización de la plataforma</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">10 de mayo, 2023</Card.Subtitle>
                    <Card.Text>
                      Hemos mejorado nuestra plataforma con nuevas funcionalidades para una mejor experiencia de aprendizaje.
                    </Card.Text>
                    <Button variant="outline-primary" size="sm">Leer más</Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </main>
      
      <Footer />
    </div>
  );
}

export default Home; 