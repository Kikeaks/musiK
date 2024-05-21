import { useContext } from "react";
import { CtxAlbumes } from "../contextos/ProveedorAlbumes.jsx";

// Hook para acceder al contexto de canciones.
const useAlbumes = () => {
  // Utiliza el hook useContext para obtener el contexto de álbumes.
  const ctx = useContext(CtxAlbumes);

  // Retorna el contexto de álbume s.
  return ctx;
};

// Exporta el hook personalizado para su uso.
export { useAlbumes };
