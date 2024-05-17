import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUsuarios } from "../hooks/useUsuarios";
import UsuarioHeader from "../componentes/usuarios/UsuarioHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserMinus, faUserPlus } from "@fortawesome/free-solid-svg-icons";

const PerfilUsuario = () => {
  const { id } = useParams();
  const {
    usuario,
    obtenerDatosUsuarioPorId,
    seguirUsuario,
    dejarDeSeguirUsuario,
    verificarSeguimiento,
    sesionIniciada,
  } = useUsuarios();
  const [perfil, setPerfil] = useState(null);
  const [carga, setCarga] = useState(true);
  const [sigueAlUsuario, setSigueAlUsuario] = useState(false);

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
        <UsuarioHeader
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
              className="text-white font-medium rounded-lg hover:border-highlight text-center text-base focus:border-highlight focus:ring-highlight duration-300 ease-in cursor-pointer group bg-neutral-800"
              onClick={handleDejarDeSeguir}
            >
              <FontAwesomeIcon icon={faUserMinus} className="mr-2" />
              Dejar de seguir
            </button>
          ) : (
            <button
              className="text-white font-medium rounded-lg hover:border-white text-center text-base focus:border-highlight focus:ring-highlight duration-300 ease-in cursor-pointer group bg-highlight"
              onClick={handleSeguir}
            >
              <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
              Seguir
            </button>
          ))}
      </div>
    </Fragment>
  );
};

export default PerfilUsuario;
