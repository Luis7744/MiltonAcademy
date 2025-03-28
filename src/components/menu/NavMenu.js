import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import '../../assets/styles/components/menu/NavMenu.css';

function NavMenu() {
  return (
    <div className="nav-menu-container">
      <Nav className="justify-content-center" variant="pills">
        <Nav.Item>
          <Nav.Link as={NavLink} to="/planificacion" className="nav-menu-item">Planificación</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to="/eventos" className="nav-menu-item">Eventos</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to="/cursos" className="nav-menu-item">Cursos</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to="/recursos" className="nav-menu-item">Recursos</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to="/faq" className="nav-menu-item">FAQ</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to="/novedades" className="nav-menu-item">Novedades</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
}

export default NavMenu; 