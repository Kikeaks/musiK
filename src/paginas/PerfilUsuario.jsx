import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUsuarios } from "../hooks/useUsuarios";
import { usePlaylists } from "../hooks/usePlaylists";
import PerfilHeader from "../componentes/perfiles/PerfilHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserMinus, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import PerfilesCuadricula from "../componentes/perfiles/PerfilesCuadricula";
import PlaylistsCuadricula from "../componentes/playlists/PlaylistsCuadricula";

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

  const { playlistsUsuario, cargarPlaylistsPorIdUsuario } = usePlaylists();

  const [perfil, setPerfil] = useState(null);
  const [carga, setCarga] = useState(true);
  const [sigueAlUsuario, setSigueAlUsuario] = useState(false);
  const [seguidores, setSeguidores] = useState([]);
  const [seguidos, setSeguidos] = useState([]);
  const [playlistsPerfil, setPlaylistsPerfil] = useState([]);

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
    const verificar = async () => {
      if (sesionIniciada && id) {
        const sigue = await verificarSeguimiento(id);
        setSigueAlUsuario(sigue);
      }
    };

    verificar();
  }, [sesionIniciada, id, verificarSeguimiento]);

  useEffect(() => {
    const obtenerDatos = async () => {
      const seguidores = await obtenerSeguidores(id);
      const seguidos = await obtenerSeguidos(id);
      setSeguidores(seguidores);
      setSeguidos(seguidos);
    };

    obtenerDatos();
  }, [id, obtenerSeguidores, obtenerSeguidos]);

  useEffect(() => {
    const cargarPlaylists = async () => {
      const playlists = await cargarPlaylistsPorIdUsuario(id);
      setPlaylistsPerfil(playlists);
    };

    cargarPlaylists();
  }, [id, cargarPlaylistsPorIdUsuario]);

  const esMiPerfil = usuario?.id === id;

  const handleSeguir = async () => {
    await seguirUsuario(id);
    setSigueAlUsuario(true);
  };

  const handleDejarDeSeguir = async () => {
    await dejarDeSeguirUsuario(id);
    setSigueAlUsuario(false);
  };

  if (carga) {
    return <div>Cargando...</div>;
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
          seguidores={perfil.seguidores.length}
          seguidos={perfil.seguidos.length}
        />
        {!esMiPerfil &&
          sesionIniciada &&
          (sigueAlUsuario ? (
            <button
              className="text-white font-medium rounded-lg hover:border-highlight text-center text-base  duration-300 ease-in cursor-pointer group bg-cards ml-4 mt-2 focus:outline-none"
              style={{ width: 180 }}
              onClick={handleDejarDeSeguir}
            >
              <FontAwesomeIcon icon={faUserMinus} className="mr-2" />
              Dejar de seguir
            </button>
          ) : (
            <button
              className="text-white font-medium rounded-lg hover:border-white text-center text-base duration-300 ease-in cursor-pointer group bg-highlight ml-4 mt-2 focus:outline-none"
              style={{ width: 180 }}
              onClick={handleSeguir}
            >
              <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
              Seguir
            </button>
          ))}
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
            <h2 className="font-bold text-xl mt-4 ml-4">Playlists</h2>
            <PlaylistsCuadricula playlists={playlistsPerfil} origen="bbdd" />
          </>
        )}
      </div>
    </Fragment>
  );
};

export default PerfilUsuario;
