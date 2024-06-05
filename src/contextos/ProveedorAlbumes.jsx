import React, { createContext, useEffect, useState } from "react";
import { deezerAPI } from "../config/deezer.js";

// Crear un nuevo contexto para los álbumes
const CtxAlbumes = createContext();

// Proveedor de álbumes que contendrá el estado y las funciones relacionadas con los álbumes
const ProveedorAlbumes = ({ children }) => {
  // Estado para almacenar los álbumes destacados
  const [albumesDestacados, setAlbumesDestacados] = useState([]);
  // Estado para almacenar los álbumes buscados
  const [albumesBuscados, setAlbumesBuscados] = useState([]);

  // Función para cargar los álbumes destacados
  const cargarAlbumesDestacados = async () => {
    try {
      const response = await deezerAPI.get("/chart/0/albums", {
        params: { limit: 10 },
      });
      setAlbumesDestacados(response.data.data);
    } catch (error) {
      console.error("Error al cargar álbumes destacados:", error.message);
    }
  };

  // Función para buscar álbumes
  const buscarAlbumes = async (termino) => {
    if (!termino) {
      setAlbumesBuscados([]);
      return;
    }
    try {
      const response = await deezerAPI.get("/search/album", {
        params: { q: termino, limit: 10 },
      });
      setAlbumesBuscados(response.data.data);
    } catch (error) {
      console.error("Error al buscar álbumes:", error.message);
    }
  };

  // Función para obtener los datos de un álbum específico por su ID
  const obtenerDatosAlbum = async (idAlbum) => {
    try {
      const response = await deezerAPI.get(`/album/${idAlbum}`);
      const album = response.data;
      const cancionesResponse = await deezerAPI.get(`/album/${idAlbum}/tracks`);
      const canciones = cancionesResponse.data.data;
      return { album, canciones };
    } catch (error) {
      console.error("Error al obtener datos del álbum:", error.message);
      throw error;
    }
  };

  // Función para obtener los álbumes de un artista por su ID
  const obtenerAlbumesPorIdArtista = async (idArtista) => {
    try {
      const responseArtista = await deezerAPI.get(`/artist/${idArtista}`);
      const responseAlbumes = await deezerAPI.get(
        `/artist/${idArtista}/albums`
      );
      const artista = responseArtista.data.name;
      const albumes = responseAlbumes.data.data;
      return { artista, albumes };
    } catch (error) {
      console.error("Error al obtener álbumes del artista:", error.message);
      throw error;
    }
  };

  // Cargar los álbumes destacados al cargar el componente
  useEffect(() => {
    cargarAlbumesDestacados();
  }, []);

  // Exportar el estado y las funciones relacionadas con los álbumes
  const exports = {
    albumesDestacados,
    albumesBuscados,
    buscarAlbumes,
    obtenerDatosAlbum,
    obtenerAlbumesPorIdArtista,
  };

  // Proporcionar el contexto y pasar los valores a los componentes secundarios
  return <CtxAlbumes.Provider value={exports}>{children}</CtxAlbumes.Provider>;
};

// Exportar el proveedor de álbumes y el contexto
export default ProveedorAlbumes;
export { CtxAlbumes };
