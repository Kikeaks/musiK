import React, { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import Inicio from "../../paginas/Inicio.jsx";
import Explorar from "../../paginas/Explorar.jsx";
import MisPlaylists from "../../paginas/MisPlaylists.jsx";

const Rutas = () => {
  return (
    <Fragment>
      <Routes>
        <Route path="/" exact element={<Inicio />} />
        <Route path="/explorar" element={<Explorar />} />
        <Route path="/misplaylists" element={<MisPlaylists />} />
      </Routes>
    </Fragment>
  );
};

export default Rutas;
