import React, { Fragment } from "react";

// Componente para mostrar los detalles de una canción.
const CancionCard = ({ cancion }) => {
  return (
    <Fragment>
      <div className="cancion flex flex-col items-center bg-slate-800 p-2 m-2 rounded-lg">
        <img
          className="rounded-lg mb-2"
          src={cancion.album.cover_medium}
          alt={cancion.title}
        />
        <div className="cancion-info text-center">
          <p className="cancion-titulo">{cancion.title}</p>
          <p className="cancion-artista">{cancion.artist.name}</p>
        </div>
      </div>
    </Fragment>
  );
};

export default CancionCard;
