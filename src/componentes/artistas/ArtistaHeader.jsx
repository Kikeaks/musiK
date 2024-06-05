import React, { useEffect, useState } from "react";
import ColorThief from "colorthief";

// Componente del encabezado del artista.
const ArtistaHeader = ({ nombre, foto, fans }) => {
  const [backgroundGradient, setBackgroundGradient] = useState("");

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "Anonymous"; // Permite la extracción de colores de imágenes de dominios cruzados.
    img.src = foto;

    img.onload = () => {
      const colorThief = new ColorThief();
      const colors = colorThief.getPalette(img, 2); // Extrae una paleta de dos colores de la imagen.
      const gradient = `linear-gradient(to bottom, rgb(${colors[0][0]}, ${colors[0][1]}, ${colors[0][2]}), rgb(${colors[1][0]}, ${colors[1][1]}, ${colors[1][2]}))`;
      setBackgroundGradient(gradient); // Establece el gradiente de fondo con los colores extraídos.
    };
  }, [foto]);

  return (
    <div
      className="bg-center bg-cover"
      style={{ backgroundImage: `${backgroundGradient}, url(${foto})` }}
    >
      <div className="flex flex-col sm:flex-row items-center p-3 backdrop-blur-md group mb-2">
        <div className="relative">
          {/* Imagen del artista */}
          <img
            className="rounded-full aspect-square shadow-2xl mb-4 sm:mb-0 sm:mr-4 size-44 sm:size-52"
            src={foto}
            alt={nombre}
          />
        </div>
        <div className="artista-info text-center sm:text-left">
          {/* Nombre del artista */}
          <h1 className="mb-2 font-bold text-2xl sm:text-3xl md:text-5xl truncate">
            {nombre}
          </h1>
          {/* Cantidad de fans del artista */}
          <p className="text-sm">
            {fans} {fans === 1 ? "fan" : "fans"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArtistaHeader;
