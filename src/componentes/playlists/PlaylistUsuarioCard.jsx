import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { usePlaylists } from "../../hooks/usePlaylists";

// Componente para mostrar los detalles de una playlist.
const PlaylistUsuarioCard = ({ playlist }) => {
  const { obtenerCancionesPlaylistUsuario } = usePlaylists();
  // Manejador de clic para obtener las canciones de la playlist al hacer clic en ella.
  const handleClickPlaylist = async () => {
    try {
      // Llama a la función para obtener las canciones de la playlist del usuario.
      const canciones = await obtenerCancionesPlaylistUsuario(playlist.id);
      // Haz lo que necesites con las canciones obtenidas, por ejemplo, mostrarlas en la página.
      console.log("Canciones de la playlist:", canciones);
    } catch (error) {
      console.error(
        "Error al obtener las canciones de la playlist:",
        error.message
      );
    }
  };

  return (
    <Fragment>
      <Link to={`/playlists/bbdd/${playlist.id}`} onClick={handleClickPlaylist}>
        <div
          id={playlist.id}
          className="playlist shadow-lg p-3 backdrop-blur-md rounded hover:backdrop-blur-2xl duration-300 ease-in cursor-pointer group"
        >
          <div className="playlist-info desc mt-2 text-left">
            <p className="playlist-titulo font-semibold text-onNeutralBg truncate">
              {playlist.nombre}
            </p>
          </div>
        </div>
      </Link>
    </Fragment>
  );
};

export default PlaylistUsuarioCard;
