import React, { Fragment } from "react";
import PlaylistCard from "./PlaylistCard"; // Importa el componente PlaylistCard

const PlaylistsCuadricula = ({ playlists }) => {
  return (
    <Fragment>
      <div className="p-4 grid grid-cols-2 md:grid-cols-7 gap-8">
        {playlists.map((playlist, index) => (
          <PlaylistCard key={index} playlist={playlist} />
        ))}
      </div>
    </Fragment>
  );
};

export default PlaylistsCuadricula;
