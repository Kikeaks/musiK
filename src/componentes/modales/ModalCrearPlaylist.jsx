import React, { Fragment, useState } from "react";
import { usePlaylists } from "../../hooks/usePlaylists.js";

// Componente para el modal de crear una nueva playlist.
const ModalCrearPlaylist = ({ mostrar, manejarCerrado }) => {
  // Hook personalizado para crear playlists.
  const { crearPlaylist } = usePlaylists();
  // Estado para almacenar el nombre de la nueva playlist.
  const [nombrePlaylist, setNombrePlaylist] = useState("");
  // Estado para mostrar el mensaje de éxito al crear la playlist.
  const [mensajeExito, setMensajeExito] = useState(false);

  // Función para manejar el envío del formulario de creación de playlist.
  const handleSubmitCrearPlaylist = async () => {
    // Verifica que el nombre de la playlist no esté vacío.
    if (nombrePlaylist.trim() !== "") {
      // Llama a la función para crear la playlist.
      await crearPlaylist(nombrePlaylist);
      // Muestra el mensaje de éxito durante 3 segundos.
      setMensajeExito(true);
      setTimeout(() => {
        setMensajeExito(false);
        manejarCerrado();
      }, 3000);
    }
  };

  return (
    <Fragment>
      {/* Modal */}
      {mostrar && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-gray-900 bg-opacity-50">
          <div className="absolute top-4 right-4">
            {/* Botón para cerrar el modal */}
            <button
              className="text-white rounded-md p-2 bg-gray-800 focus:outline-none"
              onClick={manejarCerrado}
            >
              X
            </button>
          </div>
          {/* Contenido del modal */}
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-slate-800 border-slate-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                  Crear Playlist
                </h1>
                {/* Mensaje de éxito */}
                {mensajeExito ? (
                  <p className="text-green-500 font-semibold">
                    Playlist creada correctamente.
                  </p>
                ) : (
                  <Fragment>
                    {/* Formulario de creación de playlist */}
                    <div className="space-y-4 md:space-y-6">
                      <div>
                        <label
                          htmlFor="nombrePlaylist"
                          className="block mb-2 text-sm font-medium text-white"
                        >
                          Nombre de la Playlist
                        </label>
                        <input
                          type="text"
                          name="nombrePlaylist"
                          id="nombrePlaylist"
                          className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-slate-700 border-slate-600 placeholder-slate-400 text-white focus:ring-indigo-500 focus:border-indigo-600"
                          placeholder="Nombre de la Playlist"
                          value={nombrePlaylist}
                          onChange={(e) => setNombrePlaylist(e.target.value)}
                          required
                        />
                      </div>
                      {/* Botón para crear la playlist */}
                      <button
                        className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-indigo-800"
                        onClick={handleSubmitCrearPlaylist}
                      >
                        Crear Playlist
                      </button>
                    </div>
                  </Fragment>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ModalCrearPlaylist;
