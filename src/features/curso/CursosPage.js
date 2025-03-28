import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import SearchBar from '../../components/search/SearchBar';
import NavMenu from '../../components/menu/NavMenu';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import data from '../../data/db.json';
import '../../assets/styles/features/curso/CursosPage.css';

function CursosPage() {
  // Elementos de las migas de pan para la página de cursos
  const breadcrumbItems = [
    {
      label: 'Cursos',
      url: '/cursos'
    }
  ];

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      
      <main className="flex-grow-1">
        <Container>
          {/* Migas de pan */}
          <Breadcrumb items={breadcrumbItems} />
          
          {/* Buscador */}
          <SearchBar />
          
          {/* Menú de navegación */}
          <NavMenu />
          
          {/* Bloques del curso */}
          <div className="curso-header">
            <h2>Bloques del curso {data["codigo-curso"]}</h2>
            <p className="curso-description">
              Explora los diferentes bloques temáticos del curso y accede a sus contenidos
            </p>
          </div>
          
          <Row className="g-4">
            {data.bloque && data.bloque.map(bloque => (
              <Col md={4} key={bloque.codigo} className="mb-4">
                <Card className="h-100 shadow-sm curso-card">
                  <Card.Header className="text-center">{bloque.codigo}</Card.Header>
                  <Card.Body>
                    <Card.Title>{bloque.descripcion}</Card.Title>
                    <Card.Text>
                      {bloque.tema && bloque.tema.length > 0 
                        ? `${bloque.tema.length} temas disponibles` 
                        : 'No hay temas disponibles'}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer className="text-center">
                    <Link to={`/bloque/${bloque.codigo}`} className="btn btn-primary w-100">
                      Ver bloque
                    </Link>
                    {bloque.tema && bloque.tema.length > 0 && (
                      <Link to={`/tema/${bloque.tema[0].codigo}`} className="btn btn-outline-secondary w-100 mt-2">
                        Primer tema
                      </Link>
                    )}
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
          
          {/* Información del modelo */}
          <div className="model-info-container mt-5">
            <h3>Modelo (jerarquía) de la información de los objetos de aprendizaje:</h3>
            <ul className="model-list">
              <li>Curso (ej. TAI)</li>
              <li>Bloque (ej. 4. Sistemas y comunicaciones)</li>
              <li>Tema (ej. 47. TCP/IP)</li>
              <li>Lección (ej. 4704. Nivel de red IPv4) --&gt; Conjunto de objetivos</li>
              <li>Micro-lección (ej. 470402. Campos del datagrama) --&gt; Objetivo bien definido + Video</li>
              <li>Concepto (ej. TTL)</li>
              <li>Detalle (ej. ¿Qué representa realmente? ¿Quién lo procesa? ¿Qué ocurre si llega a tener valor 0?)</li>
            </ul>
            <p className="model-note">
              (estos dos últimos sirven para estructurar el guion del vídeo y que el alumno sea consciente también del alcance de la explicación)
            </p>
          </div>
        </Container>
      </main>
      
      <Footer />
    </div>
  );
}

export default CursosPage;          