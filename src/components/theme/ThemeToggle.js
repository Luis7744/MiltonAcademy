import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import '../../assets/styles/components/theme/ThemeToggle.css';

function ThemeToggle() {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="theme-toggle">
      <span className="theme-label">
        {darkMode ? 'Modo oscuro' : 'Modo claro'}
      </span>
      <label className="switch">
        <input 
          type="checkbox" 
          checked={darkMode} 
          onChange={toggleTheme} 
          aria-label="Cambiar tema"
        />
        <span className="slider round">
          <i className={`bi ${darkMode ? 'bi-moon-fill' : 'bi-sun-fill'}`}></i>
        </span>
      </label>
    </div>
  );
}

export default ThemeToggle; 