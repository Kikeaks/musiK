import { useContext } from "react";
import { CtxCanciones } from "../contextos/ProveedorCanciones.jsx";

// Hook para acceder al contexto de canciones.
const useCanciones = () => {
  // Utiliza el hook useContext para obtener el contexto de canciones.
  const ctx = useContext(CtxCanciones);

  // Retorna el contexto de canciones.
  return ctx;
};

// Exporta el hook personalizado para su uso.
export { useCanciones };
