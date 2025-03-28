import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import Header from '../../../../../components/header/Header';
import Footer from '../../../../../components/footer/Footer';
import Breadcrumb from '../../../../../components/breadcrumb/Breadcrumb';
import data from '../../../../../data/db.json';
import '../../../../../assets/styles/features/curso/bloque/tema/leccion/MicroLeccionDetail.css';

console.log("Cargando MicroLeccionDetail, data:", data);

function MicroLeccionDetail() {
  const { leccionId } = useParams();
  const navigate = useNavigate();
  const [leccion, setLeccion] = useState(null);
  const [tema, setTema] = useState(null);
  const [bloque, setBloque] = useState(null);
  const [selectedMicroLeccion, setSelectedMicroLeccion] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!data || !data.bloque || !Array.isArray(data.bloque)) {
      console.error("Error: datos inválidos en MicroLeccionDetail", data);
      setError("Error al cargar los datos. La estructura JSON es inválida.");
      setLoading(false);
      return;
    }
    
    // Encontrar la lección actual
    let foundLeccion = null;
    let foundTema = null;
    let foundBloque = null;
    
    try {
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
      
      if (!foundLeccion) {
        setError(`No se encontró la lección con código ${leccionId}`);
      }
    } catch (err) {
      console.error("Error al procesar datos:", err);
      setError(`Error al procesar los datos: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [leccionId]);
  
  if (loading) {
    return (
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <Container className="my-5">
          <Row>
            <Col>
              <h2>Cargando...</h2>
              <p>Obteniendo información de la lección.</p>
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    );
  }
  
  if (error || !leccion || !tema || !bloque) {
    return (
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <Container className="my-5">
          <Row>
            <Col>
              <Alert variant="danger">
                <Alert.Heading>Error al cargar la lección</Alert.Heading>
                <p>{error || "No se pudo encontrar la información de la lección solicitada."}</p>
              </Alert>
              <Button 
                variant="primary" 
                onClick={() => navigate('/')}
              >
                Volver al inicio
              </Button>
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    );
  }
  
  // Construir las migas de pan (solo hasta el nivel de lección)
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
  
  // Verificar si hay microlecciones
  const hasMicroLecciones = leccion.microleccion && leccion.microleccion.length > 0;
  const currentMicroLeccion = hasMicroLecciones ? leccion.microleccion[selectedMicroLeccion] : null;
  
  return (
    <div className="microleccion-detail-container">
      <Header />
      
      <main>
        <Container fluid>
          <Row className="mt-3 mb-3">
            <Col>
              <Breadcrumb items={breadcrumbItems} />
            </Col>
          </Row>
          
          <Row>
            {hasMicroLecciones && (
              <Col md={3} className="sidebar-col">
                <div className="microlecciones-sidebar">
                  <div className="leccion-descripcion">
                    {leccion.descripcion}
                  </div>
                  <div className="microlecciones-list">
                    {leccion.microleccion.map((micro, index) => (
                      <div 
                        key={index}
                        className={`microleccion-item ${selectedMicroLeccion === index ? 'active' : ''}`}
                        onClick={() => setSelectedMicroLeccion(index)}
                      >
                        <span className="microleccion-numero">{index + 1}</span>
                        <span className="microleccion-titulo">{micro.descripcion}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Col>
            )}
            
            <Col md={hasMicroLecciones ? 9 : 12} className="main-content-col">
              <h2 className="microleccion-title">
                {hasMicroLecciones 
                  ? currentMicroLeccion.descripcion
                  : leccion.descripcion}
              </h2>
              
              <div className="microleccion-content">
                {/* Video */}
                <div className="video-placeholder">
                  <iframe 
                    width="100%" 
                    height="500" 
                    src={hasMicroLecciones 
                      ? (currentMicroLeccion["url-video"] || "https://www.youtube.com/embed/dQw4w9WgXcQ")
                      : leccion.videoUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ"} 
                    title={hasMicroLecciones ? currentMicroLeccion.descripcion : leccion.descripcion}
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>
                
                {/* Conceptos */}
                {hasMicroLecciones && currentMicroLeccion.concepto && (
                  <div className="conceptos-container mt-4">
                    {currentMicroLeccion.concepto.map((concepto, index) => (
                      <div key={index} className="concepto-box">
                        <h4 className="concepto-title">{concepto.descripcion}</h4>
                        {concepto.detalle && (
                          <ul className="concepto-list">
                            {concepto.detalle.map((det, idx) => (
                              <li key={idx}>{det.descripcion}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Contenido general si no hay conceptos específicos */}
                {(!hasMicroLecciones || !currentMicroLeccion.concepto) && (
                  <div className="microleccion-text mt-4">
                    <p>{leccion.contenido || "Contenido de la lección..."}</p>
                  </div>
                )}
              </div>
              
              {/* Navegación entre lecciones */}
              <div className="microleccion-navigation mt-4">
                <Button 
                  variant="outline-primary" 
                  className="me-2"
                  onClick={() => navigate(`/tema/${tema.codigo}`)}
                >
                  Volver al tema
                </Button>
                
                {hasMicroLecciones && (
                  <>
                    <Button 
                      variant="outline-secondary" 
                      className="me-2"
                      disabled={selectedMicroLeccion === 0}
                      onClick={() => setSelectedMicroLeccion(prev => Math.max(0, prev - 1))}
                    >
                      Anterior
                    </Button>
                    <Button 
                      variant="outline-secondary"
                      disabled={selectedMicroLeccion === leccion.microleccion.length - 1}
                      onClick={() => setSelectedMicroLeccion(prev => Math.min(leccion.microleccion.length - 1, prev + 1))}
                    >
                      Siguiente
                    </Button>
                  </>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </main>
      
      <Footer />
    </div>
  );
}

export default MicroLeccionDetail; 