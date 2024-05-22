import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAlbumes } from "../hooks/useAlbumes";
import AlbumHeader from "../componentes/albumes/AlbumHeader";
import Carga from "../componentes/interfaz/Carga";
import ListadoCancionesAlbum from "../componentes/canciones/ListadoCancionesAlbum";

// Componente para la página de un álbum.
const Album = () => {
  const { id } = useParams(); // Obtiene el parámetro de la URL que corresponde al ID del álbum.
  const { obtenerDatosAlbum } = useAlbumes(); // Importa la función para obtener los datos del álbum desde el hook useAlbumes.
  const [albumData, setAlbumData] = useState(null); // Define el estado para almacenar los datos del álbum.

  useEffect(() => {
    // Efecto de carga inicial para obtener los datos del álbum.
    const fetchData = async () => {
      try {
        // Obtiene los datos del álbum usando su ID.
        const data = await obtenerDatosAlbum(id);
        // Almacena los datos del álbum en el estado.
        setAlbumData(data);
      } catch (error) {
        console.error("Error al obtener datos del álbum:", error.message); // Maneja los errores en la obtención de datos.
      }
    };

    fetchData(); // Llama a la función fetchData para obtener los datos al cargar el componente.
  }, [id]); // Dependencia: se ejecuta cada vez que cambia el ID del álbum.

  // Si no se han cargado los datos del álbum, muestra un mensaje de carga.
  if (!albumData) {
    return <Carga />;
  }

  // Desestructura los datos del álbum y las canciones desde albumData.
  const { album, canciones } = albumData;

  return (
    <div>
      {/* Muestra los detalles del álbum */}
      <AlbumHeader
        album={album}
        portada={album.cover_medium}
        titulo={album.title}
        artista={album.artist.name}
        lanzamiento={album.release_date}
      />
      {/* Renderiza el componente ListadoCanciones con las canciones del álbum */}
      <ListadoCancionesAlbum
        canciones={canciones}
        portada={album.cover_small}
      />
    </div>
  );
};

export default Album;
