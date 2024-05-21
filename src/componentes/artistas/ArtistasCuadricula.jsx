import React from "react";

import ArtistaCard from "./ArtistaCard";

const ArtistasCuadricula = ({ artistas }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
      {artistas.map((artista) => (
        <ArtistaCard artista={artista} />
      ))}
    </div>
  );
};

export default ArtistasCuadricula;
