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
          className="playlist shadow-lg p-3 rounded hover:bg-neutral-800 duration-300 ease-in cursor-pointer group bg-cards" // Utilizamos flexbox para centrar los elementos vertical y horizontalmente
        >
          {/* Imagen de la playlist */}
          <div className="flex flex-col justify-center items-center mt-1">
            <img
              className="object-cover aspect-square rounded shadow-lg size-44 sm:size-36 md:size-52 lg:size-40 xl:size-52"
              src={playlist.picture_medium}
              alt={playlist.title}
            />
          </div>
          {/* Información de la playlist */}
          <div className="playlist-info desc mt-3 mx-0 md:mx-1">
            {" "}
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
