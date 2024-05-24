import React, { Fragment } from "react";
import CancionArtista from "./CancionArtista.jsx";
import { useReproductor } from "../../hooks/useReproductor.js";

const ListadoCancionesArtista = ({ canciones }) => {
  const { setPlaylist, setCurrentTrackIndex, iniciarReproduccion } =
    useReproductor();

  const reproducirCancion = (index) => {
    setPlaylist(canciones);
    setCurrentTrackIndex(index);
    iniciarReproduccion(index);
  };
  return (
    <div className="p-2">
      {canciones.length ? (
        canciones.map((cancion, index) => (
          <CancionArtista
            key={cancion.id}
            id={cancion.id}
            cancion={cancion}
            index={index}
            reproducirCancion={reproducirCancion}
          />
        ))
      ) : (
        <p className="text-center font-semibold">
          No hay canciones destacadas para este artista.
        </p>
      )}
    </div>
  );
};

export default ListadoCancionesArtista;
