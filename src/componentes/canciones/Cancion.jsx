import React from "react";

// Componente para mostrar los detalles de una canción.
const Cancion = ({ cancion }) => (
  // Contenedor principal del componente, muestra los detalles de la canción.
  <div className="cancion flex items-center shadow-lg p-3 rounded group mb-3 bg-cards">
    {/* Imagen de la portada del álbum. */}
    <img
      className="rounded mr-2"
      src={cancion.album.cover_small}
      alt={cancion.title}
    />
    {/* Información de la canción. */}
    <div className="cancion-info flex-1 min-w-0">
      {/* Título de la canción. */}
      <p className="cancion-titulo font-semibold text-sm">{cancion.title}</p>
      {/* Nombre del artista. */}
      <p className="cancion-artista text-sm text-neutral-400 truncate">{cancion.artist.name}</p>
    </div>
  </div>
);

export default Cancion;
