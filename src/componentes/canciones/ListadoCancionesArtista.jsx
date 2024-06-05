import React, { Fragment } from "react";
import CancionArtista from "./CancionArtista.jsx";
import { useReproductor } from "../../hooks/useReproductor.js";

// Componente para mostrar el listado de canciones de un artista.
const ListadoCancionesArtista = ({ canciones }) => {
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
          <CancionArtista
            key={cancion.id} // Clave única para cada canción.
            id={cancion.id}
            cancion={cancion}
            index={index}
            reproducirCancion={reproducirCancion}
          />
        ))
      ) : (
        // Muestra un mensaje cuando no hay canciones.
        <p className="text-center font-semibold">
          No hay canciones destacadas para este artista.
        </p>
      )}
    </div>
  );
};

export default ListadoCancionesArtista;
