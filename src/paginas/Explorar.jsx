import React, { Fragment } from "react";
import { useCanciones } from "../hooks/useCanciones.js";
import CancionesCuadricula from "../componentes/canciones/CancionesCuadricula.jsx";
import BarraBusqueda from "../componentes/interfaz/BarraBusqueda.jsx";

const Explorar = () => {
  const { canciones } = useCanciones();

  return (
    <Fragment>
      <div>
        <h2 className="font-bold text-2xl text-center mt-3">
          Canciones destacadas
        </h2>
        <div className="flex justify-center items-center mt-3">
          <BarraBusqueda />
        </div>
        <CancionesCuadricula canciones={canciones} />
      </div>
    </Fragment>
  );
};

export default Explorar;
