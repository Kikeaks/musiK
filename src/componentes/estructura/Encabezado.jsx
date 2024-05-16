import React, { Fragment } from "react";
import Navegacion from "./Navegacion";

// Componente para el encabezado de la página.
const Encabezado = () => {
  return (
    <Fragment>
      {/* Encabezado de la página */}
      <header>
        {/* Componente de navegación */}
        <Navegacion />
      </header>
    </Fragment>
  );
};

export default Encabezado;
