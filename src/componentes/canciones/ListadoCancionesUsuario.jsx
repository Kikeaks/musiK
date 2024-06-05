import React from "react";
import CancionPlaylistUsuario from "./CancionPlaylistUsuario.jsx";
import { useCanciones } from "../../hooks/useCanciones.js";
import { useReproductor } from "../../hooks/useReproductor.js";

// Componente para mostrar el listado de canciones.
const ListadoCancionesUsuario = ({ canciones, playlist }) => {
  const { iniciarReproduccion } = useCanciones();
  const { setPlaylist, setCurrentTrackIndex } = useReproductor();

  const reproducirCancion = (index) => {
    // Configura la lista de reproducción y el índice de la canción actual en el reproductor.
    setPlaylist(canciones);
    setCurrentTrackIndex(index);
    iniciarReproduccion(index); // Inicia la reproducción de la canción seleccionada.
  };

  return (
    <div className="p-2 w-full md:w-3/4">
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
    </div>
  );
};

export default ListadoCancionesUsuario;
