import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePlaylists } from "../../hooks/usePlaylists";
import ListadoCanciones from "../../componentes/canciones/ListadoCanciones";
import PlaylistHeader from "../../componentes/playlists/PlaylistHeader";

// Componente para la página de una playlist de Deezer.
const Playlist = () => {
  const { id } = useParams(); // Obtiene el parámetro de la URL que corresponde al ID de la playlist.
  const { obtenerDatosPlaylist } = usePlaylists(); // Importa la función para obtener los datos de la playlist desde el hook usePlaylists.
  const [playlistData, setPlaylistData] = useState(null); // Define el estado para almacenar los datos de la playlist.

  useEffect(() => {
    // Efecto de carga inicial para obtener los datos de la playlist.
    const fetchData = async () => {
      try {
        // Obtiene los datos de la playlist usando su ID.
        const data = await obtenerDatosPlaylist(id);
        // Almacena los datos de la playlist en el estado.
        setPlaylistData(data);
      } catch (error) {
        console.error("Error al obtener datos de la playlist:", error.message); // Maneja los errores en la obtención de datos.
      }
    };

    fetchData(); // Llama a la función fetchData para obtener los datos al cargar el componente.
  }, [id]); // Dependencia: se ejecuta cada vez que cambia el ID de la playlist.

  // Si no se han cargado los datos de la playlist, muestra un mensaje de carga.
  if (!playlistData) {
    return (
      <div className="text-center font-semibold mb-3">Cargando datos...</div>
    );
  }

  // Desestructura los datos de la playlist y las canciones desde playlistData.
  const { playlist, canciones } = playlistData;

  return (
    <div className="p-2">
      {/* Muestra los detalles de la playlist */}
      <PlaylistHeader
        portada={playlist.picture_medium}
        fondo={playlist.picture_xl}
        titulo={playlist.title}
        descripcion={playlist.description}
        creador={playlist.creator.name}
      />
      {/* Renderiza el componente ListadoCanciones con las canciones de la playlist */}
      <ListadoCanciones canciones={canciones} />
    </div>
  );
};

export default Playlist;
