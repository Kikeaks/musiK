import React from "react";

const UsuarioHeader = ({ nombre, fotoPerfil, numListas, seguidores, seguidos }) => {
  return (
    <div className="bg-center bg-cover" style={{ backgroundImage: `url(https://c4.wallpaperflare.com/wallpaper/710/985/89/vinyl-music-wallpaper-preview.jpg)` }}>
      {/* Se le aplica "backdrop-blur" para desenfocar el fondo */}
      <div
        className="flex flex-col sm:flex-row items-center p-3 backdrop-blur-md group mb-3"
      >
        {/* Muestra la imagen del usuario */}
        <img className="rounded-full shadow-2xl mb-4 sm:mb-0 sm:mr-4" src={fotoPerfil} />
        {/* Muestra la información del usuario */}
        <div className="usuario-info desc text-left">
          <h1 className="mb-2 font-bold">{nombre}</h1>{" "}
        </div>
      </div>
    </div>
  );
};

export default UsuarioHeader;
