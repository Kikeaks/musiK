import React from "react";

// Componente para mostrar los detalles de una canción.
const Cancion = ({ cancion }) => (
  // Contenedor principal del componente, muestra los detalles de la canción.
  <div className="cancion flex items-center shadow-lg p-3 backdrop-blur-md rounded group mb-3 bg-cards">
    {/* Imagen de la portada del álbum. */}
    <img
      className="rounded mr-2"
      src={cancion.album.cover_small}
      alt={cancion.title}
    />
    {/* Información de la canción. */}
    <div className="cancion-info">
      {/* Título de la canción. */}
      <p className="cancion-titulo font-semibold">{cancion.title}</p>
      {/* Nombre del artista. */}
      <p className="cancion-artista">{cancion.artist.name}</p>
    </div>
    {/* Duración de la canción. */}
    <p className="cancion-duracion ml-auto font-semibold">
      {/* Se calcula la duración en minutos y segundos. */}
      {Math.floor(cancion.duration / 60)}:
      {/* Asegura que el formato de los segundos tenga dos dígitos. */}
      {(cancion.duration % 60).toString().padStart(2, "0")}
    </p>
  </div>
);

export default Cancion;
