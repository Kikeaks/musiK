import React, { useEffect, useState } from "react";
import ColorThief from "colorthief";

const AlbumHeader = ({ album, portada, titulo, artista, lanzamiento }) => {
  const [backgroundGradient, setBackgroundGradient] = useState("");

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = portada;

    img.onload = () => {
      const colorThief = new ColorThief();
      const colors = colorThief.getPalette(img, 2);
      const gradient = `linear-gradient(to bottom, rgb(${colors[0][0]}, ${colors[0][1]}, ${colors[0][2]}), rgb(${colors[1][0]}, ${colors[1][1]}, ${colors[1][2]}))`;
      setBackgroundGradient(gradient);
    };
  }, [portada]);

  return (
    <div
      className="relative bg-center bg-cover"
      style={{ backgroundImage: `${backgroundGradient}, url(${portada})` }}
    >
      <div className="flex flex-col sm:flex-row p-3 items-center backdrop-blur-md group mb-2">
        <img
          className="rounded aspect-square shadow-2xl mb-2 sm:mb-0 sm:mr-4 size-44 sm:size-52"
          src={portada}
          alt={titulo}
        />
        <div className="album-info desc text-center sm:text-left w-full min-w-0">
          <h1 className="mb-2 font-bold text-4xl sm:text-5xl truncate">
            {titulo}
          </h1>
          <p className="text-sm truncate">
            {artista} · {lanzamiento}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AlbumHeader;
