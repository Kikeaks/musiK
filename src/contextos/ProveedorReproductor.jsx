// context/AudioPlayerContext.js
import React, { createContext, useState } from 'react';

const CtxReproductor = createContext();

const ProveedorReproductor = ({ children }) => {
  const [playlist, setPlaylist] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  return (
    <CtxReproductor.Provider
      value={{ playlist, setPlaylist, currentTrackIndex, setCurrentTrackIndex }}
    >
      {children}
    </CtxReproductor.Provider>
  );
};

export default ProveedorReproductor;
export { CtxReproductor };
