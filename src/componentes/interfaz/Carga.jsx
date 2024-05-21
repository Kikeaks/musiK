import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGreaterThan } from "@fortawesome/free-solid-svg-icons";

const Carga = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen bg-black fixed top-0 left-0 z-50">
      <div className="relative flex space-x-4">
        <div className="loading-icon animate-fade delay-0">
          <FontAwesomeIcon icon={faGreaterThan} />
        </div>
        <div className="loading-icon animate-fade delay-500">
          <FontAwesomeIcon icon={faGreaterThan} />
        </div>
        <div className="loading-icon animate-fade delay-1000">
          <FontAwesomeIcon icon={faGreaterThan} />
        </div>
      </div>
    </div>
  );
};

export default Carga;
