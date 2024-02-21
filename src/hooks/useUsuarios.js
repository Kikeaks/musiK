import { useContext } from "react";
import { CtxUsuarios } from "../contextos/ProveedorUsuarios.jsx";

// Hook para acceder al contexto de usuarios.
const useUsuarios = () => {
  // Utiliza el hook useContext para obtener el contexto de usuarios.
  const ctx = useContext(CtxUsuarios);

  // Retorna el contexto de usuarios.
  return ctx;
};

// Exporta el hook personalizado para su uso.
export { useUsuarios };
