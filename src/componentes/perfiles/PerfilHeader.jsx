import React from "react";
import avatarDefault from "../../assets/usuario.jpg";

const UsuarioHeader = ({
  nombre,
  fotoPerfil,
  numListas,
  seguidores,
  seguidos,
}) => {
  return (
    <div
      className="bg-center bg-cover"
      style={{
        backgroundImage: `url(${fotoPerfil ? fotoPerfil : avatarDefault})`,
      }}
    >
      {/* Se le aplica "backdrop-blur" para desenfocar el fondo */}
      <div className="flex flex-col sm:flex-row items-center p-3 backdrop-blur-md group mb-3">
        {/* Muestra la imagen del usuario */}
        <img
          className="rounded-full aspect-square shadow-2xl mb-4 sm:mb-0 sm:mr-4 size-44 sm:size-52"
          src={fotoPerfil ? fotoPerfil : avatarDefault}
        />
        {/* Muestra la información del usuario */}
        <div className="usuario-info desc text-center sm:text-left">
          <h1 className="mb-2 font-bold">{nombre}</h1>{" "}
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

export default UsuarioHeader;
