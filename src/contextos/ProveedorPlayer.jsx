// context/AudioPlayerContext.js
import React, { createContext, useState, useContext, useEffect } from "react";

const AudioPlayerContext = createContext();

export const AudioPlayerProvider = ({ children }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(null);
  const [playlist, setPlaylist] = useState([]);

  const setCurrentTrack = (index) => {
    if (index >= 0 && index < playlist.length) {
      setCurrentTrackIndex(index);
    }
  };

  const playNextTrack = () => {
    setCurrentTrack((prevIndex) => {
      const nextIndex = (prevIndex + 1) % playlist.length;
      return nextIndex;
    });
  };

  const playPrevTrack = () => {
    setCurrentTrack((prevIndex) => {
      const prevIndex = (prevIndex - 1 + playlist.length) % playlist.length;
      return prevIndex;
    });
  };

  const currentTrack = playlist[currentTrackIndex] || null;

  return (
    <AudioPlayerContext.Provider value={{
      currentTrack,
      setCurrentTrack,
      playlist,
      setPlaylist,
      playNextTrack,
      playPrevTrack,
    }}>
      {children}
    </AudioPlayerContext.Provider>
  );
};

export const useAudioPlayer = () => useContext(AudioPlayerContext);
