import React, { useEffect, useState } from "react";
import ColorThief from "colorthief";

const PlaylistHeader = ({ portada, titulo, descripcion, creador }) => {
  const [backgroundGradient, setBackgroundGradient] = useState("");

  // Crea un degradado con el color predominante de la portada y lo pone de fondo (ChatGPT).
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
      {/* Se le aplica "backdrop-blur" para desenfocar el fondo */}
      <div className="flex flex-col sm:flex-row p-3 items-center backdrop-blur-md group mb-2">
        {/* Muestra la imagen de la playlist */}
        <img
          className="rounded shadow-2xl sm:mb-0 mb-4 sm:mr-4 size-auto"
          style={{ maxWidth: "250px" }}
          src={portada}
          alt={titulo}
        />
        {/* Muestra la información de la playlist */}
        <div className="playlist-info desc text-center sm:text-left w-full min-w-0">
          {/* Título de la playlist */}
          <h1 className="mb-2 font-bold text-4xl sm:text-5xl truncate">
            {titulo}
          </h1>{" "}
          {/* Descripción de la playlist */}
          {descripcion && <p className="mb-2 truncate">{descripcion}</p>}
          {/* Creador de la playlist */}
          <p className="text-sm truncate">Creada por · {creador}</p>{" "}
        </div>
      </div>
    </div>
  );
};

export default PlaylistHeader;
