import React from "react";
import { Link } from "react-router-dom";

const PerfilCard = ({ perfil }) => {
  return (
    <div className="perfil shadow-lg p-3 rounded hover:bg-neutral-800 duration-300 ease-in cursor-pointer group bg-cards">
      <Link
        to={`/perfil/${perfil.id}`}
        className="duration-300 ease-in cursor-pointer group"
      >
        {/* Foto de perfil */}
        <div className="flex flex-col justify-center items-center mt-1">
          <img
            className="object-cover aspect-square rounded-full size-36 md:size-40 xl:size-44 2xl:size-48 shadow-lg"
            src={
              perfil.avatar
                ? perfil.avatar
                : "https://static.vecteezy.com/system/resources/previews/023/465/688/original/contact-dark-mode-glyph-ui-icon-address-book-profile-page-user-interface-design-white-silhouette-symbol-on-black-space-solid-pictogram-for-web-mobile-isolated-illustration-vector.jpg"
            }
            alt={perfil.nombre}
          />
        </div>

        {/* Información del usuario */}
        <div className="perfil-info mt-2 text-left">
          {/* Nombre del usuario */}
          <p className="perfil-nombre font-semibold truncate">
            {perfil.nombre}
          </p>
          <p className="perfil-nombre truncate text-sm text-neutral-400">
            {perfil.seguidores.length}{" "}
            {perfil.seguidores.length === 1 ? "seguidor" : "seguidores"}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default PerfilCard;
