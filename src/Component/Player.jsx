import React, { useContext } from "react";
import { songsData } from "../songs";
import { datacontext } from "../Context/UserContext";
import { CgPlayButtonO } from "react-icons/cg";
import { FaRegCirclePause } from "react-icons/fa6";

function Player() {
  let { playingSong, Pausesong, Playsong, index } = useContext(datacontext);
  return (
    <>
      <div className="player md:w-[60%] w-[100%] h-[100px] bg-music-dark fixed 
        bottom-[55px] md:bottom-0 rounded-t-[30px] shadow-xl flex items-start pt-[10px]
        md:items-center md:p-[20px] backdrop-blur-lg bg-opacity-95 animate-slide-up
        border-t border-music-gray">
        <div className="left flex cursor-pointer justify-start items-start gap-[20px] w-[80%] h-[100%] pl-[30px] group">
          <div className="overflow-hidden rounded-lg transition-transform duration-300 group-hover:scale-105">
            <img
              src={songsData[index].image}
              alt=""
              className="md:w-[80px] md:max-h-[80px] w-[60px] max-h-[60px] object-cover"
            />
          </div>
          <div className="text-[20px] md:text-[25px] transition-all duration-300">
            <div className="text-white text-[1.2em] font-semibold truncate hover:text-music-accent">
              {songsData[index].name}
            </div>
            <div className="text-music-light text-[0.8em] md:text-[0.75em] font-medium">
              {songsData[index].singer}
            </div>
          </div>
        </div>
        <div className="right w-[20%] h-[100%] md:flex justify-center items-center">
          {!playingSong ? (
            <div
              className="w-[50px] h-[50px] rounded-full bg-music-accent text-black flex justify-center 
                items-center hover:bg-opacity-80 transition-all cursor-pointer transform hover:scale-105"
              onClick={() => Playsong()}
            >
              <CgPlayButtonO className="w-[60px] h-[60px]" />
            </div>
          ) : (
            <div
              className="w-[50px] h-[50px] rounded-full bg-music-accent text-black flex justify-center 
                items-center hover:bg-opacity-80 transition-all cursor-pointer transform hover:scale-105"
              onClick={() => Pausesong()}
            >
              <FaRegCirclePause className="w-[60px] h-[60px] animate-pulse-slow" />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Player;
