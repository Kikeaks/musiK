import React from "react";
import { useUsuarios } from "../../hooks/useUsuarios";

const PlaylistHeader = ({ portada, titulo, descripcion, creador }) => {
  const { usuario } = useUsuarios();
  return (
    <div
      className="bg-center bg-cover"
      style={{ backgroundImage: `url(${portada})` }}
    >
      {/* Se le aplica "backdrop-blur" para desenfocar el fondo */}
      <div className="flex flex-col sm:flex-row p-3 items-center backdrop-blur-md group mb-2">
        {/* Muestra la imagen de la playlist */}
        <img
          className="rounded shadow-2xl sm:mb-0 mb-4 sm:mr-4"
          style={{ maxWidth: "250px" }}
          src={portada}
        />
        {/* Muestra la información de la playlist */}
        <div className="playlist-info desc text-center sm:text-left">
          {/* Título de la playlist */}
          <h1 className="mb-2 font-bold text-4xl sm:text-5xl">{titulo}</h1>{" "}
          {/* Descripción de la playlist */}
          <p className="mb-2">{descripcion}</p> {/* Creador de la playlist */}
          <p className="text-sm">Creada por · {creador}</p>{" "}
        </div>
      </div>
    </div>
  );
};

export default PlaylistHeader;
