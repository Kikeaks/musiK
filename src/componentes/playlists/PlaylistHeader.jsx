import React from "react";

const PlaylistHeader = ({ portada, fondo, titulo, descripcion, creador }) => {
  return (
    <div className="bg-center bg-cover" style={{ backgroundImage: `url(${fondo})` }}>
      {/* Se le aplica "backdrop-blur" para desenfocar el fondo */}
      <div
        className="flex flex-col sm:flex-row items-center p-3 backdrop-blur-md group mb-3"
      >
        {/* Muestra la imagen de la playlist */}
        <img className="rounded shadow-2xl mb-4 sm:mb-0 sm:mr-4" src={portada} />
        {/* Muestra la información de la playlist */}
        <div className="playlist-info desc text-left">
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
