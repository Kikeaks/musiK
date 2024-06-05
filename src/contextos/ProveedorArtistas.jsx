import React, { createContext, useEffect, useState } from "react";
import { deezerAPI } from "../config/deezer.js";

// Crear un nuevo contexto para los artistas
const CtxArtistas = createContext();

// Proveedor de artistas que contiene el estado y las funciones relacionadas con los artistas
const ProveedorArtistas = ({ children }) => {
  // Estado para almacenar los artistas destacados
  const [artistasDestacados, setArtistasDestacados] = useState([]);
  // Estado para almacenar los artistas buscados
  const [artistasBuscados, setArtistasBuscados] = useState([]);

  // Función para cargar los artistas destacados
  const cargarArtistasDestacados = async () => {
    try {
      const response = await deezerAPI.get("/chart/0/artists", {
        params: { limit: 10 },
      });
      setArtistasDestacados(response.data.data);
    } catch (error) {
      console.error("Error al cargar artistas destacados:", error.message);
    }
  };

  // Función para buscar artistas
  const buscarArtistas = async (termino) => {
    if (!termino) {
      setArtistasBuscados([]);
      return;
    }
    try {
      const response = await deezerAPI.get("/search/artist", {
        params: { q: termino, limit: 10 },
      });
      setArtistasBuscados(response.data.data);
    } catch (error) {
      console.error("Error al buscar artistas:", error.message);
    }
  };

  // Función para obtener los datos de un artista específico por su ID
  const obtenerDatosArtistaPorId = async (idArtista) => {
    try {
      const response = await deezerAPI.get(`/artist/${idArtista}`);
      const artista = response.data;
      const cancionesResponse = await deezerAPI.get(
        `/artist/${idArtista}/top?limit=5`
      );
      const canciones = cancionesResponse.data.data;
      return { ...artista, canciones };
    } catch (error) {
      console.error("Error al obtener datos del artista:", error.message);
      throw error;
    }
  };

  // Cargar los artistas destacados al cargar el componente
  useEffect(() => {
    cargarArtistasDestacados();
  }, []);

  // Exportar el estado y las funciones relacionadas con los artistas
  const exports = {
    artistasDestacados,
    artistasBuscados,
    buscarArtistas,
    obtenerDatosArtistaPorId,
  };

  // Proporcionar el contexto y pasar los valores a los componentes secundarios
  return (
    <CtxArtistas.Provider value={exports}>{children}</CtxArtistas.Provider>
  );
};

// Exportar el proveedor de artistas y el contexto
export default ProveedorArtistas;
export { CtxArtistas };
