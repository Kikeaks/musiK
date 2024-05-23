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

const Navegacion = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [mostrarMenu, setMostrarMenu] = useState(false);
  const [perfilMenuAbierto, setPerfilMenuAbierto] = useState(false);
  const [mostrarPerfilMenu, setMostrarPerfilMenu] = useState(false);

  const toggleMenu = () => {
    if (!menuAbierto) {
      setMostrarMenu(true);
      setTimeout(() => setMenuAbierto(true), 10);
    } else {
      setMenuAbierto(false);
      setTimeout(() => setMostrarMenu(false), 300);
    }
  };

  const togglePerfilMenu = () => {
    if (!perfilMenuAbierto) {
      setMostrarPerfilMenu(true);
      setTimeout(() => setPerfilMenuAbierto(true), 10);
    } else {
      setPerfilMenuAbierto(false);
      setTimeout(() => setMostrarPerfilMenu(false), 300);
    }
  };

  const { usuario, sesionIniciada, cerrarSesion } = useUsuarios();

  return (
    <Fragment>
      <nav className="flex justify-between items-center px-4 py-2 h-24">
        <div>
          <img src={logo} title="musik-w" className="size-12" />
        </div>
        <div className="md:hidden">
          <FontAwesomeIcon
            icon={faBars}
            className="fa-xl duration-300 ease-in cursor-pointer group hover:text-highlight focus:outline-none md:focus:outline"
            onClick={toggleMenu}
          />
        </div>
        <ul className="hidden md:flex space-x-6 items-center flex-grow justify-end h-full">
          <li>
            <Link
              to="/"
              className="duration-300 ease-in cursor-pointer group focus:outline-none"
            >
              <FontAwesomeIcon icon={faHouse} className="fa-xl" />
            </Link>
          </li>
          <li>
            <Link
              to="/explorar"
              className="duration-300 ease-in cursor-pointer group focus:outline-none"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} className="fa-xl" />
            </Link>
          </li>
          {!sesionIniciada ? (
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
            <>
              <li>
                <div className="relative">
                  <img
                    src={usuario.avatar ? usuario.avatar : avatarDefault}
                    className="mr-2 size-6 rounded-full aspect-square ring-1 ring-white hover:ring-highlight duration-300 ease-in cursor-pointer"
                    onClick={togglePerfilMenu}
                  />
                  {mostrarPerfilMenu && (
                    <div
                      className={`absolute right-0 mt-4 w-40 bg-cards rounded-md shadow-lg z-20 transition-opacity duration-300 ease-in ${
                        perfilMenuAbierto ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <Link
                        to={`/perfil/${usuario.id}`}
                        className="duration-300 ease-in cursor-pointer group block px-4 py-2 hover:bg-neutral-800 hover:text-highlight text-sm focus:outline-none rounded-t-lg"
                        onClick={togglePerfilMenu}
                      >
                        <FontAwesomeIcon icon={faUser} className="mr-2" />
                        Ir al perfil
                      </Link>
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
        {/* Desplegable */}
        {mostrarMenu && (
          <div
            className={`md:hidden z-10 divide-y divide-neutral-600 rounded-lg shadow w-40 bg-cards absolute top-16 right-4 transition-opacity duration-300 ease-in-out mt-4 ${
              menuAbierto ? "opacity-100" : "opacity-0"
            }`}
          >
            <ul
              className="text-sm text-white"
              aria-labelledby="dropdownDefaultButton"
            >
              <li>
                <Link
                  to="/"
                  className="duration-300 ease-in cursor-pointer group block px-4 py-2 hover:bg-neutral-800 focus:outline-none rounded-t-lg"
                  onClick={toggleMenu}
                >
                  <FontAwesomeIcon icon={faHouse} className="mr-2" />
                  Inicio
                </Link>
              </li>
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
            {!sesionIniciada ? (
              <>
                <ul>
                  <li>
                    <Link
                      to="/login"
                      className="duration-300 ease-in cursor-pointer group block px-4 py-2 hover:bg-neutral-800 hover:text-highlight text-sm focus:outline-none rounded-b-lg"
                    >
                      <FontAwesomeIcon
                        icon={faKey}
                        className="mr-2"
                      />
                      Iniciar sesión
                    </Link>
                  </li>
                </ul>
              </>
            ) : (
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
