import React, { Fragment, useState } from "react";
import logo from "../../assets/musik.png";
import avatarDefault from "../../assets/usuario.jpg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faMagnifyingGlass,
  faMusic,
  faBars,
  faRightFromBracket,
  faUser,
  faKey,
} from "@fortawesome/free-solid-svg-icons";
import { useUsuarios } from "../../hooks/useUsuarios";

// Componente para la navegación de la aplicación.
const Navegacion = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [mostrarMenu, setMostrarMenu] = useState(false);
  const [perfilMenuAbierto, setPerfilMenuAbierto] = useState(false);
  const [mostrarPerfilMenu, setMostrarPerfilMenu] = useState(false);

  // Función para alternar la visibilidad del menú principal.
  const toggleMenu = () => {
    if (!menuAbierto) {
      setMostrarMenu(true);
      setTimeout(() => setMenuAbierto(true), 10);
    } else {
      setMenuAbierto(false);
      setTimeout(() => setMostrarMenu(false), 300);
    }
  };

  // Función para alternar la visibilidad del menú de perfil.
  const togglePerfilMenu = () => {
    if (!perfilMenuAbierto) {
      setMostrarPerfilMenu(true);
      setTimeout(() => setPerfilMenuAbierto(true), 10);
    } else {
      setPerfilMenuAbierto(false);
      setTimeout(() => setMostrarPerfilMenu(false), 300);
    }
  };

  // Obtiene información del usuario y estado de sesión.
  const { usuario, sesionIniciada, cerrarSesion } = useUsuarios();

  // Si no hay sesión iniciada, no muestra la barra de navegación.
  if (!sesionIniciada) {
    return null;
  }

  return (
    <Fragment>
      {/* Barra de navegación */}
      <nav className="flex justify-between items-center px-4 py-2 h-24">
        {/* Logo de la aplicación */}
        <div>
          <img src={logo} title="musik-w" className="size-12" />
        </div>
        {/* Icono de menú para dispositivos móviles */}
        <div className="md:hidden">
          <FontAwesomeIcon
            icon={faBars}
            className="fa-xl duration-300 ease-in cursor-pointer group hover:text-highlight focus:outline-none md:focus:outline"
            onClick={toggleMenu}
          />
        </div>
        {/* Opciones de navegación */}
        <ul className="hidden md:flex space-x-6 items-center flex-grow justify-end h-full">
          {/* Opción para explorar */}
          <li>
            <Link
              to="/explorar"
              className="duration-300 ease-in cursor-pointer group focus:outline-none"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} className="fa-xl" />
            </Link>
          </li>
          {/* Opciones para sesión iniciada o no iniciada */}
          {!sesionIniciada ? (
            // Si no hay sesión iniciada, muestra opción de inicio de sesión
            <>
              <li>
                <Link
                  to="/login"
                  className="duration-300 ease-in cursor-pointer group focus:outline-none md:focus:outline"
                >
                  <FontAwesomeIcon icon={faUser} className="fa-xl mr-2" />
                </Link>
              </li>
            </>
          ) : (
            // Si hay sesión iniciada, muestra opción de perfil
            <>
              <li>
                <div className="relative">
                  {/* Avatar del usuario con opción de menú desplegable */}
                  <img
                    src={usuario.avatar ? usuario.avatar : avatarDefault}
                    className="mr-2 size-6 rounded-full aspect-square ring-2 ring-white hover:ring-highlight duration-300 ease-in cursor-pointer"
                    onClick={togglePerfilMenu}
                  />
                  {/* Menú desplegable de perfil */}
                  {mostrarPerfilMenu && (
                    <div
                      className={`absolute right-0 mt-4 w-40 bg-cards rounded-md shadow-lg z-20 transition-opacity duration-300 ease-in ${
                        perfilMenuAbierto ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      {/* Opción para ir al perfil */}
                      <Link
                        to={`/perfil/${usuario.id}`}
                        className="duration-300 ease-in cursor-pointer group block px-4 py-2 hover:bg-neutral-800 hover:text-highlight text-sm focus:outline-none rounded-t-lg"
                        onClick={togglePerfilMenu}
                      >
                        <FontAwesomeIcon icon={faUser} className="mr-2" />
                        Ir al perfil
                      </Link>
                      {/* Opción para cerrar sesión */}
                      <div
                        className="duration-300 ease-in cursor-pointer group block px-4 py-2 hover:bg-neutral-800 hover:text-highlight text-sm focus:outline-none rounded-b-lg"
                        onClick={() => {
                          cerrarSesion();
                          togglePerfilMenu();
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faRightFromBracket}
                          className="mr-2"
                        />
                        Cerrar sesión
                      </div>
                    </div>
                  )}
                </div>
              </li>
            </>
          )}
        </ul>
        {/* Menú desplegable para dispositivos móviles */}
        {mostrarMenu && (
          <div
            className={`md:hidden z-10 divide-y divide-neutral-600 rounded-lg shadow w-40 bg-cards absolute top-16 right-4 transition-opacity duration-300 ease-in-out mt-4 ${
              menuAbierto ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Opciones de menú para dispositivos móviles */}
            <ul
              className="text-sm text-white"
              aria-labelledby="dropdownDefaultButton"
            >
              {/* Opción para explorar */}
              <li>
                <Link
                  to="/explorar"
                  className="duration-300 ease-in cursor-pointer group block px-4 py-2 hover:bg-neutral-800 focus:outline-none"
                  onClick={toggleMenu}
                >
                  <FontAwesomeIcon icon={faMagnifyingGlass} className="mr-2" />
                  Explorar
                </Link>
              </li>
            </ul>
            {/* Opciones para sesión iniciada o no iniciada */}
            {!sesionIniciada ? (
              // Si no hay sesión iniciada, muestra opción de inicio de sesión
              <>
                <ul>
                  <li>
                    <Link
                      to="/login"
                      className="duration-300 ease-in cursor-pointer group block px-4 py-2 hover:bg-neutral-800 hover:text-highlight text-sm focus:outline-none rounded-b-lg"
                    >
                      <FontAwesomeIcon icon={faKey} className="mr-2" />
                      Iniciar sesión
                    </Link>
                  </li>
                </ul>
              </>
            ) : (
              // Si hay sesión iniciada, muestra opción de perfil
              <ul>
                <li>
                  <Link
                    to={`/perfil/${usuario.id}`}
                    className="duration-300 ease-in cursor-pointer group flex items-center px-4 py-2 hover:bg-neutral-800 text-sm focus:outline-none"
                    onClick={toggleMenu}
                  >
                    <img
                      src={usuario.avatar ? usuario.avatar : avatarDefault}
                      className="mr-2 size-4 rounded-full aspect-square ring-2 ring-neutral-600"
                    />
                    Ir al perfil
                  </Link>
                </li>
                <li
                  className="duration-300 ease-in cursor-pointer group block px-4 py-2 hover:bg-neutral-800 hover:text-highlight text-sm focus:outline-none rounded-b-lg"
                  onClick={() => {
                    cerrarSesion();
                  }}
                >
                  <FontAwesomeIcon
                    icon={faRightFromBracket}
                    className="mr-2 fa-sm"
                  />
                  Cerrar sesión
                </li>
              </ul>
            )}
          </div>
        )}
      </nav>
    </Fragment>
  );
};

export default Navegacion;
