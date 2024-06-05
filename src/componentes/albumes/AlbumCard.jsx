import React, { Fragment } from "react";
import { Link } from "react-router-dom";

// Componente de las tarjetas de álbumes.
const AlbumCard = ({ album, artista }) => {
  return (
    <Fragment>
      {/* Enlace a la página del álbum específico */}
      <Link to={`/album/${album.id}`}>
        <div
          id={album.id}
          className="album shadow-lg p-3 rounded hover:bg-neutral-800 duration-300 ease-in cursor-pointer group bg-cards"
        >
          <div className="flex flex-col justify-center items-center mt-1">
            {/* Imagen de la portada del álbum */}
            <img
              className="object-cover aspect-square rounded shadow-md"
              src={album.cover_medium}
              alt={album.title}
            />
          </div>
          <div className="album-info desc mt-3">
            {/* Título del álbum */}
            <p className="album-titulo font-semibold truncate">{album.title}</p>
            {/* Nombre del artista, puede ser pasado como prop o extraído del álbum */}
            <p className="album-artista text-sm text-neutral-400 truncate">
              <span>{artista ? artista : album.artist.name}</span>
            </p>
          </div>
        </div>
      </Link>
    </Fragment>
  );
};

export default AlbumCard;
