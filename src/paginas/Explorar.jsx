import React, { Fragment } from "react";
import { useCanciones } from "../hooks/useCanciones.js";
import CancionesCuadricula from "../componentes/canciones/CancionesCuadricula.jsx";
import BarraBusqueda from "../componentes/interfaz/BarraBusqueda.jsx";

const Explorar = () => {
  const { canciones } = useCanciones();

  return (
    <Fragment>
      <div>
        <BarraBusqueda/>
        <h2 className="font-bold text-2xl text-center mt-3">Canciones destacadas</h2>
        <CancionesCuadricula canciones={canciones} />
      </div>
    </Fragment>
  );
};

export default Explorar;
