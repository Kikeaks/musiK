import React, { Fragment } from "react";
import Principal from "./componentes/estructura/Principal.jsx";
import Pie from "./componentes/estructura/Pie.jsx";
import ProveedorCanciones from "./contextos/ProveedorCanciones.jsx";
import { BrowserRouter } from "react-router-dom";
import Encabezado from "./componentes/estructura/Encabezado.jsx";
import ProveedorUsuarios from "./contextos/ProveedorUsuarios.jsx";

const App = () => {
  return (
    <Fragment>
      <BrowserRouter>
        <ProveedorUsuarios>
          <ProveedorCanciones>
            <main>
              <Encabezado />
              <Principal />
              <Pie />
            </main>
          </ProveedorCanciones>
        </ProveedorUsuarios>
      </BrowserRouter>
    </Fragment>
  );
};

export default App;
