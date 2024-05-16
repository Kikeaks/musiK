import React, { Fragment } from "react";

// Componente para el pie de página.
const Pie = () => {
  return (
    <Fragment>
      {/* Pie de página */}
      <footer className="backdrop-blur-2xl p-4">
        {/* Información de derechos de autor */}
        <div className="text-center font-semibold">
          <p>&copy; 2024 Ksoftware</p>
          <p>Todos los derechos reservados</p>
        </div>
      </footer>
    </Fragment>
  );
};

export default Pie;
