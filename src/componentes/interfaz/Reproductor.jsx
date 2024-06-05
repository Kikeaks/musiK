import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackwardStep,
  faForwardStep,
  faCirclePause,
  faCirclePlay,
  faShuffle,
  faRepeat,
  faVolumeOff,
  faVolumeHigh,
  faVolumeLow,
  faVolumeXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useReproductor } from "../../hooks/useReproductor";
import { useUsuarios } from "../../hooks/useUsuarios";

// Componente correspondiente al reproductor.
const Reproductor = () => {
  const { sesionIniciada } = useUsuarios();
  const [reproduciendo, setReproduciendo] = useState(false);
  const [volumen, setVolumen] = useState(0.5);
  const [muteado, setMuteado] = useState(false);
  const [tiempoActual, setTiempoActual] = useState(0);
  const [duracion, setDuracion] = useState(0);
  const [aleatorio, setAleatorio] = useState(false);
  const [repeticion, setRepeticion] = useState(false);
  const audioRef = useRef(null);
  const volumeRef = useRef(null);
  const lastBackwardPressRef = useRef(0);

  const { playlist, setPlaylist, currentTrackIndex, setCurrentTrackIndex } =
    useReproductor();

  // Función para actualizar la duración de la canción cuando se carga
  useEffect(() => {
    const onLoadedMetadata = () => {
      setDuracion(audioRef.current.duration);
    };
    audioRef.current.addEventListener("loadedmetadata", onLoadedMetadata);
    return () => {
      audioRef.current.removeEventListener("loadedmetadata", onLoadedMetadata);
    };
  }, [playlist]);

  // Actualizar el volumen del audio al cambiar el volumen en el estado
  useEffect(() => {
    audioRef.current.volume = muteado ? 0 : volumen;
  }, [volumen, muteado]);

  // Reproducir la canción actual cuando cambia el índice de la pista actual
  useEffect(() => {
    if (currentTrackIndex !== null) {
      setReproduciendo(true);
      audioRef.current.play();
    }
  }, [playlist[currentTrackIndex]]);

  // Manejador para reproducir/pausar la canción actual
  const playPausa = () => {
    if (reproduciendo) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setReproduciendo(!reproduciendo);
  };

  // Manejador para ajustar el volumen
  const cambiarVolumen = (e) => {
    setVolumen(e.target.value);
    setMuteado(false);
  };

  // Alternar el estado de silencio
  const mutear = () => {
    setMuteado(!muteado);
    if (!muteado) {
      audioRef.current.volume = volumen;
      volumeRef.current.value = volumen;
    }
  };

  // Manejador para avanzar a la siguiente canción
  const siguiente = () => {
    if (aleatorio) {
      const randomIndex = Math.floor(Math.random() * playlist.length);
      setCurrentTrackIndex(randomIndex);
    } else {
      setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % playlist.length);
    }
  };

  // Manejador para retroceder a la canción anterior
  const anterior = () => {
    const now = Date.now();
    if (now - lastBackwardPressRef.current < 2000) {
      setCurrentTrackIndex((prevIndex) =>
        prevIndex === 0 ? playlist.length - 1 : prevIndex - 1
      );
    } else {
      audioRef.current.currentTime = 0;
      setTiempoActual(0);
    }
    lastBackwardPressRef.current = now;
  };

  // Manejador para actualizar el tiempo actual de la canción
  const cambioTiempo = () => {
    setTiempoActual(audioRef.current.currentTime);
  };

  // Función para formatear el tiempo en segundos a mm:ss
  const formatearDuracion = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  // Alternar el modo de reproducción aleatoria (shuffle)
  const randomizar = () => {
    setAleatorio(!aleatorio);
  };

  // Alternar el modo de repetición
  const repetirCancion = () => {
    setRepeticion(!repeticion);
  };

  // Manejador para ajustar el volumen con la rueda del ratón
  const ajustarVolumenConScroll = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.05 : 0.05;
    const newVolume = Math.min(Math.max(0, volumen + delta), 1);
    setVolumen(newVolume);
  };

  // Agregar el event listener para ajustar el volumen con la rueda del ratón
  useEffect(() => {
    const volumeControl = volumeRef.current;
    const scrollear = (e) => {
      ajustarVolumenConScroll(e);
    };
    volumeControl.addEventListener("wheel", scrollear, { passive: false });
    return () => {
      volumeControl.removeEventListener("wheel", scrollear);
    };
  }, [volumeRef, volumen]);

  // Limpiar la lista de reproducción y pausar la canción actual si el usuario cierra sesión
  useEffect(() => {
    if (!sesionIniciada) {
      setPlaylist([]);
      setCurrentTrackIndex(null);
      audioRef.current.pause();
    }
  }, [sesionIniciada]);

  return (
    <div className="flex flex-row w-full bg-fondo sticky bottom-0 p-4 items-center justify-between mt-auto">
      <audio
        ref={audioRef}
        src={
          playlist[currentTrackIndex]?.url ||
          playlist[currentTrackIndex]?.preview
        }
        onTimeUpdate={cambioTiempo}
        onEnded={() => {
          if (repeticion) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
          } else {
            siguiente();
          }
        }}
      />
      <div className="hidden md:flex items-center w-1/3">
        <img
          className="mr-2 rounded"
          src={
            playlist[currentTrackIndex]?.portada ||
            playlist[currentTrackIndex]?.album.cover_small
          }
        />
        <div className="text-sm w-full min-w-0">
          <p className="font-semibold truncate">
            {playlist[currentTrackIndex]?.nombre ||
              playlist[currentTrackIndex]?.title}
          </p>
          <p className="text-neutral-400 truncate">
            {playlist[currentTrackIndex]?.artista ||
              playlist[currentTrackIndex]?.artist.name}
          </p>
        </div>
      </div>
      <div className="flex flex-col w-full md:w-1/3 justify-center items-center">
        <div className="flex flex-row justify-center items-center mb-3">
          <FontAwesomeIcon
            className={`hover:text-highlight duration-300 ease-in cursor-pointer group mr-4 ${
              aleatorio ? "text-highlight" : "text-neutral-600"
            }`}
            icon={faShuffle}
            onClick={randomizar}
          />
          <FontAwesomeIcon
            className="fa-xl hover:text-highlight duration-300 ease-in cursor-pointer group mr-4"
            icon={faBackwardStep}
            onClick={anterior}
          />
          <FontAwesomeIcon
            className="fa-2xl hover:text-highlight duration-300 ease-in cursor-pointer group mr-4"
            icon={!reproduciendo ? faCirclePlay : faCirclePause}
            onClick={playPausa}
          />
          <FontAwesomeIcon
            className="fa-xl hover:text-highlight duration-300 ease-in cursor-pointer group mr-4"
            icon={faForwardStep}
            onClick={siguiente}
          />
          <FontAwesomeIcon
            className={`hover:text-highlight duration-300 ease-in cursor-pointer group ${
              repeticion ? "text-highlight" : "text-neutral-600"
            }`}
            icon={faRepeat}
            onClick={repetirCancion}
          />
        </div>
        <div className="flex flex-row items-center justify-between text-xs sm:text-sm w-full text-neutral-400">
          <span className="mr-2">{formatearDuracion(tiempoActual)}</span>
          <input
            className="w-full h-0.5 rounded-full"
            type="range"
            value={tiempoActual}
            max={duracion}
            step="0.01"
            onChange={(e) => {
              audioRef.current.currentTime = e.target.value;
              setTiempoActual(e.target.value);
            }}
          />
          <span className="ml-2">
            {playlist[currentTrackIndex]?.duracion ||
            playlist[currentTrackIndex]?.duration
              ? formatearDuracion(
                  playlist[currentTrackIndex]?.duracion ||
                    playlist[currentTrackIndex]?.duration
                )
              : "-:-"}
          </span>
        </div>
        <div className="md:hidden w-full min-w-0 text-sm text-center mt-3">
          <p className="font-semibold truncate">
            {playlist[currentTrackIndex]?.nombre ||
              playlist[currentTrackIndex]?.title}
          </p>
          <p className="text-neutral-400 truncate">
            {playlist[currentTrackIndex]?.artista ||
              playlist[currentTrackIndex]?.artist.name}
          </p>
        </div>
      </div>
      <div className="w-1/3 hidden md:flex flex-row items-center justify-end">
        <FontAwesomeIcon
          className="mr-2 hover:text-highlight duration-300 ease-in cursor-pointer group"
          icon={
            muteado
              ? faVolumeXmark
              : volumen < 0.33
              ? faVolumeOff
              : volumen < 0.66
              ? faVolumeLow
              : faVolumeHigh
          }
          onClick={mutear}
        />
        <input
          className="h-0.5"
          ref={volumeRef}
          type="range"
          value={muteado ? 0 : volumen}
          max="1"
          min="0"
          step="0.05"
          onChange={cambiarVolumen}
        />
      </div>
    </div>
  );
};

export default Reproductor;
