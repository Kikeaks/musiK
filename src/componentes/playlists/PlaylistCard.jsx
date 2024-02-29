import React, { Fragment } from "react";
import { Link } from "react-router-dom";

// Componente para mostrar los detalles de una playlist.
const PlaylistCard = ({ playlist }) => {
  return (
    <Fragment>
      {/* Enlace a la página de detalles de la playlist */}
      <Link to={`/playlists/deezer/${playlist.id}`}>
        <div
          id={playlist.id}
          className="playlist shadow-lg p-3 backdrop-blur-md rounded hover:backdrop-blur-2xl duration-300 ease-in cursor-pointer group"
        >
          <div className="rounded">
            {/* Imagen de la playlist */}
            <img
              className="object-cover aspect-square w-100 h-100 rounded"
              src={playlist.picture_medium}
              alt={playlist.title}
            />
          </div>
          {/* Información de la playlist */}
          <div className="playlist-info desc mt-2 text-left">
            <p className="playlist-titulo font-semibold text-onNeutralBg truncate">
              {playlist.title}
            </p>
            <p className="playlist-creador font-normal text-secondary truncate">
              {playlist.nb_tracks} canciones
            </p>
          </div>
        </div>
      </Link>
    </Fragment>
  );
};

export default PlaylistCard;
