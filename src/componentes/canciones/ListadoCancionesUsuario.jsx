import React, { Fragment } from "react";
import CancionPlaylistUsuario from "./CancionPlaylistUsuario.jsx";
import { useCanciones } from "../../hooks/useCanciones.js";
import { useReproductor } from "../../hooks/useReproductor.js";

// Componente para mostrar el listado de canciones.
const ListadoCancionesUsuario = ({ canciones, playlist }) => {
  const { iniciarReproduccion } = useCanciones();
  const { setPlaylist } = useReproductor();

  const reproducirCancion = (index) => {
    setPlaylist(canciones); // Configura la lista de reproducción
    iniciarReproduccion(index); // Inicia la reproducción de la canción seleccionada
  };

  return (
    <Fragment>
      {/* Verifica si hay canciones antes de mapear sobre ellas. */}
      {canciones.length ? (
        canciones.map((cancion, index) => (
          <div key={cancion.id_deezer}>
            <CancionPlaylistUsuario
              cancion={cancion}
              playlist={playlist}
              index={index}
              reproducirCancion={reproducirCancion} // Pasar la función aquí
            />
          </div>
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