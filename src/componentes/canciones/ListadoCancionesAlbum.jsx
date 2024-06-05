import React, { Fragment } from "react";
import CancionAlbum from "./CancionAlbum.jsx";
import Carga from "../interfaz/Carga.jsx";
import { useReproductor } from "../../hooks/useReproductor.js";

// Componente para mostrar el listado de canciones de un álbum.
const ListadoCancionesAlbum = ({ canciones, album }) => {
  const { setPlaylist, setCurrentTrackIndex, iniciarReproduccion } =
    useReproductor();

  // Función para reproducir una canción.
  const reproducirCancion = (index) => {
    setPlaylist(canciones); // Establece la lista de reproducción.
    setCurrentTrackIndex(index); // Establece la canción actual por su índice.
    iniciarReproduccion(index); // Inicia la reproducción de la canción.
  };

  return (
    <div className="p-2">
      {/* Verifica si hay canciones antes de mapear sobre ellas. */}
      {canciones.length ? (
        canciones.map((cancion, index) => (
          // Componente para mostrar detalles de cada canción.
          <CancionAlbum
            key={cancion.id} // Clave única para cada canción.
            id={cancion.id}
            cancion={cancion}
            album={album}
            index={index}
            reproducirCancion={reproducirCancion}
          />
        ))
      ) : (
        // Muestra un indicador de carga si no hay canciones.
        <Carga />
      )}
    </div>
  );
};

export default ListadoCancionesAlbum;
