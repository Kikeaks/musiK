import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import ModalQuitarDePlaylist from "../modales/ModalQuitarDePlaylist"

// Componente para mostrar los detalles de una canción.
const CancionPlaylistUsuario = ({ cancion, playlistId }) => {
    const [modalAbierto, setModalAbierto] = useState(false);

  const abrirModal = () => {
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
  };
    return(
  <div className="cancion flex items-center shadow-lg p-3 backdrop-blur-md rounded mb-3">
    <img className="rounded mr-2" src={cancion.portada} alt={cancion.titulo} />
    <div className="cancion-info">
      <p className="cancion-titulo font-semibold text-sm">{cancion.titulo}</p>
      <p className="cancion-artista text-sm">{cancion.artista}</p>
    </div>
    <p className="cancion-duracion ml-auto font-semibold">
      {Math.floor(cancion.duracion / 60)}:
      {(cancion.duracion % 60).toString().padStart(2, "0")}
    </p>
    <FontAwesomeIcon
      icon={faCircleXmark}
      className="ml-3 hover:text-red-500 duration-300 ease-in cursor-pointer group" onClick={abrirModal}
    />
    <ModalQuitarDePlaylist
        mostrar={modalAbierto}
        manejarCerrado={cerrarModal}
        cancion={cancion}
        playlistId={playlistId}
      />
  </div>);
};

export default CancionPlaylistUsuario;
