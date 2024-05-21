import React, { createContext, useEffect, useState } from "react";
import { deezerAPI } from "../config/deezer.js";

const CtxAlbumes = createContext();

const ProveedorAlbumes = ({ children }) => {
  const [albumesDestacados, setAlbumesDestacados] = useState([]);
  const [albumesBuscados, setAlbumesBuscados] = useState([]);

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

  const buscarAlbumes = async (termino) => {
    if (!termino) {
      setAlbumesBuscados([]);
      return;
    }
    try {
      const response = await deezerAPI.get("/search/album", {
        params: { q: termino },
      });
      setAlbumesBuscados(response.data.data);
    } catch (error) {
      console.error("Error al buscar álbumes:", error.message);
    }
  };

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

  useEffect(() => {
    cargarAlbumesDestacados();
  }, []);

  const exports = {
    albumesDestacados,
    albumesBuscados,
    buscarAlbumes,
    obtenerDatosAlbum,
  };

  return <CtxAlbumes.Provider value={exports}>{children}</CtxAlbumes.Provider>;
};

export default ProveedorAlbumes;
export { CtxAlbumes };
