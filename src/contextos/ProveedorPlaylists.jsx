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
          limit: 25, // Limita la cantidad de playlists destacadas.
        },
      });

      setPlaylistsDestacadas(response.data.data);
    } catch (error) {
      console.error("Error al cargar playlists destacadas:", error.message);
    }
  };

  // Función para añadir una canción a una playlist.
  const addCancionAPlaylist = async (idPlaylist, idCancion) => {
    try {
      const { error } = await supabase
        .from("playlists_canciones")
        .insert([{ id_playlist: idPlaylist, id_cancion: idCancion }]);
      if (error) throw error;
    } catch (error) {
      console.error("Error al añadir la canción a la playlist:", error.message);
      throw error;
    }
  };

  // Función para obtener las canciones de una playlist por su ID desde la API de Deezer
  const obtenerCancionesPlaylist = async (playlistId) => {
    try {
      const response = await deezerAPI.get(`/playlist/${playlistId}/tracks`);

      return response.data.data; // Retorna las canciones de la playlist
    } catch (error) {
      console.error(
        "Error al obtener canciones de la playlist:",
        error.message
      );
      throw error;
    }
  };

  // Función para obtener una playlist por su ID desde la API de Deezer
  const obtenerPlaylistDeezerPorId = async (id) => {
    try {
      const response = await deezerAPI.get(`/playlist/${id}`);

      return response.data; // Retorna la playlist encontrada
    } catch (error) {
      console.error("Error al obtener playlist por ID:", error.message);
      throw error;
    }
  };

  // Función para obtener los datos completos de una playlist por su ID
  const obtenerDatosPlaylist = async (idPlaylist) => {
    try {
      // Obtener la información de la playlist
      const playlistData = await obtenerPlaylistDeezerPorId(idPlaylist);

      // Obtener las canciones de la playlist
      const cancionesPlaylist = await obtenerCancionesPlaylist(idPlaylist);

      // Combinar la información de la playlist y las canciones
      return {
        playlist: playlistData,
        canciones: cancionesPlaylist,
      };
    } catch (error) {
      console.error("Error al obtener datos de la playlist:", error.message);
      throw error;
    }
  };

  useEffect(() => {
    cargarPlaylistsDestacadas(); // Cargar playlists destacadas al montar el componente
    cargarPlaylistsUsuario();
  }, []);

  const exports = {
    playlistsUsuario,
    playlistsDestacadas,
    cargarPlaylistsUsuario,
    cargarPlaylistsDestacadas,
    obtenerPlaylistDeezerPorId,
    obtenerDatosPlaylist,
  };

  // Renderiza el proveedor con el contexto y sus hijos.
  return (
    <CtxPlaylists.Provider value={exports}>{children}</CtxPlaylists.Provider>
  );
};

// Exporta el proveedor y el contexto para su uso.
export default ProveedorPlaylists;
export { CtxPlaylists };
