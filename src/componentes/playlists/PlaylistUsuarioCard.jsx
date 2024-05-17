import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { usePlaylists } from "../../hooks/usePlaylists";

// Componente para mostrar los detalles de una playlist del usuario.
const PlaylistUsuarioCard = ({ playlist }) => {
  const { obtenerCancionesPlaylistUsuario } = usePlaylists();

  // Manejador de clic para obtener las canciones de la playlist al hacer clic en ella.
  const handleClickPlaylist = async () => {
    try {
      // Llama a la función para obtener las canciones de la playlist del usuario.
      await obtenerCancionesPlaylistUsuario(playlist.id);
    } catch (error) {
      console.error(
        "Error al obtener las canciones de la playlist:",
        error.message
      );
    }
  };

  return (
    <Fragment>
      {/* Enlace a la página de la playlist del usuario */}
      <Link to={`/playlists/bbdd/${playlist.id}`} onClick={handleClickPlaylist}>
        {/* Tarjeta de la playlist del usuario */}
        <div
          id={playlist.id}
          className="playlist bg-cards p-3 rounded hover:bg-neutral-800 duration-300 ease-in cursor-pointer group"
        >
          <div className="flex flex-col justify-center items-center">
            <img src={playlist.portada ? playlist.portada : "https://i.pinimg.com/originals/dd/53/31/dd5331bc3dd9fdffead6ed1bef96cd90.jpg"} className="object-cover aspect-square rounded shadow" />
          </div>
          {/* Detalles de la playlist */}
          <div className="playlist-info desc mt-2">
            {/* Título de la playlist */}
            <p className="playlist-titulo font-semibold truncate">
              {playlist.nombre}
            </p>
          </div>
        </div>
      </Link>
    </Fragment>
  );
};

export default PlaylistUsuarioCard;
