import React, { Fragment, useEffect } from "react";
import { useUsuarios } from "../hooks/useUsuarios";
import UsuarioHeader from "../componentes/usuarios/UsuarioHeader";

const Usuario = () => {
  const { sesionIniciada, usuario, obtenerUsuario } = useUsuarios();

  // Obtiene la primera parte de una dirección de email.
  const cortarEmail = (correo) => {
    var indiceArroba = correo.indexOf('@');
    if (indiceArroba !== -1) {
      return correo.substring(0, indiceArroba);
    }
  }

  useEffect(() => {
    // Obtiene los datos del usuario al cargar la página.
    if (sesionIniciada) {
      obtenerUsuario();
    }
  }, [sesionIniciada, obtenerUsuario]);

  return (
    <Fragment>
      <div>
        <UsuarioHeader nombre={cortarEmail(usuario.email)}/>
      </div>
    </Fragment>
  );
};

export default Usuario;