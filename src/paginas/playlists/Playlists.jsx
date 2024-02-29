import React, { Fragment, useEffect, useState } from "react";
import { usePlaylists } from "../../hooks/usePlaylists";
import PlaylistsCuadricula from "../../componentes/playlists/PlaylistsCuadricula";
import { useUsuarios } from "../../hooks/useUsuarios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import ModalCrearPlaylist from "../../componentes/modales/ModalCrearPlaylist";

// Componente para la página de playlists.
const Playlists = () => {
  const { playlistsDestacadas, playlistsUsuario, cargarPlaylistsUsuario } =
    usePlaylists(); // Obtiene las playlists destacadas y del usuario desde el hook usePlaylists.
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

  useEffect(() => {
    // Efecto para cargar las playlists del usuario cuando cambia el estado de la sesión.
    cargarPlaylistsUsuario();
  }, [sesionIniciada]); // Se ejecuta cada vez que cambia el estado de la sesión.

  return (
    <Fragment>
      <div>
        {/* Título y botón para crear playlist si el usuario ha iniciado sesión */}
        <h2 className="font-bold text-2xl text-center mt-3">Mis playlists</h2>
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
        {/* Cuadrícula de playlists del usuario */}
        <PlaylistsCuadricula playlists={playlistsUsuario} origen={"bbdd"} />
        {/* Título y cuadrícula de playlists destacadas */}
        <h2 className="font-bold text-2xl text-center mt-3">
          Playlists destacadas
        </h2>
        <PlaylistsCuadricula playlists={playlistsDestacadas} origen="deezer" />
      </div>

      {/* Modal para crear playlist */}
      <ModalCrearPlaylist mostrar={mostrarModal} manejarCerrado={cerrarModal} />
    </Fragment>
  );
};

export default Playlists;
