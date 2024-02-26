import React, { Fragment } from "react";
import ListadoCanciones from "../componentes/canciones/ListadoCanciones";
import { useCanciones } from "../hooks/useCanciones.js";
import BarraBusqueda from "../componentes/interfaz/BarraBusqueda.jsx";

const Inicio = () => {
  const { canciones } = useCanciones();
  return (
    <Fragment>
      <div>
        <BarraBusqueda/>
        <ListadoCanciones canciones={canciones} />
      </div>
    </Fragment>
  );
};

export default Inicio;
