import React, { Fragment, useState } from "react";
import CancionCard from "./CancionCard";
import ModalAgregarAPlaylist from "../modales/ModalAgregarAPlaylist";

const CancionesCuadricula = ({ canciones }) => {
  const [modalAbierto, setModalAbierto] = useState(false); // Estado para controlar la apertura y cierre del modal
  const [cancionSeleccionada, setCancionSeleccionada] = useState(null); // Estado para almacenar la canción seleccionada

  // Función para abrir el modal y almacenar la canción seleccionada
  const abrirModal = (cancion) => {
    setCancionSeleccionada(cancion);
    setModalAbierto(true);
  };

  // Función para cerrar el modal
  const cerrarModal = () => {
    setModalAbierto(false);
  };

  return (
    <Fragment>
      <div className="p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-8">
        {canciones.map((cancion, index) => (
          <CancionCard
            key={index}
            cancion={cancion}
            onCancionClick={() => abrirModal(cancion)}
          />
        ))}
      </div>
      <ModalAgregarAPlaylist
        mostrar={modalAbierto}
        manejarCerrado={cerrarModal}
        cancion={cancionSeleccionada}
      />
    </Fragment>
  );
};

export default CancionesCuadricula;
