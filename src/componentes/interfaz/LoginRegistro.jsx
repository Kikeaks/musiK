import React, { Fragment, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUsuarios } from "../../hooks/useUsuarios.js";
import ModalLoginRegistro from "../modales/ModalLoginRegistro.jsx";
import {
  faPersonRunning,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";

// Componente para el login/registro de los usuarios.
const LoginRegistro = () => {
  // Importar el estado y las funciones del contexto de usuarios.
  const { usuario, sesionIniciada, cerrarSesion, confirmacionLogin } =
    useUsuarios();

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
      <button
        className="flex justify-center items-center mt-3"
        id="usuario"
        onClick={() => {
          sesionIniciada ? cerrarSesion() : setMostrarModal(true);
        }}
      >
        {" "}
        {/* Dependiendo de si la sesión está iniciada o no, aparecerá en el botón un icono u otro. */}
        {sesionIniciada ? (
          <>
            <FontAwesomeIcon icon={faPersonRunning} />
            <span className="ml-2">Cerrar sesión</span>
          </>
        ) : (
          <>
            <FontAwesomeIcon icon={faRightToBracket} />
            <span className="ml-2">Iniciar sesión</span>
          </>
        )}
      </button>
      {sesionIniciada && <p className="text-center font-semibold mb-3">Has iniciado sesión como: {usuario.email}</p>}
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
