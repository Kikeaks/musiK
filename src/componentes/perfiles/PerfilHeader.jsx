import React, { useState, useEffect } from "react";
import avatarDefault from "../../assets/usuario.jpg";
import ColorThief from "colorthief";
import { supabaseConexion } from "../../config/supabase";
import { useUsuarios } from "../../hooks/useUsuarios";

const PerfilHeader = ({
  perfil,
  nombre,
  fotoPerfil,
  numListas,
  seguidores,
  seguidos,
}) => {
  const [backgroundGradient, setBackgroundGradient] = useState(""); // Estado para el degradado de fondo
  const [avatar, setAvatar] = useState(null); // Estado para la foto de perfil
  const { usuario, actualizarFotoPerfilUsuario } = useUsuarios(); // Obtiene el usuario actual y la función para actualizar la foto de perfil

  // Actualiza el estado de la foto de perfil cuando cambia
  useEffect(() => {
    if (!fotoPerfil) {
      setAvatar(avatarDefault); // Si no hay foto de perfil, usa la imagen predeterminada
    } else {
      setAvatar(fotoPerfil); // Si hay una foto de perfil, establece la imagen
    }
  }, [fotoPerfil]);

  // Crea un degradado con el color predominante de la foto de perfil y lo pone de fondo
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = avatar;

    img.onload = () => {
      const colorThief = new ColorThief();
      const colors = colorThief.getPalette(img, 2);
      const gradient = `linear-gradient(to bottom, rgb(${colors[0][0]}, ${colors[0][1]}, ${colors[0][2]}), rgb(${colors[1][0]}, ${colors[1][1]}, ${colors[1][2]}))`;
      setBackgroundGradient(gradient);
    };
  }, [avatar]);

  // Manejador para cambiar la foto de perfil
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const { data, error } = await supabaseConexion.storage
        .from("avatar")
        .upload(`${usuario.nombre}/${file.name}`, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (error) {
        console.error("Error uploading avatar:", error);
      } else {
        const publicUrl = supabaseConexion.storage
          .from("avatar")
          .getPublicUrl(data.path).data.publicUrl;
        setAvatar(publicUrl);

        actualizarFotoPerfilUsuario(usuario.id, publicUrl);
      }
    }
  };

  return (
    <div
      className="bg-center bg-cover"
      style={{ backgroundImage: `${backgroundGradient}, url(${avatar})` }} // Establece el degradado de fondo y la imagen de avatar como fondo
    >
      <div className="flex flex-col sm:flex-row items-center p-3 backdrop-blur-md group mb-2">
        <div className="relative">
          <img
            className="rounded-full aspect-square shadow-2xl mb-4 sm:mb-0 sm:mr-4 size-44 sm:size-52" // Establece estilos para la imagen de avatar
            src={avatar}
            alt="Avatar"
          />
          {usuario.id === perfil && (
            <label className="absolute bottom-0 right-0 bg-highlight hover:border-white text-white p-2 rounded-full cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
              Cambiar
            </label>
          )}
        </div>
        <div className="usuario-info desc text-center sm:text-left">
          <h1 className="mb-2 font-bold text-2xl sm:text-3xl md:text-5xl truncate">
            {nombre}
          </h1>{" "}
          <p className="mb-2">
            {numListas}{" "}
            {numListas === 1
              ? "lista de reproducción"
              : "listas de reproducción"}
          </p>
          <p className="text-sm">
            {seguidores} {seguidores === 1 ? "seguidor" : "seguidores"} · Sigue
            a {seguidos} {seguidos === 1 ? "usuario" : "usuarios"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PerfilHeader;
