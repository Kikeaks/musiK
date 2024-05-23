import React, { Fragment } from "react";
import CancionAlbum from "./CancionAlbum.jsx";
import Carga from "../interfaz/Carga.jsx";
import { useReproductor } from "../../hooks/useReproductor.js";

// Componente para mostrar el listado de canciones.
const ListadoCancionesAlbum = ({ canciones, album }) => {
  const { setPlaylist, setCurrentTrackIndex, iniciarReproduccion } =
    useReproductor();

  const reproducirCancion = (index) => {
    setPlaylist(canciones);
    setCurrentTrackIndex(index);
    iniciarReproduccion(index);
  };
  return (
    <div className="p-2">
      {/* Verifica si hay canciones antes de mapear sobre ellas. */}
      {canciones.length ? (
        canciones.map((cancion, index) => (
          // Componente para mostrar detalles de cada canción.
          <CancionAlbum
            key={cancion.id}
            id={cancion.id}
            cancion={cancion}
            album={album}
            index={index}
            reproducirCancion={reproducirCancion}
          />
        ))
      ) : (
        <Carga />
      )}
    </div>
  );
};

export default ListadoCancionesAlbum;
