import React from "react";
import ArtistaCard from "./ArtistaCard";

// Componente para mostrar una cuadrícula de artistas.
const ArtistasCuadricula = ({ artistas }) => {
  return (
    <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-7 gap-8">
      {artistas.map((artista, index) => (
        // Renderiza una tarjeta para cada artista en la cuadrícula.
        <ArtistaCard key={index} artista={artista} />
      ))}
    </div>
  );
};

export default ArtistasCuadricula;
