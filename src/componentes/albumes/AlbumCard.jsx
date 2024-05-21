import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const AlbumCard = ({ album }) => {
  return (
    <Fragment>
      <Link to={`/albums/deezer/${album.id}`}>
        <div
          id={album.id}
          className="album shadow-lg p-3 rounded hover:bg-neutral-800 duration-300 ease-in cursor-pointer group bg-cards"
        >
          <div className="flex flex-col justify-center items-center mt-1">
            <img
              className="object-cover aspect-square rounded shadow-md"
              src={album.cover_medium}
              alt={album.title}
            />
          </div>
          <div className="album-info desc mt-3">
            <p className="album-titulo font-semibold truncate">
              {album.title}
            </p>
            <p className="album-artista text-sm text-neutral-400 truncate">
              {album.artist.name}
            </p>
          </div>
        </div>
      </Link>
    </Fragment>
  );
};

export default AlbumCard;
