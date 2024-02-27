import { useContext } from "react";
import { CtxPlaylists } from "../contextos/ProveedorPlaylists.jsx";

// Hook para acceder al contexto de playlists.
const usePlaylists = () => {
  // Utiliza el hook useContext para obtener el contexto de playlists.
  const ctx = useContext(CtxPlaylists);

  // Retorna el contexto de playlists.
  return ctx;
};

// Exporta el hook personalizado para su uso.
export { usePlaylists };
