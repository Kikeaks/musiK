import React, { createContext, useEffect, useState } from "react";
import { deezerAPI } from "../config/deezer.js";

// Crear el contexto para los artistas
const CtxArtistas = createContext();

// Proveedor que utiliza el contexto para proporcionar datos de artistas a sus hijos.
const ProveedorArtistas = ({ children }) => {
  // Estado local para almacenar la lista de artistas destacados
  const [artistasDestacados, setArtistasDestacados] = useState([]);
  // Estado local para almacenar la lista de artistas buscados
  const [artistasBuscados, setArtistasBuscados] = useState([]);

  // Función para cargar artistas destacados desde la API de Deezer
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

  // Función para buscar artistas según un término de búsqueda
  const buscarArtistas = async (termino) => {
    if (!termino) {
      setArtistasBuscados([]);
      return;
    }
    try {
      const response = await deezerAPI.get("/search/artist", {
        params: { q: termino },
      });
      setArtistasBuscados(response.data.data);
    } catch (error) {
      console.error("Error al buscar artistas:", error.message);
    }
  };

  // Efecto para cargar los artistas destacados al montar el componente
  useEffect(() => {
    cargarArtistasDestacados();
  }, []);

  // Valores proporcionados por el contexto
  const exports = {
    artistasDestacados,
    artistasBuscados,
    buscarArtistas,
  };

  // Renderizar el proveedor con el contexto y sus hijos
  return (
    <CtxArtistas.Provider value={exports}>
      {children}
    </CtxArtistas.Provider>
  );
};

export default ProveedorArtistas;
export { CtxArtistas };
