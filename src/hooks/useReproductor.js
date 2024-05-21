import { useContext } from "react";
import { CtxReproductor } from "../contextos/ProveedorReproductor.jsx";

// Hook para acceder al contexto de canciones.
const useReproductor = () => {
  // Utiliza el hook useContext para obtener el contexto del reproductor.
  const ctx = useContext(CtxReproductor);

  // Retorna el contexto del reproductor.
  return ctx;
};

// Exporta el hook personalizado para su uso.
export { useReproductor };
