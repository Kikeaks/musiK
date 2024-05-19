import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { usePlaylists } from "../../hooks/usePlaylists";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import ModalEditarPlaylist from "../../componentes/modales/ModalEditarPlaylist";
import ListadoCancionesUsuario from "../../componentes/canciones/ListadoCancionesUsuario";
import { useUsuarios } from "../../hooks/useUsuarios";

// Componente para la página de una playlist de usuario.
const PlaylistUsuario = () => {
  const { id } = useParams(); // Obtiene el ID de la playlist desde los parámetros de la URL.
  const { obtenerDatosPlaylistUsuario } = usePlaylists(); // Obtiene la función para obtener los datos de la playlist del usuario desde el hook usePlaylists.
  const [playlistData, setPlaylistData] = useState(null); // Estado para almacenar los datos de la playlist.
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false); // Estado para controlar la visibilidad del modal de edición.
  const [autorPlaylist, setAutorPlaylist] = useState(null);
  const { usuario, obtenerDatosUsuarioPorId } = useUsuarios();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtiene los datos de la playlist del usuario.
        const data = await obtenerDatosPlaylistUsuario(id);
        setPlaylistData(data); // Actualiza el estado con los datos de la playlist.

        // Obtiene el autor de la playlist
        if (data && data.playlist && data.playlist.usuario) {
          const autorData = await obtenerDatosUsuarioPorId(
            data.playlist.usuario
          );
          if (autorData && autorData.nombre) {
            setAutorPlaylist(autorData.nombre);
          }
        }
      } catch (error) {
        console.error("Error al obtener datos de la playlist:", error.message);
      }
    };

    fetchData(); // Ejecuta la función para obtener los datos cuando cambia el ID de la playlist.
  }, [id]); // Se ejecuta cada vez que cambia el ID de la playlist.

  if (!playlistData) {
    return (
      <div className="text-center font-semibold mb-3">Cargando datos...</div>
    );
  }

  const { playlist, canciones } = playlistData;

  // Función para abrir el modal de edición de la playlist.
  const abrirModalEditar = () => {
    setMostrarModalEditar(true);
  };

  return (
    <div className="p-2">
      {/* Información de la playlist */}
      <div className="flex items-center shadow-lg p-3 rounded group mb-3">
        <div className="playlist-info desc ml-4 text-left">
          <div className="flex items-center">
            <h1 className="mb-2 font-semibold text-4xl md:text-5xl">
              {playlist.nombre}
            </h1>
            {usuario.id === playlist.usuario && (
              <FontAwesomeIcon
                icon={faEdit}
                onClick={abrirModalEditar}
                className="ml-3 hover:text-yellow-300 duration-300 ease-in cursor-pointer"
              />
            )}
          </div>
          <p className="mb-2">{playlist.descripcion}</p>
          <p className="text-sm">
            Creada por ·{" "}
            <Link
              className="duration-300 ease-in cursor-pointer group font-semibold"
              to={`/perfil/${playlist.usuario}`}
            >
              {autorPlaylist}
            </Link>
          </p>
        </div>
      </div>
      {/* Listado de canciones de la playlist */}
      <ListadoCancionesUsuario canciones={canciones} playlistId={id} />
      {/* Modal de edición de la playlist */}
      <ModalEditarPlaylist
        mostrar={mostrarModalEditar}
        manejarCerrado={() => setMostrarModalEditar(false)}
        playlistId={id}
      />
    </div>
  );
};

export default PlaylistUsuario;
