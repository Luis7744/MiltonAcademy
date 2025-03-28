/**
 * Encuentra un tema por su código en los datos
 * @param {Object} data - Datos completos del curso
 * @param {string} temaId - Código del tema a buscar (ej: "b4t7")
 * @returns {Object} - Objeto con el tema y su bloque correspondiente
 */
export const getTemaByCodigo = (data, temaId) => {
  for (let b of data.bloque) {
    if (!b.tema) continue;
    const found = b.tema.find((t) => t.codigo === temaId);
    if (found) return { tema: found, bloque: b };
  }
  return { tema: null, bloque: null };
};

/**
 * Encuentra una lección por su código
 * @param {Array} lecciones - Array de lecciones
 * @param {string} codigo - Código de la lección a buscar
 * @returns {Object|null} - Lección encontrada o null
 */
export const getLeccionByCodigo = (lecciones, codigo) => {
  return lecciones?.find(l => l.codigo === codigo) || null;
};

/**
 * Encuentra un bloque por su código
 * @param {Object} data - Datos completos del curso
 * @param {string} bloqueId - Código del bloque a buscar
 * @returns {Object|null} - Bloque encontrado o null
 */
export const getBloqueByCodigo = (data, bloqueId) => {
  return data.bloque.find(b => b.codigo === bloqueId) || null;
};

/**
 * Obtiene los conceptos de una lección
 * @param {Object} leccion - Lección de la que extraer conceptos
 * @returns {Array} - Array de conceptos
 */
export const getConceptosFromLeccion = (leccion) => {
  return leccion?.concepto || [];
};

/**
 * Agrupa lecciones por columna para visualización
 * @param {Array} lecciones - Array de lecciones
 * @returns {Object} - Lecciones agrupadas por columna
 */
export const agruparLeccionesPorColumna = (lecciones) => {
  const resultado = {
    columna1: [],
    columna2: [],
    columna3: [],
    columna4: []
  };
  
  if (!lecciones) return resultado;
  
  lecciones.forEach(leccion => {
    const columna = leccion.columna || 1;
    const key = `columna${columna}`;
    if (resultado[key]) {
      resultado[key].push(leccion);
    } else {
      resultado.columna1.push(leccion);
    }
  });
  
  return resultado;
}; 