import React, { createContext, useEffect, useState } from "react";
import { deezerAPI } from "../config/deezer.js";
import { supabaseConexion } from "../config/supabase.js";
import { useUsuarios } from "../hooks/useUsuarios.js";
import { useCanciones } from "../hooks/useCanciones.js";
import { useReproductor } from "../hooks/useReproductor.js"; // Importa el contexto del reproductor de audio

const CtxPlaylists = createContext();

const ProveedorPlaylists = ({ children }) => {
  const { usuario, sesionIniciada } = useUsuarios();
  const { addCancionABaseDatos } = useCanciones();
  const { setPlaylist, setCurrentTrackIndex } = useReproductor();
  const [likesPlaylist, setLikesPlaylist] = useState(0);
  const [playlistsUsuario, setPlaylistsUsuario] = useState([]);
  const [playlistsDestacadas, setPlaylistsDestacadas] = useState([]);
  const [playlistsBuscadas, setPlaylistsBuscadas] = useState([]);

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

  const cargarPlaylistsDestacadas = async () => {
    try {
      const response = await deezerAPI.get("/chart/0/playlists", {
        params: { limit: 10 },
      });
      setPlaylistsDestacadas(response.data.data);
    } catch (error) {
      console.error("Error al cargar playlists destacadas:", error.message);
    }
  };

  const buscarPlaylists = async (termino) => {
    if (!termino) {
      setPlaylistsBuscadas([]);
      return;
    }
    try {
      const response = await deezerAPI.get("/search/playlist", {
        params: { q: termino, limit: 10 },
      });
      setPlaylistsBuscadas(response.data.data);
    } catch (error) {
      console.error("Error al buscar playlists:", error.message);
    }
  };

  const crearPlaylist = async (nuevaLista) => {
    try {
      const { data, error } = await supabaseConexion
        .from("playlists")
        .insert({ nombre: nuevaLista, usuario: usuario.id });

      if (error) {
        throw error;
      }

      setPlaylistsUsuario([...playlistsUsuario, data[0]]);
      cargarPlaylistsUsuario();
    } catch (error) {
      return;
    }
  };

  const obtenerPlaylistUsuarioPorId = async (idPlaylist) => {
    try {
      const { data, error } = await supabaseConexion
        .from("playlists")
        .select("*")
        .eq("id", idPlaylist);

      if (error) {
        throw error;
      }

      return data[0];
    } catch (error) {
      console.error(
        "Error al obtener playlist del usuario por ID:",
        error.message
      );
      throw error;
    }
  };

  const obtenerCancionesPlaylistUsuario = async (idPlaylist) => {
    try {
      const { data, error } = await supabaseConexion
        .from("playlists_canciones")
        .select("canciones(*)")
        .eq("id_playlist", idPlaylist);

      if (error) {
        throw error;
      }

      return data.map((item) => item.canciones);
    } catch (error) {
      console.error(
        `Error al obtener canciones de la playlist del usuario: ${error.message}`
      );
      throw error;
    }
  };

  const contarCancionesEnPlaylist = async (idPlaylist) => {
    try {
      const { data, error } = await supabaseConexion
        .from("playlists_canciones")
        .select("*", { count: "exact" })
        .eq("id_playlist", idPlaylist);

      if (error) {
        throw error;
      }

      return data.length;
    } catch (error) {
      console.error(
        `Error al contar las canciones de la playlist: ${error.message}`
      );
      throw error;
    }
  };

  const addCancionAPlaylist = async (idPlaylist, cancion) => {
    try {
      await addCancionABaseDatos(cancion);

      const { error } = await supabaseConexion
        .from("playlists_canciones")
        .insert([{ id_playlist: idPlaylist, id_cancion: cancion.id }]);

      if (error) throw error;
    } catch (error) {
      console.error("Error al añadir la canción a la playlist:", error.message);
      throw error;
    }
  };

  const quitarCancionDePlaylist = async (idPlaylist, idCancion) => {
    try {
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

  const quitarCancionDeBaseDatos = async (idCancion) => {
    try {
      const { data: relacionOtrasPlaylists, error: errorRelacion } =
        await supabaseConexion
          .from("playlists_canciones")
          .select("*")
          .eq("id_cancion", idCancion);

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

  const obtenerCancionesPlaylist = async (playlistId) => {
    try {
      const response = await deezerAPI.get(`/playlist/${playlistId}/tracks`);
      return response.data.data;
    } catch (error) {
      console.error(
        "Error al obtener canciones de la playlist:",
        error.message
      );
      throw error;
    }
  };

  const obtenerPlaylistDeezerPorId = async (id) => {
    try {
      const response = await deezerAPI.get(`/playlist/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener playlist por ID:", error.message);
      throw error;
    }
  };

  const obtenerDatosPlaylist = async (idPlaylist) => {
    try {
      const playlistData = await obtenerPlaylistDeezerPorId(idPlaylist);
      const cancionesPlaylist = await obtenerCancionesPlaylist(idPlaylist);

      return {
        playlist: playlistData,
        canciones: cancionesPlaylist,
      };
    } catch (error) {
      console.error("Error al obtener datos de la playlist:", error.message);
      throw error;
    }
  };

  const obtenerDatosPlaylistUsuario = async (idPlaylist) => {
    try {
      const playlistData = await obtenerPlaylistUsuarioPorId(idPlaylist);
      const cancionesPlaylist = await obtenerCancionesPlaylistUsuario(
        idPlaylist
      );

      return {
        playlist: playlistData,
        canciones: cancionesPlaylist,
      };
    } catch (error) {
      console.error("Error al obtener datos de la playlist:", error.message);
      throw error;
    }
  };

  const eliminarPlaylist = async (idPlaylist) => {
    try {
      const cancionesPlaylist = await obtenerCancionesPlaylistUsuario(
        idPlaylist
      );

      await supabaseConexion
        .from("playlists_canciones")
        .delete()
        .eq("id_playlist", idPlaylist);

      for (const cancion of cancionesPlaylist) {
        const { data: relacionOtrasPlaylists, error: errorRelacion } =
          await supabaseConexion
            .from("playlists_canciones")
            .select("*")
            .eq("id_cancion", cancion.id);

        if (!relacionOtrasPlaylists || relacionOtrasPlaylists.length === 0) {
          await supabaseConexion
            .from("canciones")
            .delete()
            .eq("id_deezer", cancion.id);
        }
      }

      const { error } = await supabaseConexion
        .from("playlists")
        .delete()
        .eq("id", idPlaylist);

      if (error) {
        throw error;
      }

      setPlaylistsUsuario(
        playlistsUsuario.filter((playlist) => playlist.id !== idPlaylist)
      );
    } catch (error) {
      console.error("Error al eliminar la playlist:", error.message);
      throw error;
    }
  };

  const editarNombrePlaylist = async (idPlaylist, nuevoNombre) => {
    try {
      const { error } = await supabaseConexion
        .from("playlists")
        .update({ nombre: nuevoNombre })
        .eq("id", idPlaylist);

      if (error) {
        throw error;
      }

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

  const cargarPlaylistsPorIdUsuario = async (idUsuario) => {
    try {
      const { data, error } = await supabaseConexion
        .from("playlists")
        .select("*")
        .eq("usuario", idUsuario);

      if (error) {
        throw error;
      } else {
        return data;
      }
    } catch (error) {
      console.error(
        `Error al obtener las playlists del usuario: ${error.message}`
      );
      return [];
    }
  };

  const actualizarPortadaPlaylist = async (playlistId, nuevaPortada) => {
    try {
      const { data, error } = await supabaseConexion
        .from("playlists")
        .update({ portada: nuevaPortada })
        .eq("id", playlistId);

      if (error) {
        throw error;
      }

      console.log("Portada actualizada correctamente");
    } catch (error) {
      console.error("Error al actualizar la foto de perfil:", error.message);
    }
  };

  // Función para contar los likes de una playlist
  const contarLikesPlaylist = async (playlistId) => {
    try {
      const { data, error } = await supabaseConexion
        .from("likes")
        .select("id")
        .eq("playlist", playlistId);

      if (error) {
        throw error;
      }

      return data.length;
    } catch (error) {
      console.error("Error al contar los likes de la playlist:", error.message);
      return 0;
    }
  };

  const agregarComentarioAPlaylist = async (idPlaylist, comentario) => {
    try {
      const { data, error } = await supabaseConexion
        .from("comentarios")
        .insert({
          playlist: idPlaylist,
          usuario: usuario.id,
          comentario: comentario,
        });

      if (error) {
        throw error;
      }
    } catch (error) {
      throw error;
    }
  };

  const obtenerComentariosPlaylist = async (idPlaylist) => {
    try {
      const { data, error } = await supabaseConexion
        .from("comentarios")
        .select("*, usuarios (*)")
        .eq("playlist", idPlaylist);

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error(
        "Error al obtener comentarios de la playlist:",
        error.message
      );
      throw error;
    }
  };

  // Función para eliminar un comentario de una playlist
  const eliminarComentarioDePlaylist = async (idComentario) => {
    try {
      const { error } = await supabaseConexion
        .from("comentarios")
        .delete()
        .eq("id", idComentario);

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error(
        "Error al eliminar comentario de la playlist:",
        error.message
      );
      throw error;
    }
  };

  useEffect(() => {
    cargarPlaylistsDestacadas();
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
    cargarPlaylistsPorIdUsuario,
    actualizarPortadaPlaylist,
    contarCancionesEnPlaylist,
    contarLikesPlaylist,
    likesPlaylist,
    agregarComentarioAPlaylist,
    obtenerComentariosPlaylist,
    eliminarComentarioDePlaylist,
    playlistsBuscadas,
    buscarPlaylists,
  };

  return (
    <CtxPlaylists.Provider value={exports}>{children}</CtxPlaylists.Provider>
  );
};

export default ProveedorPlaylists;
export { CtxPlaylists };
