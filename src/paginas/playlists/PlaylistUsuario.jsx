import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePlaylists } from "../../hooks/usePlaylists";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faHeart,
  faHeartBroken,
} from "@fortawesome/free-solid-svg-icons";
import ModalEditarPlaylist from "../../componentes/modales/ModalEditarPlaylist";
import ListadoCancionesUsuario from "../../componentes/canciones/ListadoCancionesUsuario";
import PlaylistHeader from "../../componentes/playlists/PlaylistHeader";
import { useUsuarios } from "../../hooks/useUsuarios";
import Carga from "../../componentes/interfaz/Carga";

// Componente para la página de una playlist de usuario.
const PlaylistUsuario = () => {
  const { id } = useParams(); // Obtiene el ID de la playlist desde los parámetros de la URL.
  const { obtenerDatosPlaylistUsuario, contarLikesPlaylist } = usePlaylists(); // Obtiene la función para obtener los datos de la playlist del usuario desde el hook usePlaylists.
  const [playlistData, setPlaylistData] = useState(null); // Estado para almacenar los datos de la playlist.
  const [numLikes, setNumLikes] = useState(0);
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false); // Estado para controlar la visibilidad del modal de edición.
  const [autorPlaylist, setAutorPlaylist] = useState([]);
  const {
    usuario,
    sesionIniciada,
    obtenerDatosUsuarioPorId,
    likePlaylist,
    unlikePlaylist,
    verificarLike,
  } = useUsuarios();

  const [tieneLike, setTieneLike] = useState(false);

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
            setAutorPlaylist(autorData);
          }
        }

        const likes = await contarLikesPlaylist(id);
        setNumLikes(likes);

        if (sesionIniciada) {
          const likeStatus = await verificarLike(id);
          setTieneLike(likeStatus);
        }
      } catch (error) {
        console.error("Error al obtener datos de la playlist:", error.message);
      }
    };

    fetchData(); // Ejecuta la función para obtener los datos cuando cambia el ID de la playlist.
  }, [id, verificarLike]); // Se ejecuta cada vez que cambia el ID de la playlist.

  if (!playlistData) {
    return <Carga />;
  }

  const { playlist, canciones } = playlistData;

  // Función para abrir el modal de edición de la playlist.
  const abrirModalEditar = () => {
    setMostrarModalEditar(true);
  };

  const toggleLike = async () => {
    if (tieneLike) {
      await unlikePlaylist(id);
    } else {
      await likePlaylist(id);
    }

    setTieneLike(!tieneLike);
    setNumLikes(tieneLike ? numLikes - 1 : numLikes + 1);
  };

  return (
    <div className="min-w-0 w-full">
      {/* Información de la playlist */}
      <PlaylistHeader
        playlist={playlist}
        portada={playlist.portada ? playlist.portada : null}
        titulo={playlist.nombre}
        descripcion={playlist.descripcion ? playlist.descripcion : null}
        creador={autorPlaylist}
        likes={numLikes} // Pasa el número de likes como prop
      />

      {usuario.id === playlist.usuario ? (
        <button
          className="text-white font-medium rounded-lg hover:bg-neutral-800 text-center text-base duration-300 ease-in cursor-pointer group bg-cards ml-4 mb-4 mt-4 focus:outline-none"
          onClick={abrirModalEditar}
        >
          <FontAwesomeIcon
            icon={faGear}
            onClick={abrirModalEditar}
            className="mr-2"
          />
          Opciones
        </button>
      ) : tieneLike ? (
        <button
          className="text-white font-medium rounded-lg hover:border-highlight text-center text-base  duration-300 ease-in cursor-pointer group bg-cards ml-4 mb-4 mt-4 focus:outline-none"
          onClick={toggleLike}
        >
          <FontAwesomeIcon className="mr-2" icon={faHeartBroken} /> No me gusta
        </button>
      ) : (
        <button
          className="text-white font-medium rounded-lg hover:border-white text-center text-base duration-300 ease-in cursor-pointer group bg-highlight ml-4 mb-4 mt-4 focus:outline-none"
          onClick={toggleLike}
        >
          <FontAwesomeIcon className="mr-2" icon={faHeart} /> Me gusta
        </button>
      )}

      {/* Listado de canciones de la playlist */}
      <ListadoCancionesUsuario canciones={canciones} playlist={playlist} />
      {/* Modal de edición de la playlist */}
      <ModalEditarPlaylist
        mostrar={mostrarModalEditar}
        manejarCerrado={() => setMostrarModalEditar(false)}
        playlist={id}
      />
    </div>
  );
};

export default PlaylistUsuario;
