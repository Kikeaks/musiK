import React, { useEffect, useState } from "react";
import ColorThief from "colorthief";
import albumDefault from "../../assets/album.jpg";

const AlbumHeader = ({ album, portada, titulo, artista }) => {
  const [backgroundGradient, setBackgroundGradient] = useState("");
  const [imagen, setImagen] = useState(null);

  useEffect(() => {
    if (!portada) {
      setImagen(albumDefault);
    } else {
      setImagen(portada);
    }
  }, [portada]);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imagen;

    img.onload = () => {
      const colorThief = new ColorThief();
      const colors = colorThief.getPalette(img, 2);
      const gradient = `linear-gradient(to bottom, rgb(${colors[0][0]}, ${colors[0][1]}, ${colors[0][2]}), rgb(${colors[1][0]}, ${colors[1][1]}, ${colors[1][2]}))`;
      setBackgroundGradient(gradient);
    };
  }, [imagen]);

  return (
    <div
      className="relative bg-center bg-cover"
      style={{ backgroundImage: `${backgroundGradient}, url(${imagen})` }}
    >
      <div className="flex flex-col sm:flex-row p-3 items-center backdrop-blur-md group mb-2">
        <div className="relative">
          <img
            className="rounded aspect-square shadow-2xl sm:mb-0 mb-4 sm:mr-4 size-auto"
            style={{ maxWidth: "250px" }}
            src={imagen}
            alt={titulo}
          />
        </div>
        <div className="album-info desc text-center sm:text-left w-full min-w-0">
          <h1 className="mb-2 font-bold text-4xl sm:text-5xl truncate">
            {titulo}
          </h1>
          <p className="text-sm truncate">Artista · {artista}</p>
        </div>
      </div>
    </div>
  );
};

export default AlbumHeader;
