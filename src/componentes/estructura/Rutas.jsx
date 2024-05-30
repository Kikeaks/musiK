import React, { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import Inicio from "../../paginas/Inicio.jsx";
import Explorar from "../../paginas/Explorar.jsx";
import Playlist from "../../paginas/playlists/Playlist.jsx";
import PlaylistUsuario from "../../paginas/playlists/PlaylistUsuario.jsx";
import PerfilUsuario from "../../paginas/perfiles/PerfilUsuario.jsx";
import Encabezado from "../../componentes/estructura/Encabezado.jsx";
import Login from "../../paginas/auth/Login.jsx";
import Registro from "../../paginas/auth/Registro.jsx";
import Album from "../../paginas/Album.jsx";
import PerfilArtista from "../../paginas/perfiles/PerfilArtista.jsx";

// Componente para definir las rutas de la aplicación.
const Rutas = () => {
  return (
    <Fragment>
      {/* Definición de las rutas */}
      <Routes>
        {/* Encabezado se renderiza para todas las rutas excepto login y registro */}
        <Route
          path="/*"
          element={
            <Fragment>
              <Encabezado />
              <Routes>
                <Route path="/" exact element={<Inicio />} />
                <Route path="/explorar" element={<Explorar />} />
                <Route path="/playlists/deezer/:id" element={<Playlist />} />
                <Route
                  path="/playlists/bbdd/:id"
                  element={<PlaylistUsuario />}
                />
                <Route path="/perfil/:id" element={<PerfilUsuario />} />
                <Route path="/album/:id" element={<Album />} />
                <Route path="/artista/:id" element={<PerfilArtista />} />
              </Routes>
            </Fragment>
          }
        />
        {/* Rutas de autenticación */}
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
      </Routes>
    </Fragment>
  );
};

export default Rutas;
