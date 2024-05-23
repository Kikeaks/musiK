import React, { Fragment, useEffect, useState } from "react";
import { useCanciones } from "../hooks/useCanciones.js";
import CancionesCuadricula from "../componentes/canciones/CancionesCuadricula.jsx";
import BarraBusqueda from "../componentes/interfaz/BarraBusqueda.jsx";
import AlbumesCuadricula from "../componentes/albumes/AlbumesCuadricula.jsx";
import ArtistasCuadricula from "../componentes/artistas/ArtistasCuadricula.jsx";
import { useAlbumes } from "../hooks/useAlbumes.js";
import { useArtistas } from "../hooks/useArtistas.js";
import PlaylistsCuadricula from "../componentes/playlists/PlaylistsCuadricula";
import { usePlaylists } from "../hooks/usePlaylists.js";

const Explorar = () => {
  const { cancionesDestacadas, cancionesBuscadas, buscarCanciones } =
    useCanciones();
  const { albumesDestacados, buscarAlbumes, albumesBuscados } = useAlbumes();
  const { artistasDestacados, buscarArtistas, artistasBuscados } =
    useArtistas();
  const { playlistsBuscadas, buscarPlaylists, playlistsDestacadas } =
    usePlaylists();
  const [busqueda, setBusqueda] = useState("");

  const handleSearch = (termino) => {
    setBusqueda(termino);
  };

  useEffect(() => {
    buscarCanciones(busqueda);
    buscarAlbumes(busqueda);
    buscarArtistas(busqueda);
    buscarPlaylists(busqueda);
  }, [busqueda]);

  return (
    <Fragment>
      <div className="flex justify-center items-center mt-3 w-full">
        <BarraBusqueda onSearch={handleSearch} />
      </div>
      {busqueda ? (
        <div>
          <h2 className="font-bold text-xl mx-4 sm:text-2xl mt-3 truncate">
            Resultados para "{busqueda}"
          </h2>
          <h3 className="font-bold text-lg sm:text-xl mt-4 mx-4">Canciones</h3>
          <CancionesCuadricula canciones={cancionesBuscadas} />
          <h3 className="font-bold text-lg sm:text-xl mt-4 mx-4">
            Álbumes - Singles - E.P.
          </h3>
          <AlbumesCuadricula albums={albumesBuscados} />
          <h3 className="font-bold text-lg sm:text-xl mt-4 mx-4">Artistas</h3>
          <ArtistasCuadricula artistas={artistasBuscados} />
          <h3 className="font-bold text-lg sm:text-xl mt-4 mx-4">
            Playlists
          </h3>{" "}
          {/* Agregado */}
          <PlaylistsCuadricula
            playlists={playlistsBuscadas}
            origen="deezer"
          />{" "}
          {/* Agregado */}
        </div>
      ) : (
        <>
          <div>
            <h2 className="font-bold text-xl mt-6 mx-4 sm:text-2xl">
              Canciones destacadas
            </h2>
            <CancionesCuadricula canciones={cancionesDestacadas} />
          </div>
          <div>
            <h2 className="font-bold text-xl mt-4 mx-4 sm:text-2xl">
              Álbumes - Singles - E.P. destacados
            </h2>
            <AlbumesCuadricula albums={albumesDestacados} />
          </div>
          <div>
            <h2 className="font-bold text-xl mt-4 mx-4 sm:text-2xl">
              Artistas destacados
            </h2>
            <ArtistasCuadricula artistas={artistasDestacados} />
          </div>
          <div>
            {" "}
            {/* Agregado */}
            <h2 className="font-bold text-xl mt-4 mx-4 sm:text-2xl">
              Playlists destacadas
            </h2>
            <PlaylistsCuadricula
              playlists={playlistsDestacadas}
              origen="deezer"
            />
          </div>
        </>
      )}
    </Fragment>
  );
};

export default Explorar;
