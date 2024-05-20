import React, { Fragment } from "react";
import Principal from "./componentes/estructura/Principal.jsx";
import Pie from "./componentes/estructura/Pie.jsx";
import ProveedorCanciones from "./contextos/ProveedorCanciones.jsx";
import { BrowserRouter } from "react-router-dom";
import ProveedorUsuarios from "./contextos/ProveedorUsuarios.jsx";
import ProveedorPlaylists from "./contextos/ProveedorPlaylists.jsx";
import Reproductor from "./componentes/interfaz/Reproductor.jsx";
import ProveedorReproductor from "./contextos/ProveedorReproductor.jsx";

const App = () => {
  return (
    <Fragment>
      <BrowserRouter>
        <ProveedorUsuarios>
          <ProveedorReproductor>
            <ProveedorCanciones>
              <ProveedorPlaylists>
                <main className="flex flex-col min-h-screen">
                  <Principal />
                  <Reproductor />
                  {/*                 <Pie /> */}
                </main>
              </ProveedorPlaylists>
            </ProveedorCanciones>
          </ProveedorReproductor>
        </ProveedorUsuarios>
      </BrowserRouter>
    </Fragment>
  );
};

export default App;
