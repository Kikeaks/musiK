import React, { useEffect, useState } from "react";
import ColorThief from "colorthief";
import { Link } from "react-router-dom";

// Encabezado para la página de un álbum.
const AlbumHeader = ({ album }) => {
  const [backgroundGradient, setBackgroundGradient] = useState("");

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "Anonymous"; // Permite la extracción de colores de imágenes de dominios cruzados.
    img.src = album.cover_medium;

    img.onload = () => {
      const colorThief = new ColorThief();
      const colors = colorThief.getPalette(img, 2); // Extrae una paleta de dos colores de la imagen.
      const gradient = `linear-gradient(to bottom, rgb(${colors[0][0]}, ${colors[0][1]}, ${colors[0][2]}), rgb(${colors[1][0]}, ${colors[1][1]}, ${colors[1][2]}))`;
      setBackgroundGradient(gradient); // Establece el gradiente de fondo con los colores extraídos.
    };
  }, [album.cover_medium]);

  return (
    <div
      className="relative bg-center bg-cover"
      style={{
        backgroundImage: `${backgroundGradient}, url(${album.cover_medium})`,
      }}
    >
      <div className="flex flex-col sm:flex-row p-3 items-center backdrop-blur-md group mb-2">
        <img
          className="rounded aspect-square shadow-2xl mb-2 sm:mb-0 sm:mr-4 size-44 sm:size-52"
          src={album.cover_medium}
          alt={album.title}
        />
        <div className="album-info desc text-center sm:text-left w-full min-w-0">
          {/* Título del álbum */}
          <h1 className="mb-2 font-bold text-2xl sm:text-3xl md:text-5xl truncate">
            {album.title}
          </h1>
          <div className="flex flex-row w-full min-w-0 items-center justify-center sm:justify-start">
            {/* Imagen del artista */}
            <img
              className="mr-2 size-4 aspect-square rounded-full ring-1 ring-white"
              src={album.artist.picture_medium}
            />
            {/* Enlace al artista */}
            <Link
              className="duration-300 ease-in cursor-pointer group text-sm truncate font-semibold"
              to={`/artista/${album.artist.id}`}
            >
              {album.artist.name}
            </Link>
            {/* Información adicional del álbum: año de lanzamiento y tipo de registro */}
            <span className="text-sm truncate">
              &nbsp;· {album.release_date.split("-")[0]} ·{" "}
              {album.record_type.charAt(0).toUpperCase() +
                album.record_type.slice(1)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumHeader;
