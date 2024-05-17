import { faCircleXmark, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import ModalQuitarDePlaylist from "../modales/ModalQuitarDePlaylist.jsx";

// Componente para mostrar los detalles de una canción en la playlist del usuario.
const CancionPlaylistUsuario = ({ cancion, playlistId }) => {
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

  return (
    <div className="cancion flex items-center shadow-lg p-3 rounded group mb-3 bg-cards">
      {/* Imagen de la portada del álbum */}
      <div className="relative mr-2 group">
        <img
          className="rounded object-cover"
          src={cancion.portada}
          alt={cancion.nombre}
        />
        {/* Overlay con el ícono */}
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded">
          <FontAwesomeIcon
            icon={faPlay}
            className="text-white hover:text-highlight cursor-pointer fa-lg duration-300 ease-in-out group"
          />
        </div>
      </div>

      {/* Información de la canción */}
      <div className="cancion-info">
        {/* Título de la canción */}
        <p className="cancion-titulo font-semibold">{cancion.nombre}</p>
        {/* Nombre del artista */}
        <p className="cancion-artista text-sm text-neutral-400">
          {cancion.artista}
        </p>
      </div>
      {/* Duración de la canción */}
      <p className="cancion-duracion ml-auto font-semibold">
        {/* Se muestra la duración en minutos y segundos */}
        {Math.floor(cancion.duracion / 60)}:
        {(cancion.duracion % 60).toString().padStart(2, "0")}
      </p>
      {/* Icono para quitar la canción de la playlist */}
      <FontAwesomeIcon
        icon={faCircleXmark}
        className="ml-3 hover:text-red-500 duration-300 ease-in cursor-pointer group"
        onClick={abrirModal}
      />
      {/* Modal para quitar la canción de la playlist */}
      <ModalQuitarDePlaylist
        mostrar={modalAbierto}
        manejarCerrado={cerrarModal}
        cancion={cancion}
        playlistId={playlistId}
      />
    </div>
  );
};

export default CancionPlaylistUsuario;
