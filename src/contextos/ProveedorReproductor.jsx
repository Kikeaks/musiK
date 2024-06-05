import React, { createContext, useState } from "react";

// Crear un nuevo contexto para el reproductor
const CtxReproductor = createContext();

// Proveedor del reproductor que contiene el estado y las funciones relacionadas con la reproducción de música
const ProveedorReproductor = ({ children }) => {
  // Estado para almacenar la lista de reproducción
  const [playlist, setPlaylist] = useState([]);
  // Estado para almacenar el índice de la pista actualmente en reproducción
  const [currentTrackIndex, setCurrentTrackIndex] = useState(null);
  // Estado para controlar si la música está reproduciéndose o no
  const [isPlaying, setIsPlaying] = useState(false);

  // Función para iniciar la reproducción de una pista en un índice específico
  const iniciarReproduccion = (index) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
  };

  // Función para pausar la reproducción
  const pausarReproduccion = () => {
    setIsPlaying(false);
  };

  // Objeto que contiene el estado y las funciones relacionadas con el reproductor que se exportarán
  const exports = {
    playlist,
    currentTrackIndex,
    isPlaying,
    setPlaylist,
    setCurrentTrackIndex,
    iniciarReproduccion,
    pausarReproduccion,
  };

  // Proporcionar el contexto y pasar los valores a los componentes secundarios
  return (
    <CtxReproductor.Provider value={exports}>
      {children}
    </CtxReproductor.Provider>
  );
};

// Exportar el proveedor del reproductor y el contexto
export default ProveedorReproductor;
export { CtxReproductor };
