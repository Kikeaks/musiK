import React, { createContext, useState } from "react";

const CtxReproductor = createContext();

const ProveedorReproductor = ({ children }) => {
  const [playlist, setPlaylist] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const iniciarReproduccion = (index) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
  };

  const pausarReproduccion = () => {
    setIsPlaying(false);
  };

  const exports = {
    playlist,
    currentTrackIndex,
    isPlaying,
    setPlaylist,
    setCurrentTrackIndex,
    iniciarReproduccion,
    pausarReproduccion,
  };

  return (
    <CtxReproductor.Provider value={exports}>
      {children}
    </CtxReproductor.Provider>
  );
};

export default ProveedorReproductor;
export { CtxReproductor };
