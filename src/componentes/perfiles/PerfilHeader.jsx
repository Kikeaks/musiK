import React from "react";

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
        backgroundImage: `url(${
          fotoPerfil
            ? fotoPerfil
            : "https://static.vecteezy.com/system/resources/previews/023/465/688/original/contact-dark-mode-glyph-ui-icon-address-book-profile-page-user-interface-design-white-silhouette-symbol-on-black-space-solid-pictogram-for-web-mobile-isolated-illustration-vector.jpg"
        })`,
      }}
    >
      {/* Se le aplica "backdrop-blur" para desenfocar el fondo */}
      <div className="flex flex-col sm:flex-row items-center p-3 backdrop-blur-md group mb-3">
        {/* Muestra la imagen del usuario */}
        <img
          className="rounded-full shadow-2xl mb-4 sm:mb-0 sm:mr-4 size-60"
          src={
            fotoPerfil
              ? fotoPerfil
              : "https://static.vecteezy.com/system/resources/previews/023/465/688/original/contact-dark-mode-glyph-ui-icon-address-book-profile-page-user-interface-design-white-silhouette-symbol-on-black-space-solid-pictogram-for-web-mobile-isolated-illustration-vector.jpg"
          }
        />
        {/* Muestra la información del usuario */}
        <div className="usuario-info desc text-center sm:text-left">
          <h1 className="mb-2 font-bold">{nombre}</h1>{" "}
          <p>{numListas} listas de reproducción</p>
          <p>{seguidores} seguidores · {seguidos} seguidos</p>
        </div>
      </div>
    </div>
  );
};

export default UsuarioHeader;
