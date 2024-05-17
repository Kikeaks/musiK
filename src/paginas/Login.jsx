import React from "react";
import { Link } from "react-router-dom";
import { useUsuarios } from "../hooks/useUsuarios.js";

const Login = () => {
  const { iniciarSesion, actualizarDato } = useUsuarios();
  // Función para manejar el inicio de sesión.
  const manejoLogin = async (e) => {
    e.preventDefault();
    await iniciarSesion();
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold leading-tight tracking-tight md:text-5xl text-white">
        ¡Te echábamos de menos!
      </h1>
      <div className="w-full max-w-md p-6">
        <div className="space-y-4 md:space-y-6">
          <div>
            <label
              htmlFor="email-login"
              className="block mb-2 text-sm md:text-base font-medium text-white"
            >
              Correo electrónico
            </label>
            <input
              type="email"
              name="email"
              id="email-login"
              className="border-cards sm:text-sm rounded focus:ring-highlight hover:border-white focus:border-highlight block w-full p-2.5 bg-cards placeholder-neutral-600 text-white duration-300 ease-in"
              placeholder="ejemplo@correo.com"
              onChange={(e) => {
                actualizarDato(e);
              }}
              required
            />
          </div>
          <div>
            <label
              htmlFor="password-login"
              className="block mb-2 text-sm md:text-base font-medium text-white"
            >
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              id="password-login"
              className="border-cards sm:text-sm rounded focus:ring-highlight hover:border-white focus:border-highlight block w-full p-2.5 bg-cards placeholder-neutral-600 text-white duration-300 ease-in"
              placeholder="********"
              onChange={(e) => {
                actualizarDato(e);
              }}
              required
            />
          </div>
          <button
            className="w-full text-white font-medium rounded-lg text-sm hover:border-white text-center focus:border-highlight focus:ring-highlight duration-300 ease-in cursor-pointer group bg-highlight"
            onClick={(e) => manejoLogin(e)}
          >
            Iniciar sesión
          </button>
          <p className="text-center text-sm">
            ¿Todavía no tienes cuenta? {""}
            <Link
              className="duration-300 ease-in cursor-pointer group"
              to="/registro"
            >
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
