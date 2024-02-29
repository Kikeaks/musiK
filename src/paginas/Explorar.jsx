import React, { Fragment } from "react";
import { useCanciones } from "../hooks/useCanciones.js";
import CancionesCuadricula from "../componentes/canciones/CancionesCuadricula.jsx";
import BarraBusqueda from "../componentes/interfaz/BarraBusqueda.jsx";

// Componente para la página "Explorar".
const Explorar = () => {
  const { canciones } = useCanciones(); // Obtiene las canciones utilizando el hook useCanciones.

  return (
    <Fragment>
      <div>
        {/* Título de la sección */}
        <h2 className="font-bold text-2xl text-center mt-3">
          Canciones destacadas
        </h2>
        {/* Barra de búsqueda */}
        <div className="flex justify-center items-center mt-3">
          <BarraBusqueda />
        </div>
        {/* Cuadrícula de canciones */}
        <CancionesCuadricula canciones={canciones} />
      </div>
    </Fragment>
  );
};

export default Explorar;
