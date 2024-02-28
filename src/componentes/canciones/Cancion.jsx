import React from "react";

// Componente para mostrar los detalles de una canción.
const Cancion = ({ cancion }) => (
  <div className="cancion flex items-center shadow-lg p-3 backdrop-blur-md rounded hover:backdrop-blur-2xl duration-300 ease-in cursor-pointer group mb-3">
    <img
      className="rounded mr-2"
      src={cancion.album.cover_small}
      alt={cancion.title}
    />
    <div className="cancion-info">
      <p className="cancion-titulo font-semibold text-sm">{cancion.title}</p>
      <p className="cancion-artista text-sm">{cancion.artist.name}</p>
    </div>
    <p className="cancion-duracion ml-auto font-semibold">
      {Math.floor(cancion.duration / 60)}:
      {(cancion.duration % 60).toString().padStart(2, "0")}
    </p>
  </div>
);

export default Cancion;
