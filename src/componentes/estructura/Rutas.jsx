import React, { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import Inicio from "../../paginas/Inicio.jsx";
import Explorar from "../../paginas/Explorar.jsx";
import Playlists from "../../paginas/playlists/Playlists.jsx";
import Playlist from "../../paginas/playlists/Playlist.jsx";
import PlaylistUsuario from "../../paginas/playlists/PlaylistUsuario.jsx";
import PerfilUsuario from "../../paginas/PerfilUsuario.jsx";

// Componente para definir las rutas de la aplicación.
const Rutas = () => {
  return (
    <Fragment>
      {/* Definición de las rutas */}
      <Routes>
        <Route path="/" exact element={<Inicio />} />
        <Route path="/explorar" element={<Explorar />} />
        <Route path="/playlists" element={<Playlists />} />
        <Route path="/playlists/deezer/:id" element={<Playlist />} />
        <Route path="/playlists/bbdd/:id" element={<PlaylistUsuario />} />
        <Route path="/perfil/:id" element={<PerfilUsuario />} />
      </Routes>
    </Fragment>
  );
};

export default Rutas;
