import React, { Fragment, useEffect, useState } from "react";
import { useCanciones } from "../hooks/useCanciones.js";
import CancionesCuadricula from "../componentes/canciones/CancionesCuadricula.jsx";
import BarraBusqueda from "../componentes/interfaz/BarraBusqueda.jsx";
import AlbumesCuadricula from "../componentes/albumes/AlbumesCuadricula.jsx";
import ArtistasCuadricula from "../componentes/artistas/ArtistasCuadricula.jsx";
import { useAlbumes } from "../hooks/useAlbumes.js";
import { useArtistas } from "../hooks/useArtistas.js";

// Componente para la página "Explorar".
const Explorar = () => {
  const { canciones } = useCanciones();
  const { albumesDestacados, buscarAlbumes, albumesBuscados } = useAlbumes();
  const { artistasDestacados, buscarArtistas, artistasBuscados } =
    useArtistas();
  const [busqueda, setBusqueda] = useState("");

  // Efecto para buscar álbumes y artistas cuando cambia la búsqueda
  useEffect(() => {
    buscarAlbumes(busqueda);
    buscarArtistas(busqueda);
  }, [busqueda]);

  const handleSearch = (termino) => {
    setBusqueda(termino);
  };

  return (
    <Fragment>
      {/* Barra de búsqueda */}
      <div className="flex justify-center items-center mt-3 w-full">
        <BarraBusqueda onSearch={handleSearch} />
      </div>
      {busqueda ? (
        <div>
          {/* Título de la sección de resultados de búsqueda */}
          <h2 className="font-bold text-xl mx-4 sm:text-2xl mt-3 truncate">
            Resultados para "{busqueda}"
          </h2>
          <h3 className="font-bold text-lg sm:text-xl mt-4 mx-4">Canciones</h3>
          <CancionesCuadricula canciones={canciones} />
          <h3 className="font-bold text-lg sm:text-xl mt-4 mx-4">Álbumes</h3>
          <AlbumesCuadricula albums={albumesBuscados} />
          <h3 className="font-bold text-lg sm:text-xl mt-4 mx-4">Artistas</h3>
          <ArtistasCuadricula artistas={artistasBuscados} />
        </div>
      ) : (
        <>
          <div>
            <h2 className="font-bold text-xl mt-6 mx-4 sm:text-2xl">
              Canciones destacadas
            </h2>
            <CancionesCuadricula canciones={canciones} />
          </div>
          <div>
            <h2 className="font-bold text-xl mt-4 mx-4 sm:text-2xl">
              Álbumes destacados
            </h2>
            <AlbumesCuadricula albums={albumesDestacados} />
          </div>
          <div>
            <h2 className="font-bold text-xl mt-4 mx-4 sm:text-2xl">
              Artistas destacados
            </h2>
            <ArtistasCuadricula artistas={artistasDestacados} />
          </div>
        </>
      )}
    </Fragment>
  );
};

export default Explorar;
