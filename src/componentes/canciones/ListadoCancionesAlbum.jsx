import React, { Fragment } from "react";
import CancionAlbum from "./CancionAlbum.jsx";

// Componente para mostrar el listado de canciones.
const ListadoCancionesAlbum = ({ canciones, portada }) => {
  return (
    <Fragment>
      {/* Verifica si hay canciones antes de mapear sobre ellas. */}
      {canciones.length ? (
        canciones.map((cancion) => (
          // Componente para mostrar detalles de cada canción.
          <CancionAlbum key={cancion.id} id={cancion.id} cancion={cancion} portada={portada} />
        ))
      ) : (
        // Mensaje si no se encuentran canciones.
        <p className="text-center font-semibold">
          ¡Vaya, la playlist está vacía!
          <br />
          Para añadir canciones, accede a la página "Explorar" o bien a una
          playlist de Deezer.
        </p>
      )}
    </Fragment>
  );
};

export default ListadoCancionesAlbum;
