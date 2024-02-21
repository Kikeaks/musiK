import React, { Fragment } from "react";
import Encabezado from "./componentes/estructura/Encabezado.jsx";
import Principal from "./componentes/estructura/Principal.jsx";
import Pie from "./componentes/estructura/Pie.jsx";
import "./App.css";

const App = () => {
  return (
    <Fragment>
{/*       <Encabezado /> */}
      <Principal />
      <Pie />
    </Fragment>
  );
};

export default App;
