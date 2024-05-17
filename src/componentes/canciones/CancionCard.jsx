import React, { Fragment } from "react";

// Componente para mostrar los detalles de una canción.
const CancionCard = ({ cancion, onCancionClick }) => {
  return (
    <Fragment>
      {/* Contenedor principal de la tarjeta de la canción */}
      <div
        className="cancion shadow-lg p-3 rounded hover:bg-neutral-800 duration-300 ease-in cursor-pointer group bg-cards"
        onClick={onCancionClick}
      >
        {/* Imagen de la portada del álbum */}
        <div className="flex flex-col justify-center items-center mt-1">
          <img
            className="object-cover aspect-square rounded shadow-lg size-36 md:size-40 xl:size-44 2xl:size-48"
            src={cancion.album.cover_medium}
            alt={cancion.title}
          />
        </div>

        {/* Información de la canción */}
        <div className="cancion-info desc mt-3 mx-1 md:mx-2 text-center">
          {/* Título de la canción */}
          <p className="cancion-titulo font-semibold truncate">
            {cancion.title}
          </p>
          {/* Nombre del artista */}
          <p className="cancion-artista text-sm text-neutral-400 truncate">
            {cancion.artist.name}
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default CancionCard;
