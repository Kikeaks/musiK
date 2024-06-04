import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePlaylists } from "../../hooks/usePlaylists.js";
import { useUsuarios } from "../../hooks/useUsuarios.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

// Componente para el modal de editar una playlist.
const ModalEditarPlaylist = ({ mostrar, manejarCerrado, playlist }) => {
  // Hook personalizado para editar y eliminar playlists.
  const { editarNombrePlaylist, eliminarPlaylist } = usePlaylists();
  // Estado para almacenar el nuevo nombre de la playlist.
  const [nuevoNombrePlaylist, setNuevoNombrePlaylist] = useState("");
  const [confirmarBorrado, setConfirmarBorrado] = useState(false);
  // Estado para mostrar el mensaje de éxito al editar la playlist.
  const [mensajeExito, setMensajeExito] = useState(false);
  const { usuario } = useUsuarios();
  // Hook para navegar a la página de playlists después de editar o eliminar.
  const navigate = useNavigate();

  // Función para manejar la edición del nombre de la playlist.
  const handleSubmitEditarNombrePlaylist = async () => {
    // Verifica que el nuevo nombre no esté vacío.
    if (nuevoNombrePlaylist.trim() !== "") {
      // Llama a la función para editar el nombre de la playlist.
      await editarNombrePlaylist(playlist, nuevoNombrePlaylist);
      // Muestra el mensaje de éxito durante 3 segundos.
      setMensajeExito(true);
      setTimeout(() => {
        setMensajeExito(false);
        // Navega a la página de playlists después de editar.
        navigate(`/playlists/bbdd/${playlist}`);
        setNuevoNombrePlaylist("");
        manejarCerrado();
      }, 3000);
    }
  };

  // Función para manejar la eliminación de la playlist.
  const handleEliminarPlaylist = async () => {
    try {
      // Llama a la función para eliminar la playlist.
      await eliminarPlaylist(playlist);
      // Muestra el mensaje de éxito durante 3 segundos.
      setMensajeExito(true);
      setTimeout(() => {
        setMensajeExito(false);
        // Navega a la página de playlists después de eliminar.
        navigate(`/perfil/${usuario.id}`);
        manejarCerrado();
      }, 3000);
    } catch (error) {
      console.error("Error al eliminar la playlist:", error.message);
    }
  };

  const handleConfirmar = () => {
    handleEliminarPlaylist();
  };

  const handleCancelar = () => {
    setConfirmarBorrado(false);
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
                  Editar lista de reproducción
                </h1>
                {/* Mensaje de éxito */}
                {mensajeExito ? (
                  <p className="text-green-500 font-semibold">
                    {nuevoNombrePlaylist
                      ? "Nombre editado correctamente."
                      : "Lista eliminada correctamente."}
                  </p>
                ) : (
                  <Fragment>
                    {/* Formulario de edición de playlist */}
                    <div className="space-y-4 md:space-y-6">
                      <div>
                        <label
                          htmlFor="nuevoNombrePlaylist"
                          className="block mb-2 text-sm md:text-base font-medium text-white"
                        >
                          Nuevo nombre
                        </label>
                        <input
                          type="text"
                          name="nuevoNombrePlaylist"
                          id="nuevoNombrePlaylist"
                          className="border-cards text-sm rounded focus:ring-highlight hover:border-white focus:border-highlight block w-full p-2.5 bg-neutral-800 placeholder-neutral-600 text-white duration-300 ease-in"
                          placeholder="Escribe un nuevo nombre..."
                          value={nuevoNombrePlaylist}
                          onChange={(e) =>
                            setNuevoNombrePlaylist(e.target.value)
                          }
                          required
                        />
                      </div>
                      {/* Botones para editar o eliminar la playlist */}
                      <button
                        className="w-full text-white bg-neutral-600 hover:bg-neutral-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-gray-800 duration-300 ease-in"
                        onClick={handleSubmitEditarNombrePlaylist}
                      >
                        Guardar cambios
                      </button>
                      <div className="flex flex-row justify-center items-center">
                        {confirmarBorrado && (
                          <div>
                            <p className="text-white font-semibold text-sm text-center">
                              ¿Seguro?
                            </p>
                            <div className="flex flex-row mt-2">
                              <button
                                className="w-1/2 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-red-800 duration-300 ease-in"
                                onClick={handleConfirmar}
                              >
                                <FontAwesomeIcon
                                  icon={faCheck}
                                  className="fa-xl"
                                />
                              </button>
                              <button
                                className="w-1/2 text-white bg-neutral-600 hover:bg-neutral-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-gray-800 ml-4 duration-300 ease-in"
                                onClick={handleCancelar}
                              >
                                <FontAwesomeIcon
                                  icon={faXmark}
                                  className="fa-xl"
                                />
                              </button>
                            </div>
                          </div>
                        )}
                        {!confirmarBorrado && (
                          <button
                            className="w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-red-800"
                            onClick={() => setConfirmarBorrado(true)}
                          >
                            Eliminar lista
                          </button>
                        )}
                      </div>
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

export default ModalEditarPlaylist;
