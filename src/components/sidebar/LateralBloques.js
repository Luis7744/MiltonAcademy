import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../assets/styles/components/sidebar/LateralBloques.css';

function LateralBloques({ data }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [openBloque, setOpenBloque] = useState(null);
  const [activeTema, setActiveTema] = useState(null);
  
  // Determinar el bloque y tema activo basado en la URL actual
  useEffect(() => {
    const path = location.pathname;
    const temaMatch = path.match(/\/tema\/([^/]+)/);
    
    if (temaMatch) {
      const temaId = temaMatch[1];
      setActiveTema(temaId);
      
      // Encontrar el bloque que contiene este tema
      for (const bloque of data.bloque) {
        if (!bloque.tema) continue;
        
        const found = bloque.tema.find(t => t.codigo === temaId);
        if (found) {
          setOpenBloque(bloque.codigo);
          break;
        }
      }
    }
  }, [location.pathname, data.bloque]);
  
  const toggleBloque = (bloqueId) => {
    setOpenBloque(openBloque === bloqueId ? null : bloqueId);
  };
  
  const handleTemaClick = (temaId) => {
    setActiveTema(temaId);
    navigate(`/tema/${temaId}`);
  };
  
  return (
    <div className="lateral-bloques">
      <div className="lateral-bloques-header">
        Bloques de contenido
      </div>
      
      {data.bloque.map((bloque) => (
        <div key={bloque.codigo} className="bloque-container">
          <div 
            className={`bloque-item ${openBloque === bloque.codigo ? 'active' : ''}`}
            onClick={() => toggleBloque(bloque.codigo)}
          >
            <div className="bloque-title">
              <span className="bloque-codigo">{bloque.codigo}</span>
              <span className="bloque-descripcion">{bloque.descripcion}</span>
              <i className={`bi bi-chevron-right bloque-toggle ${openBloque === bloque.codigo ? 'open' : ''}`}></i>
            </div>
          </div>
          
          {bloque.tema && (
            <div className={`tema-list ${openBloque === bloque.codigo ? 'open' : ''}`}>
              {bloque.tema.map((tema) => (
                <div 
                  key={tema.codigo}
                  className={`tema-item ${activeTema === tema.codigo ? 'active' : ''}`}
                  onClick={() => handleTemaClick(tema.codigo)}
                >
                  <span className="tema-codigo">{tema.codigo}</span>
                  <span className="tema-descripcion">{tema.descripcion}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default LateralBloques; 