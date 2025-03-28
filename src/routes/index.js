import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import TemaDetail from '../features/curso/bloque/tema/TemaDetail';
import MicroLeccionDetail from '../features/curso/bloque/tema/leccion/MicroLeccionDetail';
import Home from '../features/dashboard/Home';
import CursosPage from '../features/curso/CursosPage';
import SearchResults from '../features/search/SearchResults';
import PageNotImplemented from '../components/common/PageNotImplemented';

// Componente temporal para páginas no implementadas
const NotImplemented = () => (
  <div className="container mt-5">
    <h2>Página en construcción</h2>
    <p>Esta funcionalidad estará disponible próximamente.</p>
    <a href="/" className="btn btn-primary">Volver al inicio</a>
  </div>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/cursos',
    element: <CursosPage />
  },
  {
    path: '/tema/:temaId',
    element: <TemaDetail />
  },
  {
    path: '/leccion/:leccionId',
    element: <MicroLeccionDetail />
  },
  {
    path: '/leccion/:leccionId/micro/:microId',
    element: <MicroLeccionDetail />
  },
  {
    path: '/search',
    element: <SearchResults />
  },
  {
    path: '/bloque/:bloqueId',
    element: <PageNotImplemented />
  },
  {
    path: '/eventos',
    element: <NotImplemented />
  },
  {
    path: '/recursos',
    element: <NotImplemented />
  },
  {
    path: '/faq',
    element: <NotImplemented />
  },
  {
    path: '/novedades',
    element: <NotImplemented />
  },
  {
    path: '/planificacion',
    element: <NotImplemented />
  },
  {
    path: '*',
    element: <PageNotImplemented />
  }
]); 