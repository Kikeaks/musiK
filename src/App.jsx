import React, { Fragment } from "react";
import Navegacion from "./componentes/estructura/Navegacion.jsx";
import Principal from "./componentes/estructura/Principal.jsx";
import Pie from "./componentes/estructura/Pie.jsx";
import "./App.css";

const App = () => {
  return (
    <Fragment>
      <Navegacion />
      <Principal />
      <Pie />
    </Fragment>
  );
};

export default App;
