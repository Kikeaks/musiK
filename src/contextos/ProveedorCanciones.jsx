import React, { createContext, useEffect, useState } from "react";
import { deezerAPI } from "../config/deezer.js";

// Creación de un contexto para las canciones.
const CtxCanciones = createContext();

// Componente proveedor que utiliza el contexto para proporcionar datos de canciones a sus hijos.
const ProveedorCanciones = ({ children }) => {
  // Estado local para almacenar la lista de canciones.
  const [canciones, setCanciones] = useState([]);

  // Función para cargar las canciones desde la API de Deezer según un término de búsqueda.
  const cargarCanciones = async (terminoBusqueda) => {
    try {
      const response = await deezerAPI.get("/search", {
        params: {
          q: terminoBusqueda,
        },
      });

      setCanciones(response.data.data);
    } catch (error) {
      console.error("Error al cargar canciones:", error.message);
    }
  };

  // Función para cargar 10 canciones destacadas al entrar en la página principal.
  const cargarCancionesDestacadas = async () => {
    try {
      const response = await deezerAPI.get("/chart/0/tracks", {
        params: {
          limit: 10
        },
      });

      setCanciones(response.data.data);
    } catch (error) {
      console.error("Error al cargar canciones por defecto:", error.message);
    }
  };

  // Función para obtener las canciones de un álbum.
  const obtenerCancionesAlbum = async (albumId) => {
    try {
      const response = await deezerAPI.get(`/album/${albumId}`);

      setCanciones(response.data.tracks.data);
    } catch (error) {
      console.error("Error al obtener canciones del álbum:", error.message);
    }
  };

  // Función para obtener las canciones de un artista.
  const obtenerCancionesArtista = async (artistaId) => {
    try {
      const response = await deezerAPI.get(`/artist/${artistaId}/top`);

      setCanciones(response.data.data);
    } catch (error) {
      console.error("Error al obtener canciones del artista:", error.message);
    }
  };

  useEffect(() => {
    cargarCancionesDestacadas(); // Cargar las canciones destacadas al montar el componente
  }, []);

  // Renderiza el proveedor con el contexto y sus hijos.
  return (
    <CtxCanciones.Provider
      value={{
        canciones,
        cargarCanciones,
        obtenerCancionesAlbum,
        obtenerCancionesArtista,
      }}
    >
      {children}
    </CtxCanciones.Provider>
  );
};

// Exporta el proveedor y el contexto para su uso.
export default ProveedorCanciones;
export { CtxCanciones };
