import React, { createContext, useEffect, useState } from "react";
import { deezerAPI } from "../config/deezer.js";

const CtxArtistas = createContext();

const ProveedorArtistas = ({ children }) => {
  const [artistasDestacados, setArtistasDestacados] = useState([]);
  const [artistasBuscados, setArtistasBuscados] = useState([]);

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

  useEffect(() => {
    cargarArtistasDestacados();
  }, []);

  const exports = {
    artistasDestacados,
    artistasBuscados,
    buscarArtistas,
    obtenerDatosArtistaPorId,
  };

  return (
    <CtxArtistas.Provider value={exports}>{children}</CtxArtistas.Provider>
  );
};

export default ProveedorArtistas;
export { CtxArtistas };
