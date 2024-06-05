import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePlaylists } from "../../hooks/usePlaylists";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import ModalEditarPlaylist from "../../componentes/modales/ModalEditarPlaylist";
import ListadoCancionesUsuario from "../../componentes/canciones/ListadoCancionesUsuario";
import PlaylistHeader from "../../componentes/playlists/PlaylistHeader";
import { useUsuarios } from "../../hooks/useUsuarios";
import Carga from "../../componentes/interfaz/Carga";
import Comentarios from "../../componentes/playlists/Comentarios";

// Página de playlist de usuario.
const PlaylistUsuario = () => {
  const { id } = useParams();
  const { obtenerDatosPlaylistUsuario, contarLikesPlaylist } = usePlaylists();
  const [playlistData, setPlaylistData] = useState(null);
  const [numLikes, setNumLikes] = useState(0);
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
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
        const data = await obtenerDatosPlaylistUsuario(id);
        setPlaylistData(data);

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

        if (usuario.id !== data.playlist.usuario) {
          const likeStatus = await verificarLike(id);
          setTieneLike(likeStatus);
        }
      } catch (error) {
        console.error("Error al obtener datos de la playlist:", error.message);
      }
    };

    fetchData();
  }, [id, verificarLike]);

  if (!playlistData) {
    return <Carga />;
  }

  const { playlist, canciones } = playlistData;

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
      <PlaylistHeader
        playlist={playlist}
        portada={playlist.portada ? playlist.portada : null}
        titulo={playlist.nombre}
        descripcion={playlist.descripcion ? playlist.descripcion : null}
        creador={autorPlaylist}
        likes={numLikes}
        toggleLike={toggleLike}
        tieneLike={tieneLike}
        usuario={usuario}
        sesionIniciada={sesionIniciada}
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
      ) : null}
      <div className="flex flex-col md:flex-row w-full">
        <ListadoCancionesUsuario canciones={canciones} playlist={playlist} />
        <Comentarios playlist={playlist.id} />
      </div>

      <ModalEditarPlaylist
        mostrar={mostrarModalEditar}
        manejarCerrado={() => setMostrarModalEditar(false)}
        playlist={id}
      />
    </div>
  );
};

export default PlaylistUsuario;
