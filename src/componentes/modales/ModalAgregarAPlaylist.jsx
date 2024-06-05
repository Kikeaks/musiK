import React, { Fragment, useState } from "react";
import { useUsuarios } from "../../hooks/useUsuarios.js";
import { usePlaylists } from "../../hooks/usePlaylists.js";

// Componente para el modal de agregar canción a playlist.
const ModalAgregarAPlaylist = ({ mostrar, manejarCerrado, cancion }) => {
  // Hook personalizado para obtener las playlists del usuario.
  const { playlistsUsuario, addCancionAPlaylist } = usePlaylists();
  // Hook personalizado para verificar si el usuario ha iniciado sesión.
  const { sesionIniciada } = useUsuarios();
  // Estado para almacenar el ID de la playlist seleccionada.
  const [playlistId, setPlaylistId] = useState("");
  // Estado para mostrar el mensaje de éxito al agregar la canción.
  const [mensajeExito, setMensajeExito] = useState(false);

  // Función para manejar la adición de la canción a la playlist.
  const handleAgregarCancion = async () => {
    try {
      // Llama a la función para agregar la canción a la playlist.
      await addCancionAPlaylist(playlistId, cancion);
      // Muestra el mensaje de éxito durante 3 segundos.
      setMensajeExito(true);
      setTimeout(() => {
        setMensajeExito(false);
        manejarCerrado();
      }, 3000);
    } catch (error) {
      console.error(
        "Error al agregar la canción a la playlist:",
        error.message
      );
    }
  };

  return (
    <Fragment>
      {/* Modal */}
      {mostrar && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-neutral-900 bg-opacity-50">
          <div className="absolute top-4 right-4">
            {/* Botón para cerrar el modal */}
            <button
              className="text-white rounded-md p-2 bg-neutral-800 focus:outline-none"
              onClick={manejarCerrado}
            >
              X
            </button>
          </div>
          {/* Contenido del modal */}
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-cards border-neutral-800">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-lg font-bold leading-tight tracking-tight md:text-2xl text-white">
                  Agregar a lista de reproducción
                </h1>
                {/* Mensaje de éxito */}
                {sesionIniciada ? (
                  mensajeExito ? (
                    <p className="text-green-500 font-semibold">
                      Canción añadida correctamente.
                    </p>
                  ) : (
                    <>
                      {/* Selector de playlist */}
                      <div className="space-y-4 md:space-y-6">
                        <label
                          htmlFor="playlist"
                          className="block mb-2 text-sm md:text-base font-medium text-white"
                        >
                          Selecciona una lista
                        </label>
                        <select
                          id="playlist"
                          name="playlist"
                          className="cursor-pointer border-cards text-sm rounded focus:ring-highlight hover:border-white focus:border-highlight block w-full p-2.5 bg-neutral-800 placeholder-neutral-600 text-white duration-300 ease-in"
                          value={playlistId}
                          onChange={(e) => setPlaylistId(e.target.value)}
                        >
                          <option value="" disabled>
                            - Selecciona una lista -
                          </option>
                          {/* Mapeo de las playlists del usuario */}
                          {playlistsUsuario.map((playlist) => (
                            <option key={playlist.id} value={playlist.id}>
                              {playlist.nombre}
                            </option>
                          ))}
                        </select>
                      </div>
                      {/* Botón para agregar la canción a la playlist */}
                      <button
                        className="w-full text-white font-medium rounded-lg hover:border-white text-center text-base focus:border-highlight focus:ring-highlight duration-300 ease-in cursor-pointer group bg-highlight"
                        onClick={() => {
                          handleAgregarCancion();
                        }}
                        disabled={!playlistId}
                      >
                        Agregar a lista
                      </button>
                    </>
                  )
                ) : (
                  <p>Para añadir canciones a una playlist, inicia sesión.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ModalAgregarAPlaylist;
