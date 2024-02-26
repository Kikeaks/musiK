import React, { createContext } from "react";
import { supabaseConexion } from "../config/supabase.js";

const CtxPlaylists = createContext();

const ProveedorPlaylists = ({ children }) => {
  return (
    <CtxPlaylists.Provider value={exports}>{children}</CtxPlaylists.Provider>
  );
};

export { CtxPlaylists };
export default ProveedorPlaylists;
