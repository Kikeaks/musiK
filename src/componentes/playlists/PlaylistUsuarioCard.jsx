import React from "react";
import { Link } from "react-router-dom";

// Componente para mostrar los detalles de una playlist del usuario.
const PlaylistUsuarioCard = ({ playlist }) => {
  return (
    <div className="playlist shadow-lg p-3 rounded hover:bg-neutral-800 duration-300 ease-in cursor-pointer group bg-cards">
      {/* Enlace a la página de la playlist del usuario */}
      <Link
        to={`/playlists/bbdd/${playlist.id}`}
        className="duration-300 ease-in cursor-pointer group"
      >
        {/* Tarjeta de la playlist del usuario */}
        <div
          id={playlist.id}
          className="flex flex-col justify-center items-center mt-1"
        >
          <div className="w-full" style={{ maxWidth: "250px" }}>
            <img
              src={
                playlist.portada
                  ? playlist.portada
                  : "https://i.pinimg.com/originals/dd/53/31/dd5331bc3dd9fdffead6ed1bef96cd90.jpg"
              }
              className="object-cover aspect-square rounded shadow-md w-full"
            />
          </div>
        </div>
        {/* Detalles de la playlist */}
        <div className="playlist-info desc mt-2">
          {/* Título de la playlist */}
          <p className="playlist-titulo font-semibold truncate">
            {playlist.nombre}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default PlaylistUsuarioCard;
