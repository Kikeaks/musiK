import React, { Fragment } from "react";
import CancionPlaylistUsuario from "./CancionPlaylistUsuario.jsx";

// Componente para mostrar el listado de canciones.
const ListadoCancionesUsuario = ({ canciones, playlistId }) => {
  return (
    <Fragment>
      {/* Verifica si hay canciones antes de mapear sobre ellas. */}
      {canciones.length ? (
        canciones.map((cancion) => (
          // Componente para mostrar detalles de cada canción.
          <CancionPlaylistUsuario key={cancion.id_deezer} cancion={cancion} playlistId={playlistId} />
        ))
      ) : (
        // Mensaje si no se encuentran canciones.
        <p className="text-center font-semibold">
          ¡Vaya, la playlist está vacía!
          <br />
          Para añadir canciones, accede a la página "Explorar" o bien a una
          playlist de Deezer.
        </p>
      )}
    </Fragment>
  );
};

export default ListadoCancionesUsuario;
