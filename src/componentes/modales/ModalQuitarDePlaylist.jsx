import React, { Fragment, useState } from "react";
import { usePlaylists } from "../../hooks/usePlaylists.js";
import { useNavigate } from "react-router-dom";

// Modal para quitar una canción de una playlist.
const ModalQuitarDePlaylist = ({
  mostrar,
  manejarCerrado,
  cancion,
  playlist,
}) => {
  const { quitarCancionDePlaylist } = usePlaylists();
  const [mensajeExito, setMensajeExito] = useState(false);

  const navigate = useNavigate();

  // Función para quitar la canción de la playlist
  const handleQuitarCancion = async () => {
    try {
      await quitarCancionDePlaylist(playlist, cancion.id_deezer);
      setMensajeExito(true);
      setTimeout(() => {
        setMensajeExito(false);
        navigate(`/playlists/bbdd/${playlist}`)
        manejarCerrado();
      }, 3000);
    } catch (error) {
      console.error(
        "Error al quitar la canción de la playlist:",
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
                <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                  Confirmar eliminación
                </h1>
                {/* Mostrar mensaje de éxito o confirmación de eliminación */}
                {mensajeExito ? (
                  <p className="text-green-500 font-semibold">
                    Canción quitada correctamente.
                  </p>
                ) : (
                  <>
                    <p className="text-white">
                      ¿Estás seguro de quitar esta canción de esta lista?
                    </p>
                    <div className="flex justify-between">
                      {/* Botón para confirmar la eliminación */}
                      <button
                        className="w-1/2 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-red-800"
                        onClick={handleQuitarCancion}
                      >
                        Sí, quitar
                      </button>
                      {/* Botón para cancelar */}
                      <button
                        className="w-1/2 text-white bg-neutral-600 hover:bg-neutral-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-4 focus:ring-neutral-800"
                        onClick={manejarCerrado}
                      >
                        Cancelar
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ModalQuitarDePlaylist;
