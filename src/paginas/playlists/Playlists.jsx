import React, { Fragment, useEffect, useState } from "react";
import { usePlaylists } from "../../hooks/usePlaylists";
import PlaylistsCuadricula from "../../componentes/playlists/PlaylistsCuadricula";
import { useUsuarios } from "../../hooks/useUsuarios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import ModalCrearPlaylist from "../../componentes/modales/ModalCrearPlaylist";

const Playlists = () => {
  const { playlistsDestacadas, playlistsUsuario, cargarPlaylistsUsuario } =
    usePlaylists();
  const { sesionIniciada } = useUsuarios();
  const [mostrarModal, setMostrarModal] = useState(false);

  // Función para abrir el modal de creación de playlist
  const abrirModal = () => {
    setMostrarModal(true);
  };

  // Función para cerrar el modal de creación de playlist
  const cerrarModal = () => {
    setMostrarModal(false);
    cargarPlaylistsUsuario();
  };

  useEffect(() => {
    cargarPlaylistsUsuario();
  }, [sesionIniciada]);

  return (
    <Fragment>
      <div>
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
        <PlaylistsCuadricula playlists={playlistsUsuario} origen={"bbdd"} />
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
