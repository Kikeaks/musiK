import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faMagnifyingGlass,
  faMusic,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

const Navegacion = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="flex justify-between items-center px-4 py-2 h-24 backdrop-blur-2xl">
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
      {/* Dropdown menu */}
      {isMenuOpen && (
        <div className="md:hidden z-10 divide-y rounded-lg shadow w-44 bg-cards absolute top-16 right-4">
          <ul
            className="py-2 text-sm text-white"
            aria-labelledby="dropdownDefaultButton"
          >
            <li>
              <Link
                to="/"
                className="duration-300 ease-in cursor-pointer group block px-4 py-2 hover:bg-neutral:800"
                onClick={toggleMenu}
              >
                <FontAwesomeIcon icon={faHouse} className="fa-xl mr-2" />
                Inicio
              </Link>
            </li>
            <li>
              <Link
                to="/explorar"
                className="duration-300 ease-in cursor-pointer group block px-4 py-2 hover:bg-neutral:800"
                onClick={toggleMenu}
              >
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="fa-xl mr-2"
                />
                Explorar
              </Link>
            </li>
            <li>
              <Link
                to="/playlists"
                className="duration-300 ease-in cursor-pointer group block px-4 py-2 hover:bg-neutral:800"
                onClick={toggleMenu}
              >
                <FontAwesomeIcon icon={faMusic} className="fa-xl mr-2" />
                Playlists
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navegacion;
