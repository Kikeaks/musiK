import React, { Fragment, useEffect, useState } from "react";
import { useCanciones } from "../hooks/useCanciones.js";
import { useAlbumes } from "../hooks/useAlbumes.js";
import { useArtistas } from "../hooks/useArtistas.js";
import { usePlaylists } from "../hooks/usePlaylists.js";
import PlaylistsCuadricula from "../componentes/playlists/PlaylistsCuadricula";
import CancionesCuadricula from "../componentes/canciones/CancionesCuadricula.jsx";
import AlbumesCuadricula from "../componentes/albumes/AlbumesCuadricula.jsx";
import ArtistasCuadricula from "../componentes/artistas/ArtistasCuadricula.jsx";
import PerfilesCuadricula from "../componentes/perfiles/PerfilesCuadricula.jsx";
import BarraBusqueda from "../componentes/interfaz/BarraBusqueda.jsx";
import { useUsuarios } from "../hooks/useUsuarios.js";

// Página de "Explorar".
const Explorar = () => {
  const { cancionesDestacadas, cancionesBuscadas, buscarCanciones } =
    useCanciones();
  const { albumesDestacados, buscarAlbumes, albumesBuscados } = useAlbumes();
  const { artistasDestacados, buscarArtistas, artistasBuscados } =
    useArtistas();
  const { playlistsBuscadas, buscarPlaylists, playlistsDestacadas } =
    usePlaylists();
  const { usuariosBuscados, buscarUsuarios } = useUsuarios();
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("todo");

  // Maneja el término de búsqueda ingresado por el usuario
  const handleSearch = (termino) => {
    setBusqueda(termino);
  };

  // Maneja la selección de la categoría
  const handleCategoriaChange = (categoria) => {
    setCategoria(categoria);
  };

  // Efecto para buscar contenido basado en el término de búsqueda y categoría seleccionada
  useEffect(() => {
    if (busqueda) {
      if (categoria === "todo" || categoria === "canciones") {
        buscarCanciones(busqueda);
      }
      if (categoria === "todo" || categoria === "albumes") {
        buscarAlbumes(busqueda);
      }
      if (categoria === "todo" || categoria === "artistas") {
        buscarArtistas(busqueda);
      }
      if (categoria === "todo" || categoria === "playlists") {
        buscarPlaylists(busqueda);
      }
      if (categoria === "todo" || categoria === "usuarios") {
        buscarUsuarios(busqueda);
      }
    }
  }, [busqueda, categoria]);

  return (
    <Fragment>
      {/* Barra de búsqueda */}
      <div className="flex justify-center items-center mt-3 w-full">
        <BarraBusqueda onSearch={handleSearch} />
      </div>

      {/* Filtros de categoría */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 justify-center items-center mx-4 mt-4">
        <button
          onClick={() => handleCategoriaChange("todo")}
          className={`px-4 py-2 rounded text-white ${
            categoria === "todo" ? "bg-highlight" : "bg-cards"
          }`}
        >
          Todo
        </button>
        <button
          onClick={() => handleCategoriaChange("canciones")}
          className={`px-4 py-2 rounded text-white ${
            categoria === "canciones" ? "bg-highlight" : "bg-cards"
          }`}
        >
          Canciones
        </button>
        <button
          onClick={() => handleCategoriaChange("albumes")}
          className={`px-4 py-2 rounded text-white ${
            categoria === "albumes" ? "bg-highlight" : "bg-cards"
          }`}
        >
          Álbumes
        </button>
        <button
          onClick={() => handleCategoriaChange("artistas")}
          className={`px-4 py-2 rounded text-white ${
            categoria === "artistas" ? "bg-highlight" : "bg-cards"
          }`}
        >
          Artistas
        </button>
        <button
          onClick={() => handleCategoriaChange("playlists")}
          className={`px-4 py-2 rounded text-white ${
            categoria === "playlists" ? "bg-highlight" : "bg-cards"
          }`}
        >
          Playlists
        </button>
        <button
          onClick={() => handleCategoriaChange("usuarios")}
          className={`px-4 py-2 rounded text-white ${
            categoria === "usuarios" ? "bg-highlight" : "bg-cards"
          }`}
        >
          Perfiles
        </button>
      </div>

      {busqueda ? (
        <div>
          {/* Resultados de la búsqueda */}
          <h2 className="font-bold text-xl mx-4 sm:text-2xl mt-3 truncate">
            Resultados para "{busqueda}" en {categoria}
          </h2>
          {(categoria === "todo" || categoria === "canciones") && (
            <>
              <h3 className="font-bold text-lg sm:text-xl mt-4 mx-4">
                Canciones
              </h3>
              <CancionesCuadricula canciones={cancionesBuscadas} />
            </>
          )}
          {(categoria === "todo" || categoria === "albumes") && (
            <>
              <h3 className="font-bold text-lg sm:text-xl mt-4 mx-4">
                Álbumes - Singles - E.P.
              </h3>
              <AlbumesCuadricula albums={albumesBuscados} />
            </>
          )}
          {(categoria === "todo" || categoria === "artistas") && (
            <>
              <h3 className="font-bold text-lg sm:text-xl mt-4 mx-4">
                Artistas
              </h3>
              <ArtistasCuadricula artistas={artistasBuscados} />
            </>
          )}
          {(categoria === "todo" || categoria === "playlists") && (
            <>
              <h3 className="font-bold text-lg sm:text-xl mt-4 mx-4">
                Listas de reproducción
              </h3>
              <PlaylistsCuadricula
                playlists={playlistsBuscadas}
                origen="deezer"
              />
            </>
          )}
          {(categoria === "todo" || categoria === "usuarios") && (
            <>
              <h3 className="font-bold text-lg sm:text-xl mt-4 mx-4">
                Usuarios
              </h3>
              <PerfilesCuadricula perfiles={usuariosBuscados} />
            </>
          )}
        </div>
      ) : (
        <>
          {/* Contenido destacado */}
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
            <h2 className="font-bold text-xl mt-4 mx-4 sm:text-2xl">
              Listas de reproducción destacadas
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
