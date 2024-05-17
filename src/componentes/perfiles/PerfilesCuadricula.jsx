import React, { Fragment } from "react";
import PerfilCard from "./PerfilCard"; // Suponiendo que tienes un componente de tarjeta de usuario

// Componente para mostrar la cuadrícula de seguidores o seguidos en el perfil de un usuario.
const PerfilesCuadricula = ({ perfiles }) => {
  return (
    <Fragment>
      {/* Contenedor de la cuadrícula de perfiles */}
      <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-7 gap-8">
        {/* Mapeo de los perfiles para crear las tarjetas */}
        {perfiles ? (
          perfiles.map((perfil, index) => (
            <PerfilCard key={index} perfil={perfil} />
          ))
        ) : (
          <p>No hay datos.</p>
        )}
      </div>
    </Fragment>
  );
};

export default PerfilesCuadricula;
