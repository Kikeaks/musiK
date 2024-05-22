import React, { useEffect, useState } from "react";
import ColorThief from "colorthief";
import playlistDefault from "../../assets/playlist.jpg";
import avatarDefault from "../../assets/usuario.jpg";
import { supabaseConexion } from "../../config/supabase";
import { usePlaylists } from "../../hooks/usePlaylists";
import { useUsuarios } from "../../hooks/useUsuarios";
import { Link } from "react-router-dom";

const PlaylistHeader = ({
  playlist,
  portada,
  titulo,
  descripcion,
  creador,
  likes,
}) => {
  const [backgroundGradient, setBackgroundGradient] = useState("");
  const [imagen, setImagen] = useState(null);
  const [cantidad, setCantidad] = useState(0);

  const { usuario, sesionIniciada } = useUsuarios();
  const { actualizarPortadaPlaylist, contarCancionesEnPlaylist } =
    usePlaylists();

  useEffect(() => {
    if (!portada) {
      setImagen(playlistDefault);
    } else {
      setImagen(portada);
    }
  }, [portada]);

  useEffect(() => {
    // Verifica si creador.nombre está definido, lo que indica que es una playlist creada por un usuario
    if (creador.nombre) {
      const obtenerCantidadCanciones = async () => {
        try {
          const count = await contarCancionesEnPlaylist(playlist.id);
          setCantidad(count);
        } catch (error) {
          console.error(
            "Error al obtener la cantidad de canciones:",
            error.message
          );
        }
      };

      obtenerCantidadCanciones();
    }
  }, [creador.nombre, contarCancionesEnPlaylist, playlist.id]);

  // Crea un degradado con el color predominante de la portada y lo pone de fondo (ChatGPT).
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imagen;

    img.onload = () => {
      const colorThief = new ColorThief();
      const colors = colorThief.getPalette(img, 2);
      const gradient = `linear-gradient(to bottom, rgb(${colors[0][0]}, ${colors[0][1]}, ${colors[0][2]}), rgb(${colors[1][0]}, ${colors[1][1]}, ${colors[1][2]}))`;
      setBackgroundGradient(gradient);
    };
  }, [imagen]);

  const handleCoverChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const { data, error } = await supabaseConexion.storage
        .from("playlist")
        .upload(`${creador.nombre}/${titulo}/${file.name}`, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (error) {
        console.error("Error uploading cover image:", error);
      } else {
        const publicUrl = supabaseConexion.storage
          .from("playlist")
          .getPublicUrl(data.path).data.publicUrl;
        setImagen(publicUrl);

        actualizarPortadaPlaylist(playlist.id, publicUrl);
      }
    }
  };

  return (
    <div
      className="relative bg-center bg-cover"
      style={{ backgroundImage: `${backgroundGradient}, url(${imagen})` }}
    >
      {/* Se le aplica "backdrop-blur" para desenfocar el fondo */}
      <div className="flex flex-col sm:flex-row p-3 items-center backdrop-blur-md group mb-2">
        <div className="relative">
          {/* Muestra la imagen de la playlist */}
          <img
            className="rounded aspect-square shadow-2xl mb-2 sm:mb-0 sm:mr-4 size-44 sm:size-52"
            style={{ maxWidth: "250px" }}
            src={imagen}
            alt={titulo}
          />
          {sesionIniciada && usuario.id === creador.id && (
            <label className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleCoverChange}
              />
              Cambiar
            </label>
          )}
        </div>
        {/* Muestra la información de la playlist */}
        <div className="playlist-info desc w-full min-w-0 text-center sm:text-left">
          {/* Título de la playlist */}
          <h1 className="mb-2 font-bold text-4xl sm:text-5xl truncate">
            {titulo}
          </h1>{" "}
          {/* Descripción de la playlist */}
          {descripcion && <p className="mb-2 truncate">{descripcion}</p>}
          {/* Creador de la playlist */}
          {creador.id ? (
            <div className="flex flex-row w-full min-w-0 items-center text-center sm:text-left">
              <img
                className="mr-2 size-4 aspect-square rounded-full ring-2 ring-white"
                src={creador.avatar ? creador.avatar : avatarDefault}
              />{" "}
              <Link
                className="duration-300 ease-in cursor-pointer group text-sm truncate font-semibold"
                to={`/perfil/${creador.id}`}
              >
                {creador.nombre}
              </Link>
              <span className="text-sm">
                &nbsp;· {cantidad} {cantidad === 1 ? "canción" : "canciones"}
              </span>
              <span className="text-sm">
                &nbsp;· {likes} {likes === 1 ? "like" : "likes"}
              </span>
            </div>
          ) : (
            <p className="text-sm truncate">
              {creador} · {playlist.nb_tracks} canciones
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaylistHeader;
