import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Cancion = ({ cancion, index, reproducirCancion }) => (
  <div className="cancion flex items-center shadow-lg p-3 rounded group mb-2 bg-cards mx-2">
    <div className="relative mr-2 group">
      <img
        className="rounded object-cover"
        src={cancion.album.cover_small}
        alt={cancion.title}
      />
      {/* Overlay con el ícono */}
      <div
        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded"
        onClick={() => reproducirCancion(index)} // Reproducir canción al hacer clic en el overlay
      >
        <FontAwesomeIcon
          icon={faPlay}
          className="text-white hover:text-highlight cursor-pointer fa-lg duration-300 ease-in-out group"
        />
      </div>
    </div>

    <div className="cancion-info w-full min-w-0">
      <p className="cancion-titulo font-semibold text-sm truncate">
        {cancion.title}
      </p>
      <p className="cancion-artista text-sm text-neutral-400 truncate">
        {cancion.artist.name}
      </p>
    </div>
  </div>
);

export default Cancion;
