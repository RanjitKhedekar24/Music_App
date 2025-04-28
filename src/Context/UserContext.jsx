import React, { useEffect, useRef, useState } from "react";
import { songsData } from "../songs";
export const datacontext = React.createContext();
export let UserContext = ({ children }) => {
  let audioRef = useRef(new Audio());
  let [index, setIndex] = useState(0);
  let [playingSong, setPlayingSong] = useState(false);
  useEffect(() => {
    audioRef.current.src = songsData[index].song;
    audioRef.current.load();
    if (playingSong) {
      Playsong ()
    }
  }, [index]);
  function Playsong() {
    setPlayingSong(true);
    audioRef.current.play();
  }
  function Pausesong() {
    setPlayingSong(false);
    audioRef.current.pause();
  }
  function Nextsong() {
    setIndex((prevIndex) => (prevIndex + 1) % songsData.length);
    setPlayingSong(true);
    audioRef.current.play();
  }

  function Previoussong() {
    setIndex((prevIndex) => (prevIndex - 1 + songsData.length) % songsData.length);
    setPlayingSong(true);
    audioRef.current.play();
  }

  let value = { 
    audioRef, 
    Playsong, 
    Pausesong, 
    playingSong, 
    setPlayingSong, 
    Nextsong,
    Previoussong,
    index,
    setIndex
  };

  return (
    <div>
      <datacontext.Provider value={value}>{children}</datacontext.Provider>
    </div>
  );
};
