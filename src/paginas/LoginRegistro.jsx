import React, { useState } from "react";
import { useUsuarios } from "../hooks/useUsuarios.js";

// Página para el login/registro de usuarios.
const PaginaLoginRegistro = () => {
  const { iniciarSesion, actualizarDato, registrarUsuario } = useUsuarios();
  const [registroCorrecto, setRegistroCorrecto] = useState(false);

  // Función para manejar el inicio de sesión.
  const manejoLogin = async (e) => {
    e.preventDefault();
    await iniciarSesion();
  };

  // Función para manejar el registro de usuario.
  const manejoRegistro = async (e) => {
    e.preventDefault();
    await registrarUsuario();
    setRegistroCorrecto(true);
    setTimeout(() => {
      setRegistroCorrecto(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full flex flex-row justify-center">
        {/* Formulario de inicio de sesión */}
        <div className="w-full max-w-md rounded-lg shadow border border-slate-700 p-6">
          <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
            ¡Te echábamos de menos!
          </h1>
          <div className="space-y-4 md:space-y-6">
            <div>
              <label
                htmlFor="email-login"
                className="block mb-2 text-sm font-medium text-white"
              >
                Correo electrónico
              </label>
              <input
                type="email"
                name="email"
                id="email-login"
                className="border-cards sm:text-sm rounded focus:ring-highlight hover:border-white focus:border-highlight block w-full p-2.5 bg-cards placeholder-slate-400 text-white duration-300 ease-in"
                placeholder="usuario@correo.com"
                onChange={(e) => {
                  actualizarDato(e);
                }}
                required
              />
            </div>
            <div>
              <label
                htmlFor="password-login"
                className="block mb-2 text-sm font-medium text-white"
              >
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                id="password-login"
                className="border-cards sm:text-sm rounded focus:ring-highlight hover:border-white focus:border-highlight block w-full p-2.5 bg-cards placeholder-slate-400 text-white duration-300 ease-in"
                placeholder="********"
                onChange={(e) => {
                  actualizarDato(e);
                }}
                required
              />
            </div>
            <button
              className="w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 hover:border-white text-center focus:border-highlight focus:ring-highlight duration-300 ease-in cursor-pointer group bg-highlight"
              onClick={(e) => manejoLogin(e)}
            >
              Iniciar sesión
            </button>
          </div>
        </div>

        {/* Formulario de registro */}
        <div className="w-full max-w-md rounded-lg shadow border bg-slate-800 border-slate-700 p-6">
          <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
            Bienvenid@ a musiK :)
          </h1>
          {registroCorrecto ? (
            <p className="text-green-500 font-semibold">
              Se ha enviado un correo para confirmar el registro.
            </p>
          ) : (
            <div className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="email-register"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Correo electrónico
                </label>
                <input
                  type="email"
                  name="email"
                  id="email-register"
                  className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-slate-700 border-slate-600 placeholder-slate-400 text-white focus:ring-indigo-500 focus:border-indigo-600"
                  placeholder="usuario@correo.com"
                  onChange={(e) => actualizarDato(e)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password-register"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  name="password"
                  id="password-register"
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaginaLoginRegistro;
