import React, { Fragment } from "react";
import Principal from "./componentes/estructura/Principal.jsx";
import Pie from "./componentes/estructura/Pie.jsx";
import ProveedorCanciones from "./contextos/ProveedorCanciones.jsx";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <Fragment>
      <BrowserRouter>
        <ProveedorCanciones>
          {/*       <Encabezado /> */}
          <Principal />
          <Pie />
        </ProveedorCanciones>
      </BrowserRouter>
    </Fragment>
  );
};

export default App;
