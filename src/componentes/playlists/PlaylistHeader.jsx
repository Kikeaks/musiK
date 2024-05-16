import React from "react";

const PlaylistHeader = ({ portada, fondo, titulo, descripcion, creador }) => {
  return (
    <div className="bg-center bg-cover rounded" style={{ backgroundImage: `url(${fondo})` }}>
      <div
        className="flex items-center p-3 backdrop-blur-md group mb-3"
      >
        <img className="rounded shadow-2xl" src={portada} /> {/* Muestra la imagen de la playlist */}
        {/* Muestra la información de la playlist */}
        <div className="playlist-info desc ml-4 text-left">
          <h1 className="mb-2 font-bold">{titulo}</h1>{" "}
          {/* Título de la playlist */}
          <p className="mb-2">{descripcion}</p>{" "}
          {/* Descripción de la playlist */}
          <p className="text-sm">Creada por · {creador}</p>{" "}
          {/* Creador de la playlist */}
        </div>
      </div>
    </div>
  );
};

export default PlaylistHeader;
