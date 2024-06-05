import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUsuarios } from "../../hooks/useUsuarios";
import { usePlaylists } from "../../hooks/usePlaylists";
import PerfilHeader from "../../componentes/perfiles/PerfilHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faUserMinus,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import PerfilesCuadricula from "../../componentes/perfiles/PerfilesCuadricula";
import PlaylistsCuadricula from "../../componentes/playlists/PlaylistsCuadricula";
import Carga from "../../componentes/interfaz/Carga";
import ModalCrearPlaylist from "../../componentes/modales/ModalCrearPlaylist";

// Página del perfil de usuario.
const PerfilUsuario = () => {
  const { id } = useParams();
  const {
    usuario,
    obtenerDatosUsuarioPorId,
    seguirUsuario,
    dejarDeSeguirUsuario,
    verificarSeguimiento,
    sesionIniciada,
    obtenerSeguidores,
    obtenerSeguidos,
  } = useUsuarios();

  const { cargarPlaylistsPorIdUsuario } = usePlaylists();

  const [perfil, setPerfil] = useState(null);
  const [carga, setCarga] = useState(true);
  const [sigueAlUsuario, setSigueAlUsuario] = useState(false);
  const [seguidores, setSeguidores] = useState([]);
  const [numSeguidores, setNumSeguidores] = useState(0);
  const [seguidos, setSeguidos] = useState([]);
  const [numSeguidos, setNumSeguidos] = useState(0);
  const [playlistsPerfil, setPlaylistsPerfil] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    const cargarPerfil = async () => {
      setCarga(true);
      const datosUsuario = await obtenerDatosUsuarioPorId(id);
      setPerfil(datosUsuario);
      setCarga(false);
    };

    cargarPerfil();
  }, [id, obtenerDatosUsuarioPorId]);

  useEffect(() => {
    if (usuario?.id !== id) {
      const verificar = async () => {
        const sigue = await verificarSeguimiento(id);
        setSigueAlUsuario(sigue);
      };

      verificar();
    }
  }, [sesionIniciada, id, verificarSeguimiento, usuario]);

  useEffect(() => {
    const obtenerDatos = async () => {
      const seguidores = await obtenerSeguidores(id);
      const seguidos = await obtenerSeguidos(id);
      setSeguidores(seguidores);
      setNumSeguidores(seguidores.length);
      setSeguidos(seguidos);
      setNumSeguidos(seguidos.length);
    };

    obtenerDatos();
  }, [id, obtenerSeguidores, obtenerSeguidos]);

  useEffect(() => {
    const cargarPlaylists = async () => {
      const playlists = await cargarPlaylistsPorIdUsuario(id);
      setPlaylistsPerfil(playlists);
    };

    cargarPlaylists();
  }, [id, cargarPlaylistsPorIdUsuario, mostrarModal]);

  const esMiPerfil = usuario?.id === id;

  const handleSeguir = async () => {
    await seguirUsuario(id);
    setSigueAlUsuario(true);
    setNumSeguidores(numSeguidores + 1);
  };

  const handleDejarDeSeguir = async () => {
    await dejarDeSeguirUsuario(id);
    setSigueAlUsuario(false);
    setNumSeguidores(numSeguidores - 1);
  };

  // Función para abrir el modal de creación de playlist
  const abrirModal = () => {
    setMostrarModal(true);
  };

  // Función para cerrar el modal de creación de playlist
  const cerrarModal = () => {
    setMostrarModal(false);
  };

  if (carga) {
    return <Carga />;
  }

  if (!perfil) {
    return <div>No se encontraron datos del usuario</div>;
  }

  return (
    <Fragment>
      <div>
        <PerfilHeader
          perfil={perfil.id}
          nombre={perfil.nombre}
          fotoPerfil={perfil.avatar}
          numListas={perfil.playlists.length}
          seguidores={numSeguidores}
          seguidos={numSeguidos}
        />
        {!esMiPerfil && sesionIniciada ? (
          sigueAlUsuario ? (
            <button
              className="text-white font-medium rounded-lg hover:border-highlight text-center text-base  duration-300 ease-in cursor-pointer group bg-cards ml-4 mt-4 mb-4 focus:outline-none"
              style={{ width: 180 }}
              onClick={handleDejarDeSeguir}
            >
              <FontAwesomeIcon icon={faUserMinus} className="mr-2" />
              Dejar de seguir
            </button>
          ) : (
            <button
              className="text-white font-medium rounded-lg hover:border-white text-center text-base duration-300 ease-in cursor-pointer group bg-highlight ml-4 mt-4 mb-4 focus:outline-none"
              style={{ width: 180 }}
              onClick={handleSeguir}
            >
              <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
              Seguir
            </button>
          )
        ) : (
          <button
            className="text-white font-medium rounded-lg hover:border-white text-center text-base duration-300 ease-in cursor-pointer group bg-highlight ml-4 mt-4 mb-4 focus:outline-none"
            style={{ width: 180 }}
            onClick={() => {
              abrirModal();
            }}
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Crear playlist
          </button>
        )}
        {/* Muestra la cuadrícula de seguidores */}
        {perfil.seguidores.length > 0 && (
          <>
            <h2 className="font-bold text-xl mt-4 ml-4">Seguidores</h2>
            <PerfilesCuadricula perfiles={seguidores} />
          </>
        )}

        {/* Muestra la cuadrícula de seguidos */}
        {perfil.seguidos.length > 0 && (
          <>
            <h2 className="font-bold text-xl mt-4 ml-4">Siguiendo</h2>
            <PerfilesCuadricula perfiles={seguidos} />
          </>
        )}

        {/* Muestra la cuadrícula de playlists */}
        {playlistsPerfil && playlistsPerfil.length > 0 && (
          <>
            <h2 className="font-bold text-xl mt-4 ml-4">
              Listas de reproducción
            </h2>
            <PlaylistsCuadricula playlists={playlistsPerfil} origen="bbdd" />
          </>
        )}
      </div>
      <ModalCrearPlaylist mostrar={mostrarModal} manejarCerrado={cerrarModal} />
    </Fragment>
  );
};

export default PerfilUsuario;
