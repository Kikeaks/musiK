import React, { Fragment, useEffect, useState } from "react";
import { useCanciones } from "../hooks/useCanciones.js";
import CancionesCuadricula from "../componentes/canciones/CancionesCuadricula.jsx";
import BarraBusqueda from "../componentes/interfaz/BarraBusqueda.jsx";
import AlbumesCuadricula from "../componentes/albumes/AlbumesCuadricula.jsx"; // Importa el componente de cuadrícula de álbumes
import { useAlbumes } from "../hooks/useAlbumes.js";

// Componente para la página "Explorar".
const Explorar = () => {
  const { canciones } = useCanciones(); // Obtiene las canciones utilizando el hook useCanciones.
  const { albumesDestacados, buscarAlbumes, albumesBuscados } = useAlbumes(); // Usa el contexto de álbumes
  const [busqueda, setBusqueda] = useState("");

  // Carga los álbumes destacados al montar el componente
  useEffect(() => {
    buscarAlbumes(busqueda);
  }, [busqueda]); // Dependencia: busqueda

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
          <h3>Canciones</h3>
          <CancionesCuadricula canciones={canciones} />
          <h3>Álbumes</h3>
          {/* Cuadrícula de álbumes buscados */}
          <AlbumesCuadricula albums={albumesBuscados} />
        </div>
      ) : (
        <>
          <div>
            <h2 className="font-bold text-xl mt-4 mx-4">
              Canciones destacadas
            </h2>
            {/* Cuadrícula de canciones */}
            <CancionesCuadricula canciones={canciones} />
          </div>
          <div>
            {/* Título de la sección de álbumes destacados */}
            <h2 className="font-bold text-xl mt-4 mx-4">
              Álbumes destacados
            </h2>
            {/* Cuadrícula de álbumes */}
            <AlbumesCuadricula albums={albumesDestacados} />
          </div>
        </>
      )}
    </Fragment>
  );
};

export default Explorar;
