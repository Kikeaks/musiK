import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faMagnifyingGlass,
  faMusic,
} from "@fortawesome/free-solid-svg-icons";

// Componente para la barra de navegación.
const Navegacion = () => {
  return (
    <Fragment>
      {/* Barra de navegación */}
      <nav className="flex justify-between items-center px-4 py-2 h-24 backdrop-blur-2xl">
        {/* Logo */}
        <div>
          <img
            className="w-12 h-12"
            src="https://i.ibb.co/PwxgML7/bitmap-bl.png"
            alt="musik-w"
          />
        </div>
        {/* Lista de enlaces */}
        <ul className="flex space-x-6 items-center flex-grow justify-center h-full">
          {/* Enlace a la página de inicio */}
          <li>
            <Link to="/" className="duration-300 ease-in cursor-pointer group">
              <FontAwesomeIcon icon={faHouse} className="fa-xl" />
              <span className="ml-2">Inicio</span>
            </Link>
          </li>
          {/* Enlace a la página de exploración */}
          <li>
            <Link
              to="/explorar"
              className="duration-300 ease-in cursor-pointer group"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} className="fa-xl" />
              <span className="ml-2">Explorar</span>
            </Link>
          </li>
          {/* Enlace a la página de playlists */}
          <li>
            <Link
              to="/playlists"
              className="duration-300 ease-in cursor-pointer group"
            >
              <FontAwesomeIcon icon={faMusic} className="fa-xl" />
              <span className="ml-2">Playlists</span>
            </Link>
          </li>
        </ul>
      </nav>
    </Fragment>
  );
};

export default Navegacion;
