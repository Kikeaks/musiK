import React, { Fragment } from "react";

// Componente para mostrar los detalles de una canción.
const CancionCard = ({ cancion }) => {
  return (
    <Fragment>
      <div className="cancion shadow-lg p-3 backdrop-blur-md rounded hover:backdrop-blur-2xl duration-300 ease-in cursor-pointer group">
        <div className="rounded">
          <img
            className="object-cover aspect-square w-100 h-100 rounded"
            src={cancion.album.cover_medium}
            alt={cancion.title}
          />
        </div>

        <div className="cancion-info desc mt-2 text-left">
          <p className="cancion-titulo font-semibold text-onNeutralBg truncate">
            {cancion.title}
          </p>
          <p className="cancion-artista font-normal text-secondary truncate">
            {cancion.artist.name}
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default CancionCard;
