import React, { Fragment, useState } from "react";
import CancionCard from "./CancionCard";
import ModalAgregarAPlaylist from "../modales/ModalAgregarAPlaylist";

// Componente para mostrar las canciones en cuadrícula en la página "Explorar".
const CancionesCuadricula = ({ canciones }) => {
  // Estado para controlar la apertura y cierre del modal.
  const [modalAbierto, setModalAbierto] = useState(false);
  // Estado para almacenar la canción seleccionada.
  const [cancionSeleccionada, setCancionSeleccionada] = useState(null);

  // Función para abrir el modal y almacenar la canción seleccionada.
  const abrirModal = (cancion) => {
    setCancionSeleccionada(cancion);
    setModalAbierto(true);
  };

  // Función para cerrar el modal.
  const cerrarModal = () => {
    setModalAbierto(false);
  };

  return (
    <Fragment>
      {/* Contenedor de la cuadrícula de canciones */}
      <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-7 gap-8">
        {/* Mapeo de las canciones para crear las tarjetas */}
        {canciones.map((cancion, index) => (
          <CancionCard
            key={index}
            cancion={cancion}
            onCancionClick={() => abrirModal(cancion)}
          />
        ))}
      </div>
      {/* Modal para agregar a la playlist */}
      <ModalAgregarAPlaylist
        mostrar={modalAbierto}
        manejarCerrado={cerrarModal}
        cancion={cancionSeleccionada}
      />
    </Fragment>
  );
};

export default CancionesCuadricula;
