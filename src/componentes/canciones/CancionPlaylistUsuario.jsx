import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
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
    <div className="cancion flex items-center shadow-lg p-3 rounded mb-3">
      {/* Imagen de la portada del álbum */}
      <img
        className="rounded mr-2"
        src={cancion.portada}
        alt={cancion.nombre}
      />
      {/* Información de la canción */}
      <div className="cancion-info">
        {/* Título de la canción */}
        <p className="cancion-titulo font-semibold text-sm">{cancion.nombre}</p>
        {/* Nombre del artista */}
        <p className="cancion-artista text-sm">{cancion.artista}</p>
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
