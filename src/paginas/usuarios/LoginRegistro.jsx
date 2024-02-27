import React, { Fragment, useState, useEffect } from "react";

import { useUsuarios } from "../../hooks/useUsuarios.js";
import ModalLoginRegistro from "../../componentes/modales/ModalLoginRegistro.jsx";

// Componente para el login/registro de los usuarios.
const LoginRegistro = () => {
  // Importar el estado y las funciones del contexto de usuarios.
  const { sesionIniciada, cerrarSesion, confirmacionLogin } = useUsuarios();

  // Valor inicial del modal de inicio de sesión.
  const valorInicialModal = false;

  // Estado para mostrar u ocultar el modal de inicio de sesión.
  const [mostrarModal, setMostrarModal] = useState(valorInicialModal);

  // Efecto para cerrar el modal de inicio de sesión.
  useEffect(() => {
    // Verifica si se ha confirmado el inicio de sesión y cierra el modal si es así.
    if (confirmacionLogin) {
      setMostrarModal(false);
    }
  }, [confirmacionLogin]); // Se ejecuta cada vez que confirmacionInicioSesion cambia, es decir, cuando se inicia sesión.

  return (
    <Fragment>
      <button className=""
        id="usuario"
        onClick={() => {
          sesionIniciada ? cerrarSesion() : setMostrarModal(true);
        }}
      >
        {" "}
        {/* Dependiendo de si la sesión está iniciada o no, aparecerá en el botón una cosa u otra. */}
        {sesionIniciada ? "Cerrar sesión" : "Registro/Login"}
      </button>
      <ModalLoginRegistro
        mostrar={mostrarModal}
        manejarCerrado={() => {
          setMostrarModal(false);
        }}
      />
    </Fragment>
  );
};

export default LoginRegistro;
