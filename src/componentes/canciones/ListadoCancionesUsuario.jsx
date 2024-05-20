import React, { Fragment } from "react";
import CancionPlaylistUsuario from "./CancionPlaylistUsuario.jsx";

// Componente para mostrar el listado de canciones.
const ListadoCancionesUsuario = ({ canciones, playlist }) => {
  return (
    <Fragment>
      {/* Verifica si hay canciones antes de mapear sobre ellas. */}
      {canciones.length ? (
        canciones.map((cancion) => (
          // Componente para mostrar detalles de cada canción.
          <CancionPlaylistUsuario
            key={cancion.id_deezer}
            cancion={cancion}
            playlist={playlist}
          />
        ))
      ) : (
        // Mensaje si no se encuentran canciones.
        <p className="text-center font-semibold">
          ¡Vaya, la playlist está vacía! :(
        </p>
      )}
    </Fragment>
  );
};

export default ListadoCancionesUsuario;