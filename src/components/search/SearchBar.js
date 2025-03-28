import React, { useState } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/components/search/SearchBar.css';

function SearchBar({ initialValue = '' }) {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const navigate = useNavigate();
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };
  
  return (
    <div className="search-container">
      <Form onSubmit={handleSearch}>
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Buscar cursos, temas, lecciones..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <Button variant="primary" type="submit">
            <i className="bi bi-search"></i> Buscar
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
}

export default SearchBar; 