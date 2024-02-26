import React from "react";

// Componente para mostrar los detalles de una canción.
const Cancion = ({ cancion }) => (
  <div className="cancion flex items-center bg-slate-800 p-2 m-2 rounded-lg">
    <img
      className="rounded-lg mr-2"
      src={cancion.album.cover_small}
      alt={cancion.title}
    />
    <div className="cancion-info">
      <p className="cancion-titulo">{cancion.title}</p>
      <p className="cancion-artista">{cancion.artist.name}</p>
    </div>
    <p className="cancion-duracion ml-auto">
      {Math.floor(cancion.duration / 60)}:
      {(cancion.duration % 60).toString().padStart(2, "0")}
    </p>
  </div>
);

export default Cancion;
