import React from 'react';
import Breadcrumb from './Breadcrumb';

function CourseBreadcrumb({ bloque, tema, leccion, microleccion }) {
  const breadcrumbItems = [
    {
      label: 'Inicio',
      path: '/'
    },
    {
      label: 'Cursos',
      path: '/cursos'
    }
  ];

  if (bloque) {
    breadcrumbItems.push({
      label: `Bloque ${bloque.codigo}: ${bloque.descripcion}`,
      path: `/bloque/${bloque.codigo}`
    });
  }

  if (tema) {
    breadcrumbItems.push({
      label: `${tema.codigo}: ${tema.descripcion}`,
      path: `/tema/${tema.codigo}`
    });
  }

  if (leccion) {
    breadcrumbItems.push({
      label: `${leccion.codigo}: ${leccion.descripcion}`,
      path: `/leccion/${leccion.codigo}`
    });
  }

  if (microleccion) {
    breadcrumbItems.push({
      label: microleccion.descripcion,
      active: true
    });
  }

  return <Breadcrumb items={breadcrumbItems} />;
}

export default CourseBreadcrumb; 