import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faMagnifyingGlass,
  faMusic,
} from "@fortawesome/free-solid-svg-icons";
import LoginRegistro from "../../paginas/usuarios/LoginRegistro";

const Navegacion = () => {
  return (
    <Fragment>
      <nav className="flex justify-between items-center px-4 py-2 h-24 backdrop-blur-2xl">
        <div>
          <img
            className="w-12 h-12"
            src="https://i.ibb.co/PwxgML7/bitmap-bl.png"
            alt="musik-w"
          />
        </div>
        <ul className="flex space-x-6 items-center flex-grow justify-center h-full">
          <li>
            <Link to="/" className="duration-300 ease-in cursor-pointer group">
              <FontAwesomeIcon icon={faHouse} className="fa-xl" />
              <span className="ml-2">Inicio</span>
            </Link>
          </li>
          <li>
            <Link to="/explorar" className="duration-300 ease-in cursor-pointer group">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="fa-xl" />
              <span className="ml-2">Explorar</span>
            </Link>
          </li>
          <li>
            <Link to="/playlists" className="duration-300 ease-in cursor-pointer group">
              <FontAwesomeIcon icon={faMusic} className="fa-xl" />
              <span className="ml-2">Playlists</span>
            </Link>
          </li>
        </ul>
      </nav>
      <LoginRegistro />
    </Fragment>
  );
};

export default Navegacion;
