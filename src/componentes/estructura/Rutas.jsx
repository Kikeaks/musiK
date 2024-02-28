import React, { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import Inicio from "../../paginas/Inicio.jsx";
import Explorar from "../../paginas/Explorar.jsx";
import Playlists from "../../paginas/playlists/Playlists.jsx";
import Playlist from "../../paginas/playlists/Playlist.jsx";
import PlaylistUsuario from "../../paginas/playlists/PlaylistUsuario.jsx";

const Rutas = () => {
  return (
    <Fragment>
      <Routes>
        <Route path="/" exact element={<Inicio />} />
        <Route path="/explorar" element={<Explorar />} />
        <Route path="/playlists" element={<Playlists />} />
        <Route path="/playlists/deezer/:id" element={<Playlist />} />
        <Route path="/playlists/bbdd/:id" element={<PlaylistUsuario />} />
      </Routes>
    </Fragment>
  );
};

export default Rutas;
