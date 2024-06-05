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
        setNombrePlaylist("");
        manejarCerrado();
      }, 3000);
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
                  Crear lista de reproducción
                </h1>
                {/* Mensaje de éxito */}
                {mensajeExito ? (
                  <p className="text-green-500 font-semibold">
                    Lista creada correctamente.
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
                          Nombre de la lista
                        </label>
                        <input
                          type="text"
                          name="nombrePlaylist"
                          id="nombrePlaylist"
                          className="border-cards text-sm rounded focus:ring-highlight hover:border-white focus:border-highlight block w-full p-2.5 bg-neutral-800 placeholder-neutral-600 text-white duration-300 ease-in"
                          placeholder="Establece un nombre..."
                          value={nombrePlaylist}
                          onChange={(e) => setNombrePlaylist(e.target.value)}
                          required
                        />
                      </div>
                      {/* Botón para crear la playlist */}
                      <button
                        className="w-full text-white font-medium rounded-lg hover:border-white text-center text-base focus:border-highlight focus:ring-highlight duration-300 ease-in cursor-pointer group bg-highlight"
                        onClick={handleSubmitCrearPlaylist}
                      >
                        Crear lista
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
