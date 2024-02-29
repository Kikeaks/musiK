import React, { Fragment } from "react";
import PlaylistCard from "./PlaylistCard.jsx";
import PlaylistUsuarioCard from "./PlaylistUsuarioCard.jsx";

// Componente para mostrar las playlists tanto del usuario como las extraídas de Deezer en forma de cuadrícula.
const PlaylistsCuadricula = ({ playlists, origen }) => {
  return (
    <Fragment>
      {/* Cuadrícula para mostrar las playlists */}
      <div className="p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-8">
        {/* Iterar sobre las playlists y mostrar la tarjeta correspondiente */}
        {playlists.map((playlist, index) =>
          origen === "bbdd" ? (
            // Si el origen es "bbdd", mostrar la tarjeta de la playlist del usuario
            <PlaylistUsuarioCard key={index} playlist={playlist} />
          ) : (
            // Si el origen no es "bbdd", mostrar la tarjeta de la playlist estándar
            <PlaylistCard key={index} playlist={playlist} />
          )
        )}
      </div>
    </Fragment>
  );
};

export default PlaylistsCuadricula;
