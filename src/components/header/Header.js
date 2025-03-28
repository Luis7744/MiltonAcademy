import React, { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import '../../assets/styles/components/header/Header.css';

function Header() {
  const { darkMode } = useContext(ThemeContext);
  
  return (
    <header className="app-header">
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="logo-container">
            <Link to="/" className="d-flex align-items-center text-decoration-none">
              <div className="milton-logo-text">
                <span className="milton-text">Milton</span>
                <span className="academy-text">ACADEMY</span>
              </div>
            </Link>
          </Col>
          <Col md={6} className="user-container">
            <img src="/avatar.png" alt="Usuario" className="user-avatar" />
            <div className="user-info">
              <p className="user-name">Juan Pérez</p>
              <p className="user-role">Estudiante</p>
            </div>
          </Col>
        </Row>
      </Container>
    </header>
  );
}

export default Header; 