import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePlaylists } from "../../hooks/usePlaylists.js";

const ModalEditarPlaylist = ({ mostrar, manejarCerrado, playlistId }) => {
  const { editarNombrePlaylist, eliminarPlaylist } = usePlaylists();
  const [nuevoNombrePlaylist, setNuevoNombrePlaylist] = useState("");
  const [mensajeExito, setMensajeExito] = useState(false);
  const navigate = useNavigate();

  const handleSubmitEditarNombrePlaylist = async () => {
    if (nuevoNombrePlaylist.trim() !== "") {
      await editarNombrePlaylist(playlistId, nuevoNombrePlaylist);
      setMensajeExito(true);
      setTimeout(() => {
        setMensajeExito(false);
        navigate("/playlists");
        manejarCerrado();
      }, 3000);
    }
  };

  const handleEliminarPlaylist = async () => {
    try {
      await eliminarPlaylist(playlistId);
      setMensajeExito(true);
      setTimeout(() => {
        setMensajeExito(false);
        navigate("/playlists");
        manejarCerrado();
      }, 3000);
    } catch (error) {
      console.error("Error al eliminar la playlist:", error.message);
    }
  };

  return (
    <Fragment>
      {mostrar && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-gray-900 bg-opacity-50">
          <div className="absolute top-4 right-4">
            <button
              className="text-white rounded-md p-2 bg-gray-800 focus:outline-none"
              onClick={manejarCerrado}
            >
              X
            </button>
          </div>
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-slate-800 border-slate-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                  Editar playlist
                </h1>
                {mensajeExito ? (
                  <p className="text-green-500 font-semibold">
                    {nuevoNombrePlaylist
                      ? "Nombre editado correctamente."
                      : "Playlist eliminada correctamente."}
                  </p>
                ) : (
                  <Fragment>
                    <div className="space-y-4 md:space-y-6">
                      <div>
                        <label
                          htmlFor="nuevoNombrePlaylist"
                          className="block mb-2 text-sm font-medium text-white"
                        >
                          Nuevo nombre
                        </label>
                        <input
                          type="text"
                          name="nuevoNombrePlaylist"
                          id="nuevoNombrePlaylist"
                          className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-slate-700 border-slate-600 placeholder-slate-400 text-white focus:ring-indigo-500 focus:border-indigo-600"
                          placeholder="Escribe un nuevo nombre..."
                          value={nuevoNombrePlaylist}
                          onChange={(e) =>
                            setNuevoNombrePlaylist(e.target.value)
                          }
                          required
                        />
                      </div>
                      <button
                        className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-indigo-800"
                        onClick={handleSubmitEditarNombrePlaylist}
                      >
                        Editar nombre
                      </button>
                      <button
                        className="w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-red-800"
                        onClick={handleEliminarPlaylist}
                      >
                        Eliminar playlist
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

export default ModalEditarPlaylist;
