import React, { createContext, useEffect, useState } from "react";
import { deezerAPI } from "../config/deezer.js";
import { supabaseConexion } from "../config/supabase.js";
import { useUsuarios } from "../hooks/useUsuarios.js";

// Creación de un contexto para las playlists.
const CtxPlaylists = createContext();

// Componente proveedor que utiliza el contexto para proporcionar datos de playlists a sus hijos.
const ProveedorPlaylists = ({ children }) => {
  const { usuario } = useUsuarios();
  // Estado local para almacenar la lista de playlists del usuario.
  const [playlistsUsuario, setPlaylistsUsuario] = useState([]);

  // Estado local para almacenar la lista de playlists destacadas.
  const [playlistsDestacadas, setPlaylistsDestacadas] = useState([]);

  // Función para cargar las playlists del usuario desde la API de Supabase.
  const cargarPlaylistsUsuario = async () => {
    if (usuario) {
      try {
        const { data, error } = await supabaseConexion
          .from("playlists")
          .select("*")
          .eq("usuario", usuario.id);

        if (error) {
          throw error;
        } else {
          setPlaylistsUsuario(data);
        }
      } catch (error) {
        console.error(
          `Error al obtener las playlists del usuario: ${error.message}`
        );
      }
    }
  };

  // Función para cargar playlists destacadas desde la API de Deezer.
  const cargarPlaylistsDestacadas = async () => {
    try {
      const response = await deezerAPI.get("/chart/0/playlists", {
        params: {
          limit: 10, // Limitar la cantidad de playlists destacadas
        },
      });

      setPlaylistsDestacadas(response.data.data);
    } catch (error) {
      console.error("Error al cargar playlists destacadas:", error.message);
    }
  };

  useEffect(() => {
    cargarPlaylistsDestacadas(); // Cargar playlists destacadas al montar el componente
  }, []);

  const exports = {
    playlistsUsuario,
    playlistsDestacadas,
    cargarPlaylistsUsuario,
    cargarPlaylistsDestacadas,
  };

  // Renderiza el proveedor con el contexto y sus hijos.
  return (
    <CtxPlaylists.Provider value={exports}>{children}</CtxPlaylists.Provider>
  );
};

// Exporta el proveedor y el contexto para su uso.
export default ProveedorPlaylists;
export { CtxPlaylists };
