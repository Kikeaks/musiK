import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePlaylists } from "../../hooks/usePlaylists";
import ListadoCanciones from "../../componentes/canciones/ListadoCanciones";

const Playlist = () => {
  const { id } = useParams();
  const { obtenerDatosPlaylist } = usePlaylists();
  const [playlistData, setPlaylistData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await obtenerDatosPlaylist(id);
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

  return (
    <div className="p-2">
      <div className="flex items-center shadow-lg p-3 backdrop-blur-md rounded group mb-3">
        <img src={playlist.picture_medium} />
        <div className="playlist-info desc ml-4 text-left">
          <h1 className="mb-2 font-semibold">{playlist.title}</h1>
          <p className="mb-2">{playlist.description}</p>
          <p className="text-small">Creada por · {playlist.creator.name}</p>
        </div>
      </div>

      <ListadoCanciones canciones={canciones} />
    </div>
  );
};

export default Playlist;
