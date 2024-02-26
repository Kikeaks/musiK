import React, { Fragment } from "react";

const Navegacion = () => {
  return (
    <Fragment>
      <nav className="bg-slate-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="#"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              className="w-12 h-12"
              src="https://svgshare.com/i/13Qm.svg"
              title="musik-w"
            />
            <h1 className="self-center text-lg font-semibold whitespace-nowrap text-indigo-600 font-sans">
              musiK
            </h1>
          </a>
        </div>
        <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button className="bg-indigo-600 hover:bg-indigo-500 text-white">
            Iniciar sesión
          </button>
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 bg-gray-800 md:bg-gray-900 border-gray-700">
            <li className="block py-2 px-3 md:p-0 text-white">Inicio</li>
            <li className="block py-2 px-3 md:p-0 text-white">Explorar</li>
            <li className="block py-2 px-3 md:p-0 text-white">Playlists</li>
          </ul>
        </div>
      </nav>
    </Fragment>
  );
};

export default Navegacion;
