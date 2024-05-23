import React, { Fragment } from "react";
import ksoftware from "../../assets/ksoftware.png"

// Componente para el pie de página.
const Pie = () => {
  return (
    <Fragment>
      {/* Pie de página */}
      <footer className="p-4 mt-auto">
        {/* Información de derechos de autor */}
        <div className="flex flex-col items-center text-center">
          <img className="w-32 mb-4" src={ksoftware}/>
          <p className="font-bold text-white">&copy; 2024 Ksoftware</p>
          <p className="text-neutral-400 font-semibold">Todos los derechos reservados</p>
        </div>
      </footer>
    </Fragment>
  );
};

export default Pie;
