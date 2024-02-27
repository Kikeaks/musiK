import React, { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import Inicio from "../../paginas/Inicio.jsx";
import Explorar from "../../paginas/Explorar.jsx";
import Playlists from "../../paginas/Playlists.jsx";

const Rutas = () => {
  return (
    <Fragment>
      <Routes>
        <Route path="/" exact element={<Inicio />} />
        <Route path="/explorar" element={<Explorar />} />
        <Route path="/playlists" element={<Playlists />} />
      </Routes>
    </Fragment>
  );
};

export default Rutas;
