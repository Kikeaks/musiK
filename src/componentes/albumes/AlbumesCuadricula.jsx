import React, { Fragment } from "react";
import AlbumCard from "./AlbumCard.jsx";

const AlbumesCuadricula = ({ albums, artista }) => {
  return (
    <Fragment>
      <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-7 gap-8">
        {albums.map((album, index) => (
          <AlbumCard key={index} album={album} artista={artista} />
        ))}
      </div>
    </Fragment>
  );
};

export default AlbumesCuadricula;
