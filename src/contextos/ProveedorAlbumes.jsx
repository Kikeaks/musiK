import React, { createContext, useEffect, useState } from "react";
import { deezerAPI } from "../config/deezer.js";

const CtxAlbumes = createContext();

const ProveedorAlbumes = ({ children }) => {
  const [albumesDestacados, setAlbumesDestacados] = useState([]);
  const [albumesBuscados, setAlbumesBuscados] = useState([]);

  const cargarAlbumesDestacados = async () => {
    try {
      const response = await deezerAPI.get("/chart/0/albums", {
        params: { limit: 25 },
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

  useEffect(() => {
    cargarAlbumesDestacados();
  }, []);

  const exports = {
    albumesDestacados,
    albumesBuscados,
    buscarAlbumes,
  };

  return <CtxAlbumes.Provider value={exports}>{children}</CtxAlbumes.Provider>;
};

export default ProveedorAlbumes;
export { CtxAlbumes };