import React, { Fragment } from "react";
import Navegacion from "./Navegacion";
import LoginRegistro from "../interfaz/LoginRegistro";

// Componente para el encabezado de la página.
const Encabezado = () => {
  return (
    <Fragment>
      {/* Encabezado de la página */}
      <header>
        {/* Componente de navegación */}
        <Navegacion />
        {/* Componente de inicio de sesión y registro */}
        <LoginRegistro />
      </header>
    </Fragment>
  );
};

export default Encabezado;
