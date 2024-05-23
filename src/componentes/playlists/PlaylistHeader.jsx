import React, { useEffect, useState } from "react";
import ColorThief from "colorthief";
import playlistDefault from "../../assets/playlist.jpg";
import avatarDefault from "../../assets/usuario.jpg";
import { supabaseConexion } from "../../config/supabase";
import { usePlaylists } from "../../hooks/usePlaylists";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";

const PlaylistHeader = ({
  playlist,
  portada,
  titulo,
  descripcion,
  creador,
  likes,
  toggleLike,
  tieneLike,
  usuario,
  sesionIniciada,
}) => {
  const [backgroundGradient, setBackgroundGradient] = useState("");
  const [imagen, setImagen] = useState(null);
  const [cantidadCanciones, setCantidadCanciones] = useState(0);
  const [cantidadComentarios, setCantidadComentarios] = useState(0);

  const { obtenerComentariosPlaylist } = usePlaylists();
  const { actualizarPortadaPlaylist, contarCancionesEnPlaylist } =
    usePlaylists();

  useEffect(() => {
    if (!portada) {
      setImagen(playlistDefault);
    } else {
      setImagen(portada);
    }
  }, [portada]);

  useEffect(()=>{
    if (creador.nombre) {
      const obtenerCantidadComentarios = async()=>{
        const comentarios = await obtenerComentariosPlaylist(playlist.id);
        setCantidadComentarios(comentarios.length);
      }
      obtenerCantidadComentarios();
    }
  }, [creador.nombre, obtenerComentariosPlaylist, playlist.id])

  useEffect(() => {
    if (creador.nombre) {
      const obtenerCantidadCanciones = async () => {
        try {
          const count = await contarCancionesEnPlaylist(playlist.id);
          setCantidadCanciones(count);
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
      <div className="flex flex-col sm:flex-row p-3 items-center backdrop-blur-md group mb-2">
        <div className="relative">
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
        <div className="playlist-info desc w-full min-w-0 text-center sm:text-left">
          <h1 className="mb-2 font-bold text-4xl sm:text-5xl truncate">
            {titulo}
          </h1>
          {descripcion && <p className="mb-2 truncate">{descripcion}</p>}
          {creador.id ? (
            <div className="flex flex-row w-full min-w-0 items-center justify-center sm:justify-start">
              <img
                className="mr-2 size-4 aspect-square rounded-full ring-1 ring-white"
                src={creador.avatar ? creador.avatar : avatarDefault}
              />
              <Link
                className="duration-300 ease-in cursor-pointer group text-sm truncate font-semibold"
                to={`/perfil/${creador.id}`}
              >
                {creador.nombre}
              </Link>
              <span className="text-sm">
                &nbsp;· {cantidadCanciones} {cantidadCanciones === 1 ? "canción" : "canciones"}
              </span>
            </div>
          ) : (
            <p className="text-sm truncate">
              {creador} · {playlist.nb_tracks} canciones
            </p>
          )}
          {creador.nombre && (
            <div className="mt-2">
            <FontAwesomeIcon
                onClick={
                  sesionIniciada && usuario.id !== playlist.usuario ? toggleLike : null
                }
              className={`mr-1 duration-300 ease-in group ${
                tieneLike ? "text-highlight" : "text-white"
              } ${
                sesionIniciada &&
                usuario.id !== playlist.usuario &&
                "cursor-pointer"
              }
              `}
              icon={faHeart}
            />
            <span className="text-sm mr-3">{likes}</span>
            <FontAwesomeIcon className="mr-1" icon={faComment}/>
            <span className="text-sm">{cantidadComentarios}</span>
          </div>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default PlaylistHeader;
