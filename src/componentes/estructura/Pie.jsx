import React, { Fragment } from "react";

const Pie = () => {
  return (
    <Fragment>
      <footer className="backdrop-blur-md">
        <div className="text-center">
          <p>&copy; 2024 Kike Azorín</p>
        </div>
        <div>
          <ul className="flex space-x-6 items-center justify-around">
            <li>Sobre nosotros</li>
            <li>Contacto</li>
            <li>Aviso legal</li>
            <li>Políticas de privacidad</li>
          </ul>
        </div>
      </footer>
    </Fragment>
  );
};

export default Pie;
