// src/pages/LeccionDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Nav } from 'react-bootstrap';
import Header from '../../../../../components/header/Header';
import Footer from '../../../../../components/footer/Footer';
import Breadcrumb from '../../../../../components/breadcrumb/Breadcrumb';
import data from '../../../../../data/db.json';
import '../../../../../assets/styles/features/curso/bloque/tema/leccion/LeccionDetail.css';

function LeccionDetail() {
  const { leccionId } = useParams();
  const navigate = useNavigate();
  const [leccion, setLeccion] = useState(null);
  const [tema, setTema] = useState(null);
  const [bloque, setBloque] = useState(null);
  const [activeTab, setActiveTab] = useState('contenido');
  
  useEffect(() => {
    // Encontrar la lección actual
    let foundLeccion = null;
    let foundTema = null;
    let foundBloque = null;
    
    // Buscar la lección en todos los bloques y temas
    for (const b of data.bloque) {
      if (!b.tema) continue;
      
      for (const t of b.tema) {
        if (!t.leccion) continue;
        
        const leccion = t.leccion.find(l => l.codigo === leccionId);
        if (leccion) {
          foundLeccion = leccion;
          foundTema = t;
          foundBloque = b;
          break;
        }
      }
      
      if (foundLeccion) break;
    }
    
    setLeccion(foundLeccion);
    setTema(foundTema);
    setBloque(foundBloque);
  }, [leccionId]);
  
  if (!leccion || !tema || !bloque) {
    return <div>Cargando...</div>;
  }
  
  // Construir las migas de pan
  const breadcrumbItems = [
    { label: 'Inicio', path: '/' },
    { label: 'Cursos', path: '/cursos' },
    { 
      label: `Bloque ${bloque.codigo}: ${bloque.descripcion}`, 
      path: `/bloque/${bloque.codigo}` 
    },
    { 
      label: `${tema.codigo}: ${tema.descripcion}`, 
      path: `/tema/${tema.codigo}` 
    },
    {
      label: `${leccion.codigo}: ${leccion.descripcion}`,
      active: true
    }
  ];
  
  return (
    <div className="leccion-detail-container">
      <Header />
      
      <main>
        <Container fluid>
          <Row className="mt-3 mb-3">
            <Col>
              <Breadcrumb items={breadcrumbItems} />
            </Col>
          </Row>
          
          <Row>
            <Col>
              <h2 className="leccion-title">{leccion.descripcion}</h2>
              
              <Nav variant="tabs" className="mb-3">
                <Nav.Item>
                  <Nav.Link 
                    active={activeTab === 'contenido'} 
                    onClick={() => setActiveTab('contenido')}
                  >
                    Contenido
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link 
                    active={activeTab === 'ejercicios'} 
                    onClick={() => setActiveTab('ejercicios')}
                  >
                    Ejercicios
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link 
                    active={activeTab === 'recursos'} 
                    onClick={() => setActiveTab('recursos')}
                  >
                    Recursos
                  </Nav.Link>
                </Nav.Item>
              </Nav>
              
              {activeTab === 'contenido' && (
                <div className="leccion-content">
                  {/* Aquí iría el contenido específico de la lección */}
                  <div className="video-placeholder">
                    <iframe 
                      width="100%" 
                      height="500" 
                      src={leccion.videoUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ"} 
                      title={leccion.descripcion}
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    ></iframe>
                  </div>
                  
                  <div className="leccion-text mt-4">
                    <p>{leccion.contenido || "Contenido de la lección..."}</p>
                  </div>
                </div>
              )}
              
              {activeTab === 'ejercicios' && (
                <div className="ejercicios-content">
                  <h3>Ejercicios prácticos</h3>
                  <p>Aquí se mostrarían los ejercicios relacionados con esta lección.</p>
                  
                  <div className="ejercicio-container">
                    <h4>Ejercicio 1: Configuración de IPv4</h4>
                    <p>Configura una red IPv4 con las siguientes características...</p>
                    <Button variant="primary">Iniciar ejercicio</Button>
                  </div>
                </div>
              )}
              
              {activeTab === 'recursos' && (
                <div className="recursos-content">
                  <h3>Recursos adicionales</h3>
                  <ul className="recursos-list">
                    <li>
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        Documentación oficial de IPv4
                      </a>
                    </li>
                    <li>
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        Guía de configuración de redes
                      </a>
                    </li>
                    <li>
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        Herramientas de diagnóstico de red
                      </a>
                    </li>
                  </ul>
                </div>
              )}
              
              {/* Navegación entre lecciones */}
              <div className="leccion-navigation mt-4">
                <Button 
                  variant="outline-primary" 
                  className="me-2"
                  onClick={() => navigate(`/tema/${tema.codigo}`)}
                >
                  Volver al tema
                </Button>
                
                {/* Aquí podrías agregar botones para navegar a la lección anterior/siguiente */}
              </div>
            </Col>
          </Row>
        </Container>
      </main>
      
      <Footer />
    </div>
  );
}

export default LeccionDetail;
