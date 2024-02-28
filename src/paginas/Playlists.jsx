import React, { Fragment } from "react";
import { usePlaylists } from "../hooks/usePlaylists";
import BarraBusqueda from "../componentes/interfaz/BarraBusqueda";
import PlaylistsCuadricula from "../componentes/playlists/PlaylistsCuadricula";

const Playlists = () => {
  const { playlistsDestacadas, playlistsUsuario } = usePlaylists();

  return (
    <Fragment>
      <div>
        <h2 className="font-bold text-2xl text-center mt-3">Mis playlists</h2>
        <PlaylistsCuadricula playlists={playlistsUsuario} />
        <BarraBusqueda />
        <h2 className="font-bold text-2xl text-center mt-3">
          Playlists destacadas
        </h2>
        <PlaylistsCuadricula playlists={playlistsDestacadas} />
      </div>
    </Fragment>
  );
};

export default Playlists;
