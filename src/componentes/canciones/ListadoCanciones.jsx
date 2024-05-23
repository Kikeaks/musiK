import React from "react";
import Cancion from "./Cancion.jsx";
import { useReproductor } from "../../hooks/useReproductor.js";

const ListadoCanciones = ({ canciones }) => {
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
          <Cancion
            cancion={cancion}
            index={index}
            reproducirCancion={reproducirCancion}
          />
        ))
      ) : (
        <p className="text-center font-semibold">
          ¡Vaya, la playlist está vacía!
        </p>
      )}
    </div>
  );
};

export default ListadoCanciones;
