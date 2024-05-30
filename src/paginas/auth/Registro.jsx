import React, { useState } from "react";
import logo from "../../assets/musik.png";
import { Link, useNavigate } from "react-router-dom";
import { useUsuarios } from "../../hooks/useUsuarios";

const Registro = () => {
  const { actualizarDato, registrarUsuario } = useUsuarios();
  const [registroCorrecto, setRegistroCorrecto] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Función para validar el formato del correo electrónico
  const validarEmail = (correo) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
  };

  // Función para manejar el registro de usuario.
  const manejoRegistro = async (e) => {
    e.preventDefault();
    if (password !== passwordRepeat) {
      setError("Las contraseñas no coinciden");
      return;
    }
    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres");
      return;
    }
    if (!validarEmail(email)) {
      setError("El correo electrónico no es válido");
      return;
    }
    await registrarUsuario();
    setRegistroCorrecto(true);
    setError("");
    setTimeout(() => {
      setRegistroCorrecto(false);
      navigate("/");
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <img src={logo} title="musik-w" className="size-32 md:size-44 m-12" />
      {!registroCorrecto ? (
        <h1 className="text-3xl font-bold leading-tight tracking-tight md:text-5xl text-white">
          Bienvenid@ a musiK :)
        </h1>
      ) : (
        <h1 className="text-3xl font-bold leading-tight tracking-tight md:text-5xl text-white">
          Registro correcto
        </h1>
      )}

      {registroCorrecto ? (
        <div className="text-center">
          <p className="font-bold">
            Se ha enviado un correo de confirmación a la dirección
            proporcionada.
          </p>
          <p className="mt-2">Redigiriendo a la página principal...</p>
          <p className="mt-2 font-bold">Gracias por usar musiK :)</p>
        </div>
      ) : (
        <div className="w-full max-w-md p-6">
          <div className="space-y-4 md:space-y-6">
            <div>
              <label
                htmlFor="user-register"
                className="block mb-2 text-base font-medium text-white"
              >
                Nombre de usuario
              </label>
              <input
                type="text"
                name="nombre"
                id="user-register"
                className="border-cards text-sm rounded focus:ring-highlight hover:border-white focus:border-highlight block w-full p-2.5 bg-cards placeholder-neutral-600 text-white duration-300 ease-in"
                placeholder="Introduce un nombre de usuario"
                onChange={(e) => actualizarDato(e)}
                required
              />
            </div>
            <div>
              <label
                htmlFor="email-register"
                className="block mb-2 text-base font-medium text-white"
              >
                Correo electrónico
              </label>
              <input
                type="email"
                name="email"
                id="email-register"
                className="border-cards text-sm rounded focus:ring-highlight hover:border-white focus:border-highlight block w-full p-2.5 bg-cards placeholder-neutral-600 text-white duration-300 ease-in"
                placeholder="Introduce una dirección de correo electrónico"
                onChange={(e) => {
                  actualizarDato(e);
                  setEmail(e.target.value);
                }}
                required
              />
            </div>
            <div>
              <label
                htmlFor="password-register"
                className="block mb-2 text-base font-medium text-white"
              >
                Contraseña (mínimo 8 caracteres)
              </label>
              <input
                type="password"
                name="password"
                id="password-register"
                className="border-cards text-sm rounded focus:ring-highlight hover:border-white focus:border-highlight block w-full p-2.5 bg-cards placeholder-neutral-600 text-white duration-300 ease-in"
                placeholder="Introduce una contraseña"
                onChange={(e) => {
                  actualizarDato(e);
                  setPassword(e.target.value);
                }}
                required
              />
            </div>
            <div>
              <label
                htmlFor="password-repeat"
                className="block mb-2 text-base font-medium text-white"
              >
                Repetir contraseña
              </label>
              <input
                type="password"
                name="password-repeat"
                id="password-r-register"
                className="border-cards text-sm rounded focus:ring-highlight hover:border-white focus:border-highlight block w-full p-2.5 bg-cards placeholder-neutral-600 text-white duration-300 ease-in"
                placeholder="Repite la contraseña escogida"
                onChange={(e) => setPasswordRepeat(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <button
              className="w-full text-white font-medium rounded-lg hover:border-white hover:bg-neutral-400 text-center text-base duration-300 ease-in cursor-pointer group bg-highlight focus:outline-none"
              onClick={(e) => manejoRegistro(e)}
            >
              Registrar
            </button>
            <p className="text-center text-sm">
              ¿Ya tienes cuenta? · {""}
              <Link
                className="duration-300 ease-in cursor-pointer group font-semibold"
                to="/login "
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
