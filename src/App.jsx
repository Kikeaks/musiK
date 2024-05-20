import React, { Fragment } from "react";
import Principal from "./componentes/estructura/Principal.jsx";
import Pie from "./componentes/estructura/Pie.jsx";
import ProveedorCanciones from "./contextos/ProveedorCanciones.jsx";
import { BrowserRouter } from "react-router-dom";
import ProveedorUsuarios from "./contextos/ProveedorUsuarios.jsx";
import ProveedorPlaylists from "./contextos/ProveedorPlaylists.jsx";

import Player from "./componentes/interfaz/Player.jsx";

const App = () => {
  return (
    <Fragment>
      <BrowserRouter>
        <ProveedorUsuarios>
            <ProveedorCanciones>
              <ProveedorPlaylists>
                <main className="flex flex-col min-h-screen">
                  <Principal />
                  <Player/>
                  <Pie />
                </main>
              </ProveedorPlaylists>
            </ProveedorCanciones>
        </ProveedorUsuarios>
      </BrowserRouter>
    </Fragment>
  );
};

export default App;
