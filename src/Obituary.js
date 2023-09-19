


import React, { useEffect, useRef } from 'react';
import { useState } from 'react';

function Obituary({ obit, currentAudio, onPlay, onStop, created }) {

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    const onEnded = () => {
      setIsPlaying(false);
      onStop();
    };
    audio.addEventListener('ended', onEnded);
    return () => {
      audio.removeEventListener('ended', onEnded);
    };
  }, [onStop]);

  const toggle = () => {
    const btn = document.getElementById("btn-" + obit.id);
    if (isPlaying) {
      setIsPlaying(false);
      onStop();
      btn.innerHTML = "&#9654;";
    } else {
      setIsPlaying(true);
      onPlay(audioRef.current);
      btn.innerHTML = "&#x23F8;";
    }
  };

  const hideText = () => {
    const text = document.getElementById("text-" + obit.id);
    const btn = document.getElementById("btn-" + obit.id);
    if (text.style.display === "none") {
      text.style.display = "block";
      btn.style.display = "inline";
    } else {
      text.style.display = "none";
      btn.style.display = "none";
    }
  };

  return (
    <div className="obit-container" onLoad={created}>
      <img onClick={hideText} src={obit.img.replace("/upload/", "/upload/e_art:zorro/")} />
      <h2 className="name">{obit.name}</h2>
      <h3 className="date">{obit.born} - {obit.died}</h3>
      <p id={"text-" + obit.id}>{obit.text}</p>
      <button id={"btn-" + obit.id} onClick={toggle} className="play-pause-btn">&#9654;</button>
      <audio ref={audioRef} src={obit.audio} />
    </div>
  );
}

export default Obituary;
