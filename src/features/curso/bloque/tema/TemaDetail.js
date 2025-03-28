// src/pages/TemaDetail.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Header from '../../../../components/header/Header';
import Footer from '../../../../components/footer/Footer';
import LateralBloques from '../../../../components/sidebar/LateralBloques';
import Breadcrumb from '../../../../components/breadcrumb/Breadcrumb';
import data from "../../../../data/db.json";
import './TemaDetail.css';

console.log("Cargando TemaDetail con datos:", data);

// Definimos la función localmente
const getTemaByCodigo = (data, temaId) => {
  console.log("getTemaByCodigo - data:", data, "temaId:", temaId);
  if (!data || !data.bloque || !Array.isArray(data.bloque)) {
    console.error("Error: datos inválidos", data);
    return { tema: null, bloque: null };
  }
  
  for (let b of data.bloque) {
    if (!b.tema) continue;
    const found = b.tema.find((t) => t.codigo === temaId);
    if (found) return { tema: found, bloque: b };
  }
  return { tema: null, bloque: null };
};

// Función para obtener todas las lecciones de un tema
const getLeccionesByTema = (data, temaId) => {
  const { tema } = getTemaByCodigo(data, temaId);
  return tema?.leccion || [];
};

// Función para obtener los prerequisitos de un tema
const getPrerequisitos = (data, temaId) => {
  // En un caso real, esto vendría del JSON
  // Por ahora, devolvemos datos de ejemplo que deberían estar en el JSON
  return [
    { codigo: "01", descripcion: "Fundamentos de informática" },
    { codigo: "02", descripcion: "Fundamentos de redes" }
  ];
};

// Función para obtener la secuencia de aprendizaje
const getLearningPath = (data, temaId) => {
  // En un caso real, esto vendría del JSON
  // Buscar todas las lecciones del bloque al que pertenece el tema
  const { bloque } = getTemaByCodigo(data, temaId);
  
  if (!bloque) return [];
  
  const learningPath = [];
  
  // Recorrer todos los temas del bloque
  bloque.tema?.forEach(tema => {
    // Añadir las lecciones de cada tema al learning path
    tema.leccion?.forEach(leccion => {
      if (leccion.tipo !== 'concepto' && leccion.tipo !== 'soporte') {
        learningPath.push(leccion);
      }
    });
  });
  
  // Ordenar por código
  return learningPath.sort((a, b) => {
    // Extraer números para comparación
    const numA = parseInt(a.codigo.replace(/\D/g, ''));
    const numB = parseInt(b.codigo.replace(/\D/g, ''));
    return numA - numB;
  });
};

// Componente para mostrar una lección en el learning path
function LeccionNode({ leccion, isActive, isLaboratorio, onClick }) {
  return (
    <div 
      className={`leccion-node ${isActive ? 'active' : ''} ${isLaboratorio ? 'laboratorio' : ''}`}
      onClick={() => onClick(leccion.codigo)}
      style={{ cursor: 'pointer' }}
    >
      {leccion.codigo}. {leccion.descripcion}
    </div>
  );
}

// Componente para mostrar un concepto
function ConceptoBox({ title, conceptos = [] }) {
  return (
    <div className="concepto-box">
      <div className="concepto-title">{title}</div>
      <ul className="concepto-list">
        {conceptos.map((concepto, index) => (
          <li key={index}>• {concepto}</li>
        ))}
      </ul>
    </div>
  );
}

// Función para agrupar lecciones por tipo
const agruparLeccionesPorTipo = (lecciones) => {
  const resultado = {
    conceptos: [],
    objetivos: [],
    soportes: [],
    learningPath: []
  };
  
  if (!lecciones) return resultado;
  
  lecciones.forEach(leccion => {
    if (leccion.tipo === 'concepto') {
      resultado.conceptos.push(leccion);
    } else if (leccion.tipo === 'objetivo') {
      resultado.objetivos.push(leccion);
    } else if (leccion.tipo === 'soporte') {
      resultado.soportes.push(leccion);
    } else {
      resultado.learningPath.push(leccion);
    }
  });
  
  return resultado;
};

// Función para dividir conceptos en columnas izquierda y derecha
const dividirConceptos = (conceptos) => {
  const mitad = Math.ceil(conceptos.length / 2);
  return {
    izquierda: conceptos.slice(0, mitad),
    derecha: conceptos.slice(mitad)
  };
};

function TemaDetail() {
  const { temaId } = useParams();
  const navigate = useNavigate();
  
  // Estado para controlar cuando se han cargado los datos
  const [dataLoaded, setDataLoaded] = useState(false);
  
  useEffect(() => {
    // Verificar si los datos están disponibles
    if (data && data.bloque) {
      console.log("Datos cargados correctamente en TemaDetail");
      setDataLoaded(true);
    } else {
      console.error("Error: no se pudieron cargar los datos en TemaDetail");
    }
  }, []);
  
  // Si los datos no están cargados, mostrar un mensaje de carga
  if (!dataLoaded || !data || !data.bloque) {
    return (
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <main className="flex-grow-1">
          <Container>
            <Row className="mt-5">
              <Col>
                <h3>Cargando datos del tema...</h3>
                <p>Si este mensaje persiste, puede haber un problema con los datos.</p>
              </Col>
            </Row>
          </Container>
        </main>
        <Footer />
      </div>
    );
  }
  
  const { tema, bloque } = getTemaByCodigo(data, temaId || "b4t7");
  
  // Si no se encuentra el tema, mostrar un mensaje de error
  if (!tema || !bloque) {
    return (
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <main className="flex-grow-1">
          <Container>
            <Row className="mt-5">
              <Col>
                <h3>Tema no encontrado</h3>
                <p>El tema con ID "{temaId}" no existe o no está disponible.</p>
                <button 
                  className="btn btn-primary"
                  onClick={() => navigate('/')}
                >
                  Volver al inicio
                </button>
              </Col>
            </Row>
          </Container>
        </main>
        <Footer />
      </div>
    );
  }
  
  // Obtener todas las lecciones del tema
  const lecciones = getLeccionesByTema(data, temaId);
  
  // Agrupar lecciones por tipo
  const leccionesPorTipo = agruparLeccionesPorTipo(lecciones);
  
  // Dividir conceptos en columnas izquierda y derecha
  const { izquierda, derecha } = dividirConceptos(leccionesPorTipo.conceptos);
  
  // Obtener prerequisitos
  const prerequisitos = getPrerequisitos(data, temaId);
  
  // Obtener learning path
  const learningPath = getLearningPath(data, temaId);

  const handleTemaClick = (nuevoTemaId) => {
    navigate(`/tema/${nuevoTemaId}`);
  };

  // Función para manejar el clic en una lección
  const handleLeccionClick = (leccionId) => {
    console.log("Navegando a lección:", leccionId);
    navigate(`/leccion/${leccionId}`);
  };

  // Construir los elementos de las migas de pan
  const breadcrumbItems = [];
  
  if (bloque) {
    breadcrumbItems.push({
      label: `Bloque ${bloque.codigo} - ${bloque.descripcion}`,
      url: `/bloque/${bloque.codigo}`
    });
  }
  
  if (tema) {
    breadcrumbItems.push({
      label: tema.descripcion,
      url: `/tema/${tema.codigo}`
    });
  }
  
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      
      <main className="flex-grow-1 tema-detail-container">
        <Container fluid>
          <Row>
            {/* Panel lateral izquierdo */}
            <Col md={3} lg={2} className="sidebar-col">
              <LateralBloques 
                data={data} 
                currentBloqueId={bloque?.codigo}
                currentTemaId={temaId}
                onTemaClick={handleTemaClick}
              />
            </Col>
            
            {/* Contenido principal */}
            <Col md={9} lg={10} className="main-content-col">
              {/* Migas de pan */}
              <Breadcrumb items={breadcrumbItems} />
              
              {/* Encabezados de columnas */}
              <div className="column-headers">
                <div className="objetivo-header">OBJETIVO</div>
                <div className="learning-path-header">LEARNING PATH</div>
                <div className="objetivo-header">OBJETIVO</div>
                <div className="soporte-header">SOPORTE</div>
              </div>
              
              {/* Contenido principal con learning path y conceptos */}
              <div className="learning-content">
                {/* Columna de conceptos izquierda */}
                <div className="conceptos-column left-conceptos">
                  {izquierda.map((concepto, index) => (
                    <ConceptoBox 
                      key={concepto.codigo || index}
                      title={concepto.titulo || concepto.descripcion} 
                      conceptos={concepto.items || []} 
                    />
                  ))}
                  {tema && (
                    <div className="leccion-highlight">
                      {tema.codigo}. {tema.descripcion}
                    </div>
                  )}
                </div>
                
                {/* Columna central - Learning Path */}
                <div className="learning-path-column">
                  {/* Nodos iniciales */}
                  <div className="initial-nodes">
                    {prerequisitos.map(prereq => (
                      <div key={prereq.codigo} className="prerequisite-node">
                        {prereq.codigo}. {prereq.descripcion}
                      </div>
                    ))}
                  </div>
                  
                  {/* Línea punteada que conecta a los nodos iniciales */}
                  <div className="dotted-connector"></div>
                  
                  {/* Secuencia de lecciones */}
                  <div className="learning-sequence">
                    {learningPath.map((leccion, index) => (
                      <React.Fragment key={leccion.codigo}>
                        <LeccionNode 
                          leccion={leccion} 
                          isActive={leccion.codigo === temaId} 
                          isLaboratorio={leccion.codigo.startsWith('L')} 
                          onClick={handleLeccionClick}
                        />
                        {index < learningPath.length - 1 && (
                          <div className="connector-line"></div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
                
                {/* Columna de conceptos derecha */}
                <div className="conceptos-column right-conceptos">
                  {derecha.map((concepto, index) => (
                    <ConceptoBox 
                      key={concepto.codigo || index}
                      title={concepto.titulo || concepto.descripcion} 
                      conceptos={concepto.items || []} 
                    />
                  ))}
                </div>
                
                {/* Columna de soporte */}
                <div className="soporte-column">
                  {leccionesPorTipo.soportes.map((soporte, index) => (
                    <div key={soporte.codigo || index} className="soporte-block">
                      {soporte.descripcion}
                    </div>
                  ))}
                  {/* Si no hay elementos de soporte, mostrar algunos basados en el tema */}
                  {leccionesPorTipo.soportes.length === 0 && tema && (
                    <>
                      <div className="soporte-block">Ayuda: {tema.descripcion}</div>
                      <div className="soporte-block">Tarjetas de memoria</div>
                      <div className="soporte-block">Cheatsheet: {bloque?.descripcion}</div>
                    </>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </main>
      
      <Footer />
    </div>
  );
}

export default TemaDetail;