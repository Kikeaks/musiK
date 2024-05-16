import React, { Fragment, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useUsuarios } from "../hooks/useUsuarios";
import UsuarioHeader from "../componentes/usuarios/UsuarioHeader";

const PerfilUsuario = () => {
  const { id } = useParams();
  const { obtenerDatosUsuarioPorId } = useUsuarios();
  const [perfil, setPerfil] = useState(null);
  const [carga, setCarga] = useState(true);

  useEffect(() => {
    const cargarPerfil = async () => {
      setCarga(true);
      const datosUsuario = await obtenerDatosUsuarioPorId(id);
      setPerfil(datosUsuario);
      setCarga(false);
    };

    cargarPerfil();
  }, [id, obtenerDatosUsuarioPorId]);

  if (carga) {
    return <div>Cargando...</div>;
  }

  if (!perfil) {
    return <div>No se encontraron datos del usuario</div>;
  }

  return (
    <Fragment>
      <div>
        <UsuarioHeader nombre={perfil.nombre}/>
      </div>
    </Fragment>
  );
};

export default PerfilUsuario;