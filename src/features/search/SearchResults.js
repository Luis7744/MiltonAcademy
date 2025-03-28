import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { Link, useSearchParams } from 'react-router-dom';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import SearchBar from '../../components/search/SearchBar';
import NavMenu from '../../components/menu/NavMenu';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import data from '../../data/db.json';
import '../../assets/styles/features/search/SearchResults.css';

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState({
    bloques: [],
    temas: [],
    lecciones: []
  });
  
  useEffect(() => {
    if (!query) return;
    
    const searchTerm = query.toLowerCase();
    const searchResults = {
      bloques: [],
      temas: [],
      lecciones: []
    };
    
    // Buscar en bloques
    data.bloque.forEach(bloque => {
      if (
        bloque.codigo.toLowerCase().includes(searchTerm) ||
        bloque.descripcion.toLowerCase().includes(searchTerm)
      ) {
        searchResults.bloques.push(bloque);
      }
      
      // Buscar en temas
      if (bloque.tema) {
        bloque.tema.forEach(tema => {
          if (
            tema.codigo.toLowerCase().includes(searchTerm) ||
            tema.descripcion.toLowerCase().includes(searchTerm)
          ) {
            searchResults.temas.push({
              ...tema,
              bloqueInfo: {
                codigo: bloque.codigo,
                descripcion: bloque.descripcion
              }
            });
          }
          
          // Buscar en lecciones
          if (tema.leccion) {
            tema.leccion.forEach(leccion => {
              if (
                leccion.codigo.toLowerCase().includes(searchTerm) ||
                leccion.descripcion.toLowerCase().includes(searchTerm)
              ) {
                searchResults.lecciones.push({
                  ...leccion,
                  temaInfo: {
                    codigo: tema.codigo,
                    descripcion: tema.descripcion
                  },
                  bloqueInfo: {
                    codigo: bloque.codigo,
                    descripcion: bloque.descripcion
                  }
                });
              }
            });
          }
        });
      }
    });
    
    setResults(searchResults);
  }, [query]);
  
  const totalResults = results.bloques.length + results.temas.length + results.lecciones.length;
  
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      
      <main className="flex-grow-1">
        <Container>
          {/* Buscador */}
          <SearchBar initialValue={query} />
          
          {/* Menú de navegación */}
          <NavMenu />
          
          {/* Resultados de búsqueda */}
          <div className="search-results-header">
            <h2>Resultados de búsqueda para: "{query}"</h2>
            <p>{totalResults} resultados encontrados</p>
          </div>
          
          {totalResults === 0 && (
            <div className="no-results">
              <i className="bi bi-search"></i>
              <h3>No se encontraron resultados</h3>
              <p>Intenta con otros términos de búsqueda o navega por las categorías</p>
            </div>
          )}
          
          {/* Resultados de bloques */}
          {results.bloques.length > 0 && (
            <div className="result-section">
              <h3>
                <Badge bg="primary" className="me-2">{results.bloques.length}</Badge>
                Bloques encontrados
              </h3>
              <Row className="g-4">
                {results.bloques.map(bloque => (
                  <Col md={4} key={bloque.codigo}>
                    <Card className="h-100 shadow-sm result-card">
                      <Card.Body>
                        <Badge bg="secondary" className="mb-2">Bloque</Badge>
                        <Card.Title>{bloque.descripcion}</Card.Title>
                        <Card.Text>Código: {bloque.codigo}</Card.Text>
                      </Card.Body>
                      <Card.Footer>
                        <Link to={`/bloque/${bloque.codigo}`} className="btn btn-primary w-100">
                          Ver bloque
                        </Link>
                      </Card.Footer>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          )}
          
          {/* Resultados de temas */}
          {results.temas.length > 0 && (
            <div className="result-section">
              <h3>
                <Badge bg="success" className="me-2">{results.temas.length}</Badge>
                Temas encontrados
              </h3>
              <Row className="g-4">
                {results.temas.map(tema => (
                  <Col md={4} key={tema.codigo}>
                    <Card className="h-100 shadow-sm result-card">
                      <Card.Body>
                        <Badge bg="success" className="mb-2">Tema</Badge>
                        <Card.Title>{tema.descripcion}</Card.Title>
                        <Card.Text>
                          Código: {tema.codigo}<br />
                          Bloque: {tema.bloqueInfo.descripcion}
                        </Card.Text>
                      </Card.Body>
                      <Card.Footer>
                        <Link to={`/tema/${tema.codigo}`} className="btn btn-primary w-100">
                          Ver tema
                        </Link>
                      </Card.Footer>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          )}
          
          {/* Resultados de lecciones */}
          {results.lecciones.length > 0 && (
            <div className="result-section">
              <h3>
                <Badge bg="info" className="me-2">{results.lecciones.length}</Badge>
                Lecciones encontradas
              </h3>
              <Row className="g-4">
                {results.lecciones.map(leccion => (
                  <Col md={4} key={leccion.codigo}>
                    <Card className="h-100 shadow-sm result-card">
                      <Card.Body>
                        <Badge bg="info" className="mb-2">Lección</Badge>
                        <Card.Title>{leccion.descripcion}</Card.Title>
                        <Card.Text>
                          Código: {leccion.codigo}<br />
                          Tema: {leccion.temaInfo.descripcion}<br />
                          Bloque: {leccion.bloqueInfo.descripcion}
                        </Card.Text>
                      </Card.Body>
                      <Card.Footer>
                        <Link to={`/leccion/${leccion.codigo}`} className="btn btn-primary w-100">
                          Ver lección
                        </Link>
                      </Card.Footer>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          )}
        </Container>
      </main>
      
      <Footer />
    </div>
  );
}

export default SearchResults; 