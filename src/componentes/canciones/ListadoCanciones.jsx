import React from "react";
import Cancion from "./Cancion.jsx";
import { useReproductor } from "../../hooks/useReproductor.js";

// Componente para mostrar una lista de canciones.
const ListadoCanciones = ({ canciones }) => {
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
      {canciones.length ? (
        // Renderiza cada canción en la lista.
        canciones.map((cancion, index) => (
          <Cancion
            key={index} // Agrega la clave para cada elemento en la lista.
            cancion={cancion}
            index={index}
            reproducirCancion={reproducirCancion}
          />
        ))
      ) : (
        // Muestra un mensaje cuando la lista está vacía.
        <p className="text-center font-semibold">
          ¡Vaya, la lista está vacía! :(
        </p>
      )}
    </div>
  );
};

export default ListadoCanciones;
