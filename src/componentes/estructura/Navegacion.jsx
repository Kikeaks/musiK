import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faMagnifyingGlass,
  faMusic,
  faBars,
  faRightFromBracket,
  faPersonRunning,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useUsuarios } from "../../hooks/useUsuarios";
import ModalLoginRegistro from "../modales/ModalLoginRegistro.jsx";

const Navegacion = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

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
  }, [confirmacionLogin]); // Se ejecuta cada vez que confirmacionLogin cambia, es decir, cuando se inicia sesión.

  return (
    <Fragment>
      <nav className="flex justify-between items-center px-4 py-2 h-24">
        <div>
          <img
            className="w-12 h-12"
            src="https://i.ibb.co/PwxgML7/bitmap-bl.png"
            alt="musik-w"
          />
        </div>
        <div className="md:hidden">
          <FontAwesomeIcon
            icon={faBars}
            className="fa-xl duration-300 ease-in cursor-pointer group hover:text-highlight"
            onClick={toggleMenu}
          />
        </div>
        <ul className="hidden md:flex space-x-6 items-center flex-grow justify-center h-full">
          <li>
            <Link to="/" className="duration-300 ease-in cursor-pointer group">
              <FontAwesomeIcon icon={faHouse} className="fa-xl" />
            </Link>
          </li>
          <li>
            <Link
              to="/explorar"
              className="duration-300 ease-in cursor-pointer group"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} className="fa-xl" />
            </Link>
          </li>
          <li>
            <Link
              to="/playlists"
              className="duration-300 ease-in cursor-pointer group"
            >
              <FontAwesomeIcon icon={faMusic} className="fa-xl" />
            </Link>
          </li>
        </ul>
        {/* Desplegable */}
        {menuAbierto && (
          <div className="md:hidden z-10 divide-y divide-gray-100 rounded-lg shadow w-44 bg-cards absolute top-16 right-4 transition-opacity duration-300 ease-in-out opacity-100">
            <ul
              className="py-2 text-sm text-white"
              aria-labelledby="dropdownDefaultButton"
            >
              <li>
                <Link
                  to="/"
                  className="duration-300 ease-in cursor-pointer group block px-4 py-2 hover:bg-neutral-800"
                  onClick={toggleMenu}
                >
                  <FontAwesomeIcon icon={faHouse} className="mr-2" />
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  to="/explorar"
                  className="duration-300 ease-in cursor-pointer group block px-4 py-2 hover:bg-neutral-800"
                  onClick={toggleMenu}
                >
                  <FontAwesomeIcon icon={faMagnifyingGlass} className="mr-2" />
                  Explorar
                </Link>
              </li>
              <li>
                <Link
                  to="/playlists"
                  className="duration-300 ease-in cursor-pointer group block px-4 py-2 hover:bg-neutral-800"
                  onClick={toggleMenu}
                >
                  <FontAwesomeIcon icon={faMusic} className="mr-2" />
                  Playlists
                </Link>
              </li>
            </ul>
            {!sesionIniciada ? (
              <>
                <ul>
                  <li
                    className="duration-300 ease-in cursor-pointer group block px-4 py-2 hover:bg-neutral-800 hover:text-highlight text-sm"
                    onClick={() => {
                      setMostrarModal(true);
                    }}
                  >
                    <FontAwesomeIcon icon={faPersonRunning} className="mr-2" />
                    Iniciar sesión
                  </li>
                </ul>
              </>
            ) : (
              <ul>
                <li>
                  <Link
                    to={`/usuario/${usuario.id}`}
                    className="duration-300 ease-in cursor-pointer group block px-4 py-2 hover:bg-neutral-800 text-sm"
                    onClick={toggleMenu}
                  >
                    <FontAwesomeIcon icon={faUser} className="mr-2" />
                    Perfil
                  </Link>
                </li>
                <li
                  className="duration-300 ease-in cursor-pointer group block px-4 py-2 hover:bg-neutral-800 hover:text-highlight text-sm"
                  onClick={() => {
                    cerrarSesion();
                  }}
                >
                  <FontAwesomeIcon icon={faRightFromBracket} className="mr-2" />
                  Cerrar sesión
                </li>
              </ul>
            )}
          </div>
        )}
      </nav>
      <ModalLoginRegistro
        mostrar={mostrarModal}
        manejarCerrado={() => {
          setMostrarModal(false);
        }}
      />
    </Fragment>
  );
};

export default Navegacion;
