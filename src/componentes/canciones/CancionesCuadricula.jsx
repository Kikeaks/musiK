import React, { Fragment } from "react";
import CancionCard from "./CancionCard";

const CancionesCuadricula = ({ canciones }) => {
  return (
    <Fragment>
      <div className="p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-8">
        {canciones.map((cancion, index) => (
          <CancionCard key={index} cancion={cancion} />
        ))}
      </div>
    </Fragment>
  );
};

export default CancionesCuadricula;
