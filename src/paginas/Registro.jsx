import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUsuarios } from "../hooks/useUsuarios.js";

const Registro = () => {
  const { actualizarDato, registrarUsuario } = useUsuarios();
  const [registroCorrecto, setRegistroCorrecto] = useState(false);
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
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold leading-tight tracking-tight md:text-5xl text-white">
        Bienvenid@ a musiK :)
      </h1>
      {registroCorrecto ? (
        <p className="text-green-500 font-semibold">
          Se ha enviado un correo para confirmar el registro.
        </p>
      ) : (
        <div className="w-full max-w-md p-6">
          <div className="space-y-4 md:space-y-6">
          <div>
              <label
                htmlFor="user-register"
                className="block mb-2 text-sm md:text-base font-medium text-white"
              >
                Nombre de usuario
              </label>
              <input
                type="text"
                name="nombre"
                id="user-register"
                className="border-cards sm:text-sm rounded focus:ring-highlight hover:border-white focus:border-highlight block w-full p-2.5 bg-cards placeholder-neutral-600 text-white duration-300 ease-in"
                placeholder="usuario"
                onChange={(e) => actualizarDato(e)}
                required
              />
            </div>
            <div>
              <label
                htmlFor="email-register"
                className="block mb-2 text-sm md:text-base font-medium text-white"
              >
                Correo electrónico
              </label>
              <input
                type="email"
                name="email"
                id="email-register"
                className="border-cards sm:text-sm rounded focus:ring-highlight hover:border-white focus:border-highlight block w-full p-2.5 bg-cards placeholder-neutral-600 text-white duration-300 ease-in"
                placeholder="usuario@correo.com"
                onChange={(e) => actualizarDato(e)}
                required
              />
            </div>
            <div>
              <label
                htmlFor="password-register"
                className="block mb-2 text-sm md:text-base font-medium text-white"
              >
                Contraseña (mínimo 8 caracteres)
              </label>
              <input
                type="password"
                name="password"
                id="password-register"
                className="border-cards sm:text-sm rounded focus:ring-highlight hover:border-white focus:border-highlight block w-full p-2.5 bg-cards placeholder-neutral-600 text-white duration-300 ease-in"
                placeholder="********"
                onChange={(e) => actualizarDato(e)}
                required
              />
            </div>
            <div>
              <label
                htmlFor="password-repeat"
                className="block mb-2 text-sm md:text-base font-medium text-white"
              >
                Repite la contraseña
              </label>
              <input
                type="password"
                name="password-repeat"
                id="password-r-register"
                className="border-cards sm:text-sm rounded focus:ring-highlight hover:border-white focus:border-highlight block w-full p-2.5 bg-cards placeholder-neutral-600 text-white duration-300 ease-in"
                placeholder="********"
                onChange={(e) => actualizarDato(e)}
                required
              />
            </div>
            <button
              className="w-full text-white font-medium rounded-lg text-sm hover:border-white text-center focus:border-highlight focus:ring-highlight duration-300 ease-in cursor-pointer group bg-highlight"
              onClick={(e) => manejoRegistro(e)}
            >
              Registrar
            </button>
            <p className="text-center text-sm">
            ¿Ya tienes cuenta? {""}
            <Link
              className="duration-300 ease-in cursor-pointer group"
              to="/login"
            >
              Inicia sesión
            </Link>
          </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Registro;
