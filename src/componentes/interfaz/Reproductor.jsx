// components/AudioPlayer.js
import React, { useEffect, useRef } from 'react';
import ReactH5AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useReproductor } from '../../hooks/useReproductor';

const Reproductor = () => {
  const { playlist, currentTrackIndex, setCurrentTrackIndex } = useReproductor();
  const playerRef = useRef();

  const handleClickNext = () => {
    setCurrentTrackIndex((currentTrackIndex + 1) % playlist.length);
  };

  const handleClickPrevious = () => {
    setCurrentTrackIndex((currentTrackIndex - 1 + playlist.length) % playlist.length);
  };


  return (
    <ReactH5AudioPlayer className='fixed bottom-0 left-0 w-full shadow-lg z-50 bg-cards text-sm'
      ref={playerRef}
      src={playlist[currentTrackIndex]?.url}
      onClickNext={handleClickNext}
      onClickPrevious={handleClickPrevious}
      onEnded={handleClickNext}
      showSkipControls={true}
      showJumpControls={false}
    />
  );
};

export default Reproductor;
