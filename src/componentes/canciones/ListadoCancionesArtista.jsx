import React, { Fragment } from "react";
import CancionArtista from "./CancionArtista.jsx";

const ListadoCancionesArtista = ({ canciones }) => {
  return (
    <div className="p-2">
      {canciones.length ? (
        canciones.map((cancion) => (
          <CancionArtista key={cancion.id} id={cancion.id} cancion={cancion} />
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
