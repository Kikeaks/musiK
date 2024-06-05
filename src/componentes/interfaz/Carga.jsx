import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRecordVinyl } from "@fortawesome/free-solid-svg-icons";

// Componente para mostrar un indicador de carga mientras se espera que se complete una operación.
const Carga = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen bg-black fixed top-0 left-0 z-50">
      {/* Contenedor de íconos de carga */}
      <div className="relative flex space-x-4">
        {/* Ícono de carga animado */}
        <div className="loading-icon animate-fade delay-0">
          <FontAwesomeIcon icon={faRecordVinyl} />
        </div>
        {/* Ícono de carga animado con retraso de 500ms */}
        <div className="loading-icon animate-fade delay-500">
          <FontAwesomeIcon icon={faRecordVinyl} />
        </div>
        {/* Ícono de carga animado con retraso de 1000ms */}
        <div className="loading-icon animate-fade delay-1000">
          <FontAwesomeIcon icon={faRecordVinyl} />
        </div>
      </div>
    </div>
  );
};

export default Carga;
