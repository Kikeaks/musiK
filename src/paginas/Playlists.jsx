import React, {Fragment} from 'react'
import { usePlaylists } from '../hooks/usePlaylists';
import BarraBusqueda from '../componentes/interfaz/BarraBusqueda';
import PlaylistsCuadricula from '../componentes/playlists/PlaylistsCuadricula';

const Playlists = () => {
  const { playlistsDestacadas } = usePlaylists(); // Utiliza el hook usePlaylists para obtener las playlists

  return (
    <Fragment>
      <div>
        <BarraBusqueda/>
        <h2 className="font-bold text-2xl text-center mt-3">Playlists destacadas</h2>
        <PlaylistsCuadricula playlists={playlistsDestacadas} /> {/* Utiliza PlaylistsCuadricula en lugar de CancionesCuadricula */}
      </div>
    </Fragment>
  );
}

export default Playlists