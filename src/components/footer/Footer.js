import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ThemeToggle from '../theme/ThemeToggle';
import '../../assets/styles/components/footer/Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="app-footer">
      <Container>
        <Row className="align-items-center">
          <Col md={4} className="footer-theme-toggle">
            <ThemeToggle />
          </Col>
          <Col md={4} className="footer-links">
            <a href="#" className="footer-link">Términos y condiciones</a>
            <a href="#" className="footer-link">Privacidad</a>
            <a href="#" className="footer-link">Contacto</a>
          </Col>
          <Col md={4} className="footer-copyright">
            <p>&copy; {currentYear} Milton Academy. Todos los derechos reservados.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer; 