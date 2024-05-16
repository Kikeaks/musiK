import React, { Fragment } from "react";

// Componente para mostrar los detalles de una canción.
const CancionCard = ({ cancion, onCancionClick }) => {
  return (
    <Fragment>
      {/* Contenedor principal de la tarjeta de la canción */}
      <div
        className="cancion shadow-lg p-3 backdrop-blur-md rounded hover:bg-neutral-800 duration-300 ease-in cursor-pointer group bg-cards"
        onClick={onCancionClick}
      >
        {/* Imagen de la portada del álbum */}
        <div className="rounded">
          <img
            className="object-cover aspect-square w-100 h-100 rounded"
            src={cancion.album.cover_medium}
            alt={cancion.title}
          />
        </div>

        {/* Información de la canción */}
        <div className="cancion-info desc mt-2 text-left">
          {/* Título de la canción */}
          <p className="cancion-titulo font-semibold text-onNeutralBg truncate">
            {cancion.title}
          </p>
          {/* Nombre del artista */}
          <p className="cancion-artista font-normal text-secondary truncate">
            {cancion.artist.name}
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default CancionCard;
