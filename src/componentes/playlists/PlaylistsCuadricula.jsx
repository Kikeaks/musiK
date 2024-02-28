import React, { Fragment } from "react";
import PlaylistCard from "./PlaylistCard.jsx";
import PlaylistUsuarioCard from "./PlaylistUsuarioCard.jsx";

const PlaylistsCuadricula = ({ playlists, origen }) => {
  return (
    <Fragment>
      <div className="p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-8">
        {playlists.map((playlist, index) =>
          origen === "bbdd" ? (
            <PlaylistUsuarioCard key={index} playlist={playlist} />
          ) : (
            <PlaylistCard key={index} playlist={playlist} />
          )
        )}
      </div>
    </Fragment>
  );
};

export default PlaylistsCuadricula;
