import React, { Fragment, useState } from "react";
import { useUsuarios } from "../../hooks/useUsuarios.js";

// Modal para el login/registro de usuarios.
const ModalLoginRegistro = ({ mostrar, manejarCerrado }) => {
  // Estados y funciones del contexto de usuarios.
  const { iniciarSesion, actualizarDato, registrarUsuario } = useUsuarios();

  // Estado para el mensaje si el registro ha ido correctamente.
  const [registroCorrecto, setRegistroCorrecto] = useState(false);

  // Manejo del botón de inicio de sesión.
  const manejoLogin = (e) => {
    e.preventDefault();
    iniciarSesion();
  };

  // Manejo del botón de registro.
  const manejoRegistro = async (e) => {
    e.preventDefault();

    // Se espera a que se complete el registro para mostrar el mensaje de confirmación.
    await registrarUsuario();
    setRegistroCorrecto(true);

    // A los 5 segundos, el mensaje desaparece.
    setTimeout(() => {
      setRegistroCorrecto(false);
    }, 5000);
  };

  return (
    <Fragment>
      {mostrar && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 border border-gray-300 z-50">


            <form>
              <label htmlFor="correo">Correo electrónico:</label>
              <br />
              <input
                type="email"
                name="email"
                placeholder="nombre@correo.com"
                onChange={(e) => {
                  actualizarDato(e);
                }}
              />
              <br />
              <label htmlFor="passwd">Contraseña:</label>
              <br />
              <input
                type="password"
                placeholder="******"
                name="password"
                onChange={(e) => {
                  actualizarDato(e);
                }}
              />
              <br />
              <button
                className="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={(e) => {
                  manejoLogin(e);
                }}
              >
                Iniciar sesión
              </button>
              <br />
              <button
                className="block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={(e) => {
                  manejoRegistro(e);
                }}
              >
                Registrar usuario
              </button>
              <br />
              <button
                className="block bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  manejarCerrado();
                }}
              >
                Cerrar
              </button>
            </form>
            {/* Si el registro es correcto, se informa de ello. */}
            {registroCorrecto && (
              <p>
                Un enlace ha sido enviado al correo electrónico proporcionado
                para completar el registro.
              </p>
            )}
          </div>

      )}
    </Fragment>
  );
};

export default ModalLoginRegistro;
