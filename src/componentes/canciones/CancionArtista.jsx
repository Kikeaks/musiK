import React from "react";

const CancionArtista = ({ cancion }) => (
  <div className="cancion flex items-center shadow-lg p-3 rounded group mb-2 bg-cards mx-2">
    <img
      className="rounded mr-2"
      src={cancion.album.cover_small}
      alt={cancion.title}
    />
    <div className="cancion-info w-full min-w-0">
      <p className="cancion-titulo font-semibold text-sm truncate">{cancion.title}</p>
      <p className="cancion-artista text-sm text-neutral-400 truncate">{cancion.artist.name}</p>
    </div>
  </div>
);

export default CancionArtista;
