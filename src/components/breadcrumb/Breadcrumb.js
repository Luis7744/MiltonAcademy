import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/styles/components/breadcrumb/Breadcrumb.css';

function Breadcrumb({ items }) {
  return (
    <nav aria-label="breadcrumb" className="breadcrumb-container">
      <ol className="breadcrumb">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          if (isLast || item.active) {
            return (
              <li key={index} className="breadcrumb-item active" aria-current="page">
                {item.label}
              </li>
            );
          }
          
          return (
            <li key={index} className="breadcrumb-item">
              <Link to={item.path}>{item.label}</Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumb; 