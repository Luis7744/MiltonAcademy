import React, { createContext, useState, useEffect } from 'react';

// Crear el contexto
export const ThemeContext = createContext();

// Proveedor del contexto
export const ThemeProvider = ({ children }) => {
  // Verificar si hay un tema guardado en localStorage
  const savedTheme = localStorage.getItem('theme');
  
  // Estado inicial basado en localStorage o preferencia del sistema
  const [darkMode, setDarkMode] = useState(() => {
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    // Si no hay tema guardado, usar preferencia del sistema
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Función para cambiar el tema
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // Aplicar la clase al elemento html cuando cambie el tema
  useEffect(() => {
    // Guardar el tema en localStorage
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    
    // Aplicar clase al elemento html
    if (darkMode) {
      document.documentElement.classList.add('dark-theme');
      document.documentElement.classList.remove('light-theme');
    } else {
      document.documentElement.classList.add('light-theme');
      document.documentElement.classList.remove('dark-theme');
    }
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}; 