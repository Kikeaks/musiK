import {
  faBackwardStep,
  faForwardStep,
  faCirclePause,
  faCirclePlay,
  faShuffle,
  faRepeat,
  faVolumeOff,
  faVolumeHigh,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useRef, useEffect } from "react";
import { useReproductor } from "../../hooks/useReproductor";

const Reproductor = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isShuffleOn, setIsShuffleOn] = useState(false);
  const audioRef = useRef(null);
  const volumeRef = useRef(null);
  const lastBackwardPressRef = useRef(0);

  const { playlist, currentTrackIndex, setCurrentTrackIndex } =
    useReproductor();

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
  }, [playlist]);

  useEffect(() => {
    // Actualizar el volumen del audio al cambiar el volumen en el estado
    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    setIsPlaying(true);
    audioRef.current.play();
  }, [currentTrackIndex]);

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
    setIsMuted(false);
  };

  const toggleMute = () => {
    const newIsMuted = !isMuted;
    setIsMuted(newIsMuted);
    if (newIsMuted) {
      audioRef.current.volume = 0;
    } else {
      audioRef.current.volume = volume;
      volumeRef.current.value = volume;
    }
  };

  const adjustVolumeWithScroll = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.05 : 0.05;
    const newVolume = Math.min(Math.max(0, volume + delta), 1);
    setVolume(newVolume);
  };

  const nextSongHandler = () => {
    if (isShuffleOn) {
      const randomIndex = Math.floor(Math.random() * playlist.length);
      setCurrentTrackIndex(randomIndex);
    } else {
      setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % playlist.length);
    }
  };

  const prevSongHandler = () => {
    const now = Date.now();
    if (now - lastBackwardPressRef.current < 2000) {
      setCurrentTrackIndex((prevIndex) =>
        prevIndex === 0 ? playlist.length - 1 : prevIndex - 1
      );
    } else {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
    }
    lastBackwardPressRef.current = now;
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
      const handleWheel = (e) => {
        adjustVolumeWithScroll(e);
        e.preventDefault();
      };

      volumeControl.addEventListener("wheel", handleWheel, { passive: false });

      return () => {
        volumeControl.removeEventListener("wheel", handleWheel);
      };
    }
  }, [volumeRef, volume]);

  return (
    <div className="flex flex-row w-full bg-fondo sticky bottom-0 p-4 items-center justify-between mt-auto">
      <audio
        ref={audioRef}
        src={playlist[currentTrackIndex]?.url}
        onTimeUpdate={timeUpdateHandler}
        onEnded={nextSongHandler}
      />
      <div className="hidden md:flex items-center w-1/3">
        <img className="mr-2" src={playlist[currentTrackIndex]?.portada} />
        <div className="text-sm w-full min-w-0">
          <p className="font-semibold truncate">
            {playlist[currentTrackIndex]?.nombre}
          </p>
          <p className="text-neutral-400 truncate">
            {playlist[currentTrackIndex]?.artista}
          </p>
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
        <div className="flex flex-row items-center justify-between text-xs sm:text-sm w-full text-neutral-400">
          <span className="mr-2">{formatTime(currentTime)}</span>
          <input
            className="w-full h-0.5 rounded-full"
            type="range"
            value={currentTime}
            max={duration}
            step="0.01"
            onChange={(e) => {
              audioRef.current.currentTime = e.target.value;
              setCurrentTime(e.target.value);
            }}
          />
          <span className="ml-2">
            {playlist[currentTrackIndex]?.duracion
              ? formatTime(playlist[currentTrackIndex]?.duracion)
              : "-:-"}
          </span>
        </div>
        <div className="md:hidden w-full min-w-0 text-sm text-center mt-3">
          <p className="font-semibold truncate">
            {playlist[currentTrackIndex]?.nombre}
          </p>
          <p className="text-neutral-400 truncate">
            {playlist[currentTrackIndex]?.artista}
          </p>
        </div>
      </div>
      <div className="w-1/3 hidden md:flex flex-row items-center justify-end">
        <FontAwesomeIcon
          className="mr-2"
          icon={isMuted ? faVolumeOff : faVolumeHigh}
          onClick={toggleMute}
        />
        <input
          className="h-0.5"
          ref={volumeRef}
          type="range"
          value={isMuted ? 0 : volume}
          max="1"
          min="0"
          step="0.05"
          onChange={changeVolumeHandler}
        />
      </div>
    </div>
  );
};

export default Reproductor;
