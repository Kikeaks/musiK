import React, { useEffect } from "react";
import { useUsuarios } from "../hooks/useUsuarios";

const Usuario = () => {
  const { sesionIniciada, usuario, obtenerUsuario } = useUsuarios();

  useEffect(() => {
    // Obtiene los datos del usuario al cargar la página.
    if (sesionIniciada) {
      obtenerUsuario();
    }
  }, [sesionIniciada, obtenerUsuario]);

  return <div>Usuario: {usuario.id}</div>;
};

export default Usuario;
