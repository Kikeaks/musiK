import React, { useState } from "react";
import { useUsuarios } from "../../hooks/useUsuarios.js";
import { faPlay, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalQuitarDePlaylist from "../modales/ModalQuitarDePlaylist.jsx";

// Componente para mostrar los detalles de una canción en la playlist del usuario.
const CancionPlaylistUsuario = ({
  cancion,
  playlist,
  index,
  reproducirCancion,
}) => {
  // Estado para controlar la apertura y cierre del modal.
  const [modalAbierto, setModalAbierto] = useState(false);

  // Función para abrir el modal.
  const abrirModal = () => {
    setModalAbierto(true);
  };

  // Función para cerrar el modal.
  const cerrarModal = () => {
    setModalAbierto(false);
  };

  const { usuario } = useUsuarios();

  return (
    <div className="cancion flex items-center shadow-lg p-3 rounded group mb-2 mx-2 bg-cards">
      {/* Imagen de la portada del álbum */}
      <div className="relative mr-2 group">
        <img
          className="rounded object-cover"
          src={cancion.portada}
          alt={cancion.nombre}
        />
        {/* Overlay con el ícono */}
        <div
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded"
          onClick={() => reproducirCancion(index)} // Reproducir canción al hacer clic en el overlay
        >
          <FontAwesomeIcon
            icon={faPlay}
            className="text-white hover:text-highlight cursor-pointer fa-lg duration-300 ease-in-out group"
          />
        </div>
      </div>

      {/* Información de la canción */}
      <div className="cancion-info truncate">
        {/* Título de la canción */}
        <p className="cancion-titulo font-semibold text-sm">{cancion.nombre}</p>
        {/* Nombre del artista */}
        <p className="cancion-artista text-sm text-neutral-400">
          {cancion.artista}
        </p>
      </div>
      {/* Icono para quitar la canción de la playlist */}
      {usuario.id === playlist.usuario && (
        <div className="ml-auto">
          <FontAwesomeIcon
            icon={faXmark}
            className="ml-3 hover:text-red-500 duration-300 ease-in cursor-pointer group"
            onClick={abrirModal}
          />
        </div>
      )}

      {/* Modal para quitar la canción de la playlist */}
      <ModalQuitarDePlaylist
        mostrar={modalAbierto}
        manejarCerrado={cerrarModal}
        cancion={cancion}
        playlist={playlist.id}
      />
    </div>
  );
};

export default CancionPlaylistUsuario;
