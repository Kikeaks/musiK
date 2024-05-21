import { useContext } from "react";
import { CtxArtistas } from "../contextos/ProveedorArtistas.jsx";

// Hook para acceder al contexto de artistas.
const useArtistas = () => {
  // Utiliza el hook useContext para obtener el contexto de artistas.
  const ctx = useContext(CtxArtistas);

  // Retorna el contexto de artistas.
  return ctx;
};

// Exporta el hook personalizado para su uso.
export { useArtistas };
