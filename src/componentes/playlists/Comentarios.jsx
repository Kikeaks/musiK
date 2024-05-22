import React, { useEffect, useState } from "react";
import { usePlaylists } from "../../hooks/usePlaylists";
import { useUsuarios } from "../../hooks/useUsuarios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Comentarios = ({ playlist }) => {
  const { usuario } = useUsuarios();
  const {
    agregarComentarioAPlaylist,
    obtenerComentariosPlaylist,
    eliminarComentarioDePlaylist,
  } = usePlaylists();
  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState("");

  const manejarAgregarComentario = async () => {
    if (nuevoComentario.trim() === "") return;

    const comentario = await agregarComentarioAPlaylist(
      playlist,
      nuevoComentario
    );

    // Asegúrate de que el comentario incluye la información del usuario
    const comentarioConUsuario = {
      ...comentario,
      usuarios: { nombre: usuario.nombre },
    };

    setComentarios((prevComentarios) => [
      ...prevComentarios,
      comentarioConUsuario,
    ]);

    // Limpiar el campo de texto después de agregar el comentario
    setNuevoComentario("");
  };

  useEffect(() => {
    const cargarComentarios = async () => {
      const coments = await obtenerComentariosPlaylist(playlist);
      setComentarios(coments);
    };

    cargarComentarios();
  }, [playlist, obtenerComentariosPlaylist, comentarios]);

  const manejarEliminarComentario = async (idComentario) => {
    await eliminarComentarioDePlaylist(idComentario);
    setComentarios((prevComentarios) =>
      prevComentarios.filter((c) => c.id !== idComentario)
    );
  };

  return (
    <div className="comentarios flex flex-col rounded-lg w-full md:w-1/4 p-4">
      <h3 className="comentarios-titulo text-xl font-bold mb-4">Comentarios</h3>
      <div className="comentarios-contenedor flex-grow overflow-y-auto h-48">
        <div className="comentarios-lista text-sm">
          {comentarios.map((comentario) => (
            <div
              key={comentario.id}
              className="comentario flex items-center py-2 border-b border-neutral-800"
            >
              <div className="flex flex-row items-center comentario-autor mr-4">
                <img
                  className="size-4 mr-1 aspect-square rounded-full ring-1 ring:bg-neutral-600"
                  src={comentario.usuarios.avatar}
                />
                <Link to={`/perfil/${comentario.usuario}`}>
                  <span className="text-neutral-400 font-semibold">
                    {comentario.usuarios.nombre}:&nbsp;
                  </span>
                </Link>
              </div>
              <div className="comentario-texto w-full break-all mr-2">
                {comentario.comentario}
              </div>
              {comentario.usuario === usuario.id && (
                <div className="comentario-eliminar ml-auto">
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => manejarEliminarComentario(comentario.id)}
                    className="cursor-pointer text-red-500"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="comentarios-nuevo flex items-center justify-end mt-4">
        <input
          className="comentarios-input border-cards text-sm rounded focus:ring-highlight hover:border-white focus:border-highlight block w-full p-2.5 bg-cards placeholder-neutral-600 text-white duration-300 ease-in flex-grow mr-2"
          type="text"
          value={nuevoComentario}
          onChange={(e) => setNuevoComentario(e.target.value)}
        />
        <FontAwesomeIcon
          icon={faPaperPlane}
          onClick={manejarAgregarComentario}
          className="comentarios-icono duration-300 ease-in white cursor-pointer hover:text-highlight"
        />
      </div>
    </div>
  );
};

export default Comentarios;
