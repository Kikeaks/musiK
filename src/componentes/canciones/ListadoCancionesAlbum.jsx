import React, { Fragment } from "react";
import CancionAlbum from "./CancionAlbum.jsx";
import Carga from "../interfaz/Carga.jsx";

// Componente para mostrar el listado de canciones.
const ListadoCancionesAlbum = ({ canciones, portada }) => {
  return (
    <div className="p-2">
      {/* Verifica si hay canciones antes de mapear sobre ellas. */}
      {canciones.length ? (
        canciones.map((cancion) => (
          // Componente para mostrar detalles de cada canción.
          <CancionAlbum
            key={cancion.id}
            id={cancion.id}
            cancion={cancion}
            portada={portada}
          />
        ))
      ) : (
        <Carga />
      )}
    </div>
  );
};

export default ListadoCancionesAlbum;
