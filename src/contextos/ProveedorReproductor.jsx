import React, { createContext, useState } from "react";

const CtxReproductor = createContext();

const ProveedorReproductor = ({ children }) => {
  const [playlist, setPlaylist] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(null);

  const exports = {
    playlist,
    setPlaylist,
    currentTrackIndex,
    setCurrentTrackIndex,
  };

  return (
    <CtxReproductor.Provider value={exports}>
      {children}
    </CtxReproductor.Provider>
  );
};

export default ProveedorReproductor;
export { CtxReproductor };
