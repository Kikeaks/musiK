import React, { createContext, useEffect, useState } from "react";
import { deezerAPI } from "../config/deezer.js";
import { supabaseConexion } from "../config/supabase.js";
import { useUsuarios } from "../hooks/useUsuarios.js";
import { useCanciones } from "../hooks/useCanciones.js";

// Creación de un contexto para las playlists.
const CtxPlaylists = createContext();

// Componente proveedor que utiliza el contexto para proporcionar datos de playlists a sus hijos.
const ProveedorPlaylists = ({ children }) => {
  const { usuario, sesionIniciada } = useUsuarios();
  const { addCancionABaseDatos } = useCanciones();
  // Estado local para almacenar la lista de playlists del usuario.
  const [playlistsUsuario, setPlaylistsUsuario] = useState([]);

  // Estado local para almacenar la lista de playlists destacadas.
  const [playlistsDestacadas, setPlaylistsDestacadas] = useState([]);

  const cargarPlaylistsUsuario = async () => {
    if (sesionIniciada) {
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

  // Función para insertar la nueva lista en la base de datos.
  const crearPlaylist = async (nuevaLista) => {
    try {
      // Inserta la nueva lista en la tabla de playlists.
      const { data, error } = await supabaseConexion
        .from("playlists")
        .insert({ nombre: nuevaLista, usuario: usuario.id });

      if (error) {
        throw error;
      }

      // Actualiza el estado "playlistsUsuario" para que aparezca la nueva lista.
      setPlaylistsUsuario([...playlistsUsuario, data[0]]);
      cargarPlaylistsUsuario();
    } catch (error) {
      console.error(`Error al crear la lista: ${error.message}`);
    }
  };

  // Función para obtener una playlist del usuario por su ID desde la base de datos
  const obtenerPlaylistUsuarioPorId = async (idPlaylist) => {
    try {
      // Realizar la consulta a la base de datos para obtener la playlist
      const { data, error } = await supabaseConexion
        .from("playlists")
        .select("*")
        .eq("id", idPlaylist);

      if (error) {
        throw error;
      }

      // Retornar los datos de la playlist
      return data[0];
    } catch (error) {
      console.error(
        "Error al obtener playlist del usuario por ID:",
        error.message
      );
      throw error;
    }
  };

  // Función para obtener las canciones de una playlist creada por el usuario.
  const obtenerCancionesPlaylistUsuario = async (idPlaylist) => {
    try {
      const { data, error } = await supabaseConexion
        .from("playlists_canciones")
        .select("canciones(*)") // Esto seleccionará todas las columnas de la tabla "canciones"
        .eq("id_playlist", idPlaylist);

      if (error) {
        throw error;
      }

      // Retorna las canciones de la playlist del usuario
      return data.map((item) => item.canciones); // Aquí estamos accediendo a los datos de la canción dentro del objeto "canciones"
    } catch (error) {
      console.error(
        `Error al obtener canciones de la playlist del usuario: ${error.message}`
      );
      throw error;
    }
  };

  // Función para añadir una canción a una playlist.
  const addCancionAPlaylist = async (idPlaylist, cancion) => {
    try {
      // Primero, añade la canción a la tabla de canciones si no existe.
      await addCancionABaseDatos(cancion);

      // Luego, agrega la relación en la tabla de playlists_canciones.
      const { error } = await supabaseConexion
        .from("playlists_canciones")
        .insert([{ id_playlist: idPlaylist, id_cancion: cancion.id }]);

      if (error) throw error;
    } catch (error) {
      console.error("Error al añadir la canción a la playlist:", error.message);
      throw error;
    }
  };

  // Función para quitar una canción de una playlist.
  const quitarCancionDePlaylist = async (idPlaylist, idCancion) => {
    try {
      // Elimina la relación de la canción con la playlist en la tabla de playlists_canciones.
      const { error } = await supabaseConexion
        .from("playlists_canciones")
        .delete()
        .eq("id_playlist", idPlaylist)
        .eq("id_cancion", idCancion);

      if (error) {
        throw error;
      } else {
        quitarCancionDeBaseDatos(idCancion);
      }
    } catch (error) {
      console.error(
        "Error al quitar la canción de la playlist:",
        error.message
      );
      throw error;
    }
  };

  // Función para quitar una canción de la tabla de canciones si no está en otras playlists.
  const quitarCancionDeBaseDatos = async (idCancion) => {
    try {
      // Verifica si la canción no está relacionada con ninguna otra playlist.
      const { data: relacionOtrasPlaylists, error: errorRelacion } =
        await supabaseConexion
          .from("playlists_canciones")
          .select("*")
          .eq("id_cancion", idCancion);

      // Si no hay más relaciones de la canción con otras playlists, elimina la canción de la tabla de canciones.
      if (!relacionOtrasPlaylists || relacionOtrasPlaylists.length === 0) {
        await supabaseConexion
          .from("canciones")
          .delete()
          .eq("id_deezer", idCancion);
      }
    } catch (error) {
      console.error(
        "Error al quitar la canción de la tabla de canciones:",
        error.message
      );
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

  // Función para obtener los datos completos de una playlist por su ID
  const obtenerDatosPlaylistUsuario = async (idPlaylist) => {
    try {
      // Obtener la información de la playlist
      const playlistData = await obtenerPlaylistUsuarioPorId(idPlaylist);

      // Obtener las canciones de la playlist
      const cancionesPlaylist = await obtenerCancionesPlaylistUsuario(
        idPlaylist
      );

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

  // Función para eliminar una playlist.
  const eliminarPlaylist = async (idPlaylist) => {
    try {
      // Elimina la playlist de la tabla de playlists.
      const { error } = await supabaseConexion
        .from("playlists")
        .delete()
        .eq("id", idPlaylist);

      if (error) {
        throw error;
      }

      // Elimina las relaciones de canciones de la playlist en la tabla de playlists_canciones.
      await supabaseConexion
        .from("playlists_canciones")
        .delete()
        .eq("id_playlist", idPlaylist);

      // Actualiza el estado local de las playlists del usuario eliminando la playlist.
      setPlaylistsUsuario(
        playlistsUsuario.filter((playlist) => playlist.id !== idPlaylist)
      );
    } catch (error) {
      console.error("Error al eliminar la playlist:", error.message);
      throw error;
    }
  };

  // Función para editar el nombre de una playlist.
  const editarNombrePlaylist = async (idPlaylist, nuevoNombre) => {
    try {
      // Realiza la actualización del nombre de la playlist en la base de datos.
      const { error } = await supabaseConexion
        .from("playlists")
        .update({ nombre: nuevoNombre })
        .eq("id", idPlaylist);

      if (error) {
        throw error;
      }

      // Actualiza el estado local de las playlists del usuario con el nuevo nombre.
      setPlaylistsUsuario(
        playlistsUsuario.map((playlist) => {
          if (playlist.id === idPlaylist) {
            return { ...playlist, nombre: nuevoNombre };
          } else {
            return playlist;
          }
        })
      );
    } catch (error) {
      console.error("Error al editar el nombre de la playlist:", error.message);
      throw error;
    }
  };

  useEffect(() => {
    cargarPlaylistsDestacadas(); // Cargar playlists destacadas al montar el componente
    if (usuario.id) {
      cargarPlaylistsUsuario();
    }
  }, [usuario]);

  const exports = {
    playlistsUsuario,
    playlistsDestacadas,
    cargarPlaylistsUsuario,
    cargarPlaylistsDestacadas,
    obtenerPlaylistDeezerPorId,
    obtenerDatosPlaylist,
    crearPlaylist,
    addCancionAPlaylist,
    obtenerCancionesPlaylistUsuario,
    obtenerPlaylistUsuarioPorId,
    obtenerDatosPlaylistUsuario,
    editarNombrePlaylist,
    quitarCancionDePlaylist,
    eliminarPlaylist,
  };

  // Renderiza el proveedor con el contexto y sus hijos.
  return (
    <CtxPlaylists.Provider value={exports}>{children}</CtxPlaylists.Provider>
  );
};

// Exporta el proveedor y el contexto para su uso.
export default ProveedorPlaylists;
export { CtxPlaylists };
