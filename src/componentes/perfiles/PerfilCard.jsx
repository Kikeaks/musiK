import React from "react";
import { Link } from "react-router-dom";

const PerfilCard = ({ perfil }) => {
  return (
    <div className="perfil shadow-lg p-3 rounded hover:bg-neutral-800 duration-300 ease-in cursor-pointer group bg-cards"><Link to={`/perfil/${perfil.id}`} className="duration-300 ease-in cursor-pointer group">
      {/* Foto de perfil */}
      <div className="rounded-full overflow-hidden size-36 md:size-40">
        <img
          className="object-cover"
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
        <p className="perfil-nombre font-semibold text-onNeutralBg truncate">
          {perfil.nombre}
        </p>
      </div>
      </Link>
    </div>
  );
};

export default PerfilCard;
