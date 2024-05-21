import React, { useEffect, useState } from "react";
import ColorThief from "colorthief";
import playlistDefault from "../../assets/playlist.jpg";
import { supabaseConexion } from "../../config/supabase";
import { usePlaylists } from "../../hooks/usePlaylists";
import { useUsuarios } from "../../hooks/useUsuarios";

const PlaylistHeader = ({
  playlist,
  portada,
  titulo,
  descripcion,
  creador,
}) => {
  const [backgroundGradient, setBackgroundGradient] = useState("");
  const [imagen, setImagen] = useState(null);

  const { usuario } = useUsuarios();
  const { actualizarPortadaPlaylist } = usePlaylists();

  useEffect(() => {
    if (!portada) {
      setImagen(playlistDefault);
    } else {
      setImagen(portada);
    }
  }, [portada]);

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
            className="rounded aspect-square shadow-2xl sm:mb-0 mb-4 sm:mr-4 size-auto"
            style={{ maxWidth: "250px" }}
            src={imagen}
            alt={titulo}
          />
          {usuario.id === creador.id && (
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
        <div className="playlist-info desc text-center sm:text-left w-full min-w-0">
          {/* Título de la playlist */}
          <h1 className="mb-2 font-bold text-4xl sm:text-5xl truncate">
            {titulo}
          </h1>{" "}
          {/* Descripción de la playlist */}
          {descripcion && <p className="mb-2 truncate">{descripcion}</p>}
          {/* Creador de la playlist */}
          <p className="text-sm truncate">Creada por · {creador.nombre}</p>{" "}
        </div>
      </div>
    </div>
  );
};

export default PlaylistHeader;
