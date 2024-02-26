import React, { Fragment } from "react";
import Cancion from "./Cancion.jsx";
import CancionCard from "../cards/CancionCard.jsx";

// Componente para mostrar el listado de canciones.
const ListadoCanciones = ({ canciones }) => {
  return (
    <Fragment>
      {/* Verifica si hay canciones antes de mapear sobre ellas. */}
      {canciones.length ? (
        canciones.map((cancion) => (
          // Componente para mostrar detalles de cada canción.
          <CancionCard key={cancion.id} id={cancion.id} cancion={cancion} />
        ))
      ) : (
        // Mensaje si no se encuentran canciones.
        <p>No se han encontrado canciones.</p>
      )}
    </Fragment>
  );
};

export default ListadoCanciones;
