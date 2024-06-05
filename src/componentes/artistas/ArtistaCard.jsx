import React from "react";
import { Link } from "react-router-dom";

// Componente de la tarjeta del artista.
const ArtistaCard = ({ artista }) => {
  return (
    // Enlace a la página del artista específico.
    <Link to={`/artista/${artista.id}`}>
      <div className="perfil shadow-lg p-3 rounded hover:bg-neutral-800 duration-300 ease-in cursor-pointer group bg-cards">
        {/* Imagen del perfil del artista */}
        <img
          className="object-cover aspect-square rounded-full shadow-md w-full"
          src={artista.picture_medium}
          alt={artista.name}
        />
        <div className="perfil-info mt-2">
          {/* Nombre del artista */}
          <p className="perfil-nombre font-semibold truncate">{artista.name}</p>
          {/* Indicador de que es un artista */}
          <p className="perfil-nombre truncate text-sm text-neutral-400">
            Artista
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ArtistaCard;
