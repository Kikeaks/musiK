import React, { useEffect, useState } from "react";
import ColorThief from "colorthief";

const ArtistaHeader = ({ nombre, foto, fans }) => {
  const [backgroundGradient, setBackgroundGradient] = useState("");

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = foto;

    img.onload = () => {
      const colorThief = new ColorThief();
      const colors = colorThief.getPalette(img, 2);
      const gradient = `linear-gradient(to bottom, rgb(${colors[0][0]}, ${colors[0][1]}, ${colors[0][2]}), rgb(${colors[1][0]}, ${colors[1][1]}, ${colors[1][2]}))`;
      setBackgroundGradient(gradient);
    };
  }, [foto]);

  return (
    <div
      className="bg-center bg-cover"
      style={{ backgroundImage: `${backgroundGradient}, url(${foto})` }}
    >
      <div className="flex flex-col sm:flex-row items-center p-3 backdrop-blur-md group mb-2">
        <div className="relative">
          <img
            className="rounded-full aspect-square shadow-2xl mb-4 sm:mb-0 sm:mr-4 size-44 sm:size-52"
            src={foto}
            alt={nombre}
          />
        </div>
        <div className="artista-info text-center sm:text-left">
          <h1 className="mb-2 font-bold text-4xl sm:text-5xl truncate">
            {nombre}
          </h1>
          <p className="text-sm">
            {fans} {fans === 1 ? "fan" : "fans"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArtistaHeader;
