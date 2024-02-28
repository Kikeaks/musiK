import React, { Fragment } from "react";
import Navegacion from "./Navegacion";
import LoginRegistro from "../interfaz/LoginRegistro";

const Encabezado = () => {
  return (
    <Fragment>
      <header>
        <Navegacion />
        <LoginRegistro />
      </header>
    </Fragment>
  );
};

export default Encabezado;
