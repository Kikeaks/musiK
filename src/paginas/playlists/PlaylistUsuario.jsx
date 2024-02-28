import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePlaylists } from "../../hooks/usePlaylists";
import ListadoCanciones from "../../componentes/canciones/ListadoCanciones";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import ModalEditarPlaylist from "../../componentes/modales/ModalEditarPlaylist";

const PlaylistUsuario = () => {
  const { id } = useParams();
  const { obtenerDatosPlaylistUsuario } = usePlaylists();
  const [playlistData, setPlaylistData] = useState(null);
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await obtenerDatosPlaylistUsuario(id);
        setPlaylistData(data);
      } catch (error) {
        console.error("Error al obtener datos de la playlist:", error.message);
      }
    };

    fetchData();
  }, [id]);

  if (!playlistData) {
    return <div className="text-center">Cargando datos...</div>;
  }

  const { playlist, canciones } = playlistData;

  const abrirModalEditar = () => {
    setMostrarModalEditar(true);
  };

  return (
    <div className="p-2">
      <div className="flex items-center shadow-lg p-3 backdrop-blur-md rounded group mb-3">
        <div className="playlist-info desc ml-4 text-left">
          <div className="flex items-center">
            <h1 className="mb-2 font-semibold">{playlist.nombre}</h1>
            <FontAwesomeIcon
              icon={faEdit}
              onClick={abrirModalEditar}
              className="ml-3 hover:text-indigo-600 duration-300 ease-in cursor-pointer "
            />
          </div>

          <p className="mb-2">{playlist.descripcion}</p>
          <p className="text-sm">Creada por · {playlist.usuario}</p>
        </div>
      </div>
      <ListadoCanciones canciones={canciones} />
      <ModalEditarPlaylist
        mostrar={mostrarModalEditar}
        manejarCerrado={() => setMostrarModalEditar(false)} playlistId={id}
      />
    </div>
  );
};

export default PlaylistUsuario;
