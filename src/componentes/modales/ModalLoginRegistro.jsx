import React, { Fragment, useState } from "react";
import { useUsuarios } from "../../hooks/useUsuarios.js";

// Modal para el login/registro de usuarios.
const ModalLoginRegistro = ({ mostrar, manejarCerrado }) => {
  // Estados y funciones del contexto de usuarios.
  const { iniciarSesion, actualizarDato, registrarUsuario } = useUsuarios();
  const [registroCorrecto, setRegistroCorrecto] = useState(false);
  const [mostrarRegistro, setMostrarRegistro] = useState(false);

  const manejoLogin = async (e) => {
    e.preventDefault();
    await iniciarSesion();
    // Puedes añadir lógica adicional después del inicio de sesión si es necesario
  };

  const manejoRegistro = async (e) => {
    e.preventDefault();
    await registrarUsuario();
    setRegistroCorrecto(true);
    setTimeout(() => {
      setRegistroCorrecto(false);
    }, 5000);
  };

  return (
    <Fragment>
      {mostrar && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-gray-900 bg-opacity-50">
          <div className="absolute top-4 right-4">
            <button
              className="text-white rounded-md p-2 bg-gray-800 focus:outline-none"
              onClick={manejarCerrado}
            >
              X
            </button>
          </div>
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-slate-800 border-slate-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                {!mostrarRegistro ? (
                  <Fragment>
                    <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                      ¡Te echábamos de menos!
                    </h1>
                    <div className="space-y-4 md:space-y-6">
                      <div>
                        <label
                          htmlFor="email"
                          className="block mb-2 text-sm font-medium text-white"
                        >
                          Correo electrónico
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-slate-700 border-slate-600 placeholder-slate-400 text-white focus:ring-indigo-500 focus:border-indigo-600"
                          placeholder="usuario@correo.com"
                          onChange={(e) => {
                            actualizarDato(e);
                          }}
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="password"
                          className="block mb-2 text-sm font-medium text-white"
                        >
                          Contraseña
                        </label>
                        <input
                          type="password"
                          name="password"
                          id="password"
                          className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-slate-700 border-slate-600 placeholder-slate-400 text-white focus:ring-indigo-500 focus:border-indigo-600"
                          placeholder="********"
                          onChange={(e) => {
                            actualizarDato(e);
                          }}
                          required
                        />
                      </div>
                      <button
                        className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-indigo-800"
                        onClick={(e) => manejoLogin(e)}
                      >
                        Iniciar sesión
                      </button>
                      <p className="text-sm font-light text-slate-400">
                        ¿Todavía no tienes cuenta?{" "}
                        <button
                          className="font-medium text-indigo-500 hover:underline"
                          onClick={() => setMostrarRegistro(true)}
                        >
                          Regístrate
                        </button>
                      </p>
                    </div>
                  </Fragment>
                ) : (
                  <Fragment>
                    <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                      Bienvenid@ a musiK :)
                    </h1>
                    <div className="space-y-4 md:space-y-6">
                      <div>
                        <label
                          htmlFor="email"
                          className="block mb-2 text-sm font-medium text-white"
                        >
                          Correo electrónico
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-slate-700 border-slate-600 placeholder-slate-400 text-white focus:ring-indigo-500 focus:border-indigo-600"
                          placeholder="usuario@correo.com"
                          onChange={(e) => actualizarDato(e)}
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="password"
                          className="block mb-2 text-sm font-medium text-white"
                        >
                          Contraseña
                        </label>
                        <input
                          type="password"
                          name="password"
                          id="password"
                          className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-slate-700 border-slate-600 placeholder-slate-400 text-white focus:ring-indigo-500 focus:border-indigo-600"
                          placeholder="********"
                          onChange={(e) => actualizarDato(e)}
                          required
                        />
                      </div>
                      <button
                        className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-indigo-800"
                        onClick={(e) => manejoRegistro(e)}
                      >
                        Registrar
                      </button>
                      <p className="text-sm font-light text-slate-400">
                        ¿Ya tienes cuenta?{" "}
                        <button
                          className="font-medium text-indigo-500 hover:underline"
                          onClick={() => setMostrarRegistro(false)}
                        >
                          Inicia sesión
                        </button>
                      </p>
                    </div>
                  </Fragment>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ModalLoginRegistro;
