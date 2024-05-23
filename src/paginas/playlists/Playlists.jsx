import React, { Fragment, useState } from "react";
import { usePlaylists } from "../../hooks/usePlaylists";
import { useUsuarios } from "../../hooks/useUsuarios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import ModalCrearPlaylist from "../../componentes/modales/ModalCrearPlaylist";

// Componente para la página de playlists.
const Playlists = () => {
  const { cargarPlaylistsUsuario } = usePlaylists(); // Cargar playlists del usuario
  const { sesionIniciada } = useUsuarios(); // Obtiene el estado de la sesión desde el hook useUsuarios.
  const [mostrarModal, setMostrarModal] = useState(false); // Define el estado para controlar la visibilidad del modal de creación de playlist.

  // Función para abrir el modal de creación de playlist
  const abrirModal = () => {
    setMostrarModal(true);
  };

  // Función para cerrar el modal de creación de playlist
  const cerrarModal = () => {
    setMostrarModal(false);
    cargarPlaylistsUsuario(); // Recarga las playlists del usuario después de cerrar el modal.
  };

  return (
    <Fragment>
      <div>
        <div className="flex align-center justify-center">
          {sesionIniciada ? (
            <button className="mt-2" onClick={abrirModal}>
              <FontAwesomeIcon icon={faPlusCircle} className="mr-2" />
              Crear playlist
            </button>
          ) : (
            <p className="text-center mt-2 font-semibold">
              Para poder crear y ver tus playlists, inicia sesión.
            </p>
          )}
        </div>
      </div>
      {/* Modal para crear playlist */}
      <ModalCrearPlaylist mostrar={mostrarModal} manejarCerrado={cerrarModal} />
    </Fragment>
  );
};

export default Playlists;
