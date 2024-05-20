import {
    faBackwardStep,
    faForwardStep,
    faCirclePause,
    faCirclePlay,
    faShuffle,
    faRepeat,
    faVolumeOff,
  } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import React, { useState, useRef, useEffect } from "react";
  
  const AudioPlayer = () => {
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isShuffleOn, setIsShuffleOn] = useState(false); // Nuevo estado para el modo de reproducción aleatoria
    const audioRef = useRef(null);
    const volumeRef = useRef(null);
  
    const songs = [
      "https://cdns-preview-c.dzcdn.net/stream/c-c7f32280916bc10e989ca5f4ed3b8afb-7.mp3",
      "https://cdns-preview-1.dzcdn.net/stream/c-1d1006537dc5829f51946894067a9e78-4.mp3",
    ];
  
    useEffect(() => {
      // Actualizar la duración de la canción cuando se carga
      const onLoadedMetadata = () => {
        setDuration(audioRef.current.duration);
      };
      audioRef.current.addEventListener("loadedmetadata", onLoadedMetadata);
  
      // Limpiar el event listener cuando el componente se desmonte
      return () => {
        audioRef.current.removeEventListener("loadedmetadata", onLoadedMetadata);
      };
    }, []);
  
    useEffect(() => {
      // Actualizar el volumen del audio al cambiar el volumen en el estado
      audioRef.current.volume = volume;
    }, [volume]);
  
    useEffect(() => {
      // Reproducir automáticamente la canción cuando se cambia
      if (isPlaying) {
        audioRef.current.play();
      }
    }, [currentSongIndex]);
  
    const playPauseHandler = () => {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    };
  
    const changeVolumeHandler = (e) => {
      setVolume(e.target.value);
    };
  
    const adjustVolumeWithScroll = (e) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.05 : 0.05; // Cambio gradual del 5%
      const newVolume = Math.min(Math.max(0, volume + delta), 1);
      setVolume(newVolume);
    };
  
    const nextSongHandler = () => {
      if (isShuffleOn) {
        const randomIndex = Math.floor(Math.random() * songs.length);
        setCurrentSongIndex(randomIndex);
      } else {
        setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
      }
    };
  
    const prevSongHandler = () => {
      setCurrentSongIndex((prevIndex) =>
        prevIndex === 0 ? songs.length - 1 : prevIndex - 1
      );
    };
  
    const timeUpdateHandler = () => {
      setCurrentTime(audioRef.current.currentTime);
    };
  
    const formatTime = (timeInSeconds) => {
      const minutes = Math.floor(timeInSeconds / 60);
      const seconds = Math.floor(timeInSeconds % 60);
      return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
        2,
        "0"
      )}`;
    };
  
    const toggleShuffle = () => {
      setIsShuffleOn(!isShuffleOn);
    };
  
    useEffect(() => {
      const volumeControl = volumeRef.current;
      if (volumeControl) {
        volumeControl.addEventListener('wheel', adjustVolumeWithScroll, { passive: false });
      }
  
      // Cleanup event listener on unmount
      return () => {
        if (volumeControl) {
          volumeControl.removeEventListener('wheel', adjustVolumeWithScroll);
        }
      };
    }, [volumeRef]);
  
    return (
      <div className="flex flex-row w-full bg-cards sticky bottom-0 p-4 items-center justify-between">
        <audio
          ref={audioRef}
          src={songs[currentSongIndex]}
          onTimeUpdate={timeUpdateHandler}
          onEnded={nextSongHandler}
        />
        <div className="hidden md:flex items-center w-1/3">
          <img className="mr-2" src="https://e-cdns-images.dzcdn.net/images/cover/2ae6c01a51296a7ec6d89c96a4fac32c/56x56-000000-80-0-0.jpg" />
          <div className="text-sm">
            <p className="font-semibold">Something Just Like This</p>
            <p className="text-neutral-400">Coldplay</p>
          </div>
        </div>
        <div className="flex flex-col w-full md:w-1/3 justify-center items-center">
          <div className="flex flex-row justify-center items-center mb-3">
            <FontAwesomeIcon
              className="fa-xl hover:text-highlight duration-300 ease-in cursor-pointer group mr-4"
              icon={faShuffle}
              onClick={toggleShuffle}
            />
            <FontAwesomeIcon
              className="fa-xl hover:text-highlight duration-300 ease-in cursor-pointer group mr-4"
              icon={faBackwardStep}
              onClick={prevSongHandler}
            />
            {!isPlaying ? (
              <FontAwesomeIcon
                className="fa-2xl hover:text-highlight duration-300 ease-in cursor-pointer group mr-4"
                icon={faCirclePlay}
                onClick={playPauseHandler}
              />
            ) : (
              <FontAwesomeIcon
                className="fa-2xl hover:text-highlight duration-300 ease-in cursor-pointer group mr-4"
                icon={faCirclePause}
                onClick={playPauseHandler}
              />
            )}
            <FontAwesomeIcon
              className="fa-xl hover:text-highlight duration-300 ease-in cursor-pointer group mr-4"
              icon={faForwardStep}
              onClick={nextSongHandler}
            />
            <FontAwesomeIcon
              className="fa-xl hover:text-highlight duration-300 ease-in cursor-pointer group"
              icon={faRepeat}
            />
          </div>
          <div className="flex flex-row text-sm w-full text-neutral-400">
            <span className="mr-2">{formatTime(currentTime)}</span>
            <input
              className="w-full"
              type="range"
              value={currentTime}
              max={duration}
              step="0.01"
              onChange={(e) => {
                audioRef.current.currentTime = e.target.value;
                setCurrentTime(e.target.value);
              }}
            />
            <span className="ml-2">{formatTime(duration - currentTime)}</span>
          </div>
          <p className="md:hidden text-sm text-center mt-3">
            <span className="font-semibold">Something Just Like This</span> · <span className="text-neutral-400">Coldplay</span>
          </p>
        </div>
        <div className="w-1/3 hidden md:flex flex-row items-center justify-end">
          <FontAwesomeIcon icon={faVolumeOff} />
          <input
            ref={volumeRef}
            type="range"
            value={volume}
            max="1"
            min="0"
            step="0.05"
            onChange={changeVolumeHandler}
            onWheel={adjustVolumeWithScroll}
          />
        </div>
      </div>
    );
  };
  
  export default AudioPlayer;
  