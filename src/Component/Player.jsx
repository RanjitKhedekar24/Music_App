import React, { useContext } from "react";
import { songsData } from "../songs";
import { datacontext } from "../Context/UserContext";
import { CgPlayButtonO } from "react-icons/cg";
import { FaRegCirclePause } from "react-icons/fa6";

function Player() {
  let { playingSong, Pausesong, Playsong ,index} = useContext(datacontext);
  return (
    <>
      <div
        className=" player md:w-[60%] w-[100%] h-[100px] bg-white fixed 
      bottom-[55px] md:bottom-0 rounded-t-[30px] shadow-lg flex items-start pt-[10px]
      md:items-center md:p-[20px]"
      >
        <div className="left flex cursor-pointer justify-start  items-start gap-[20px] w-[80%] h-[100%] pl-[30px] ">
          <div>
            <img
              src={songsData[index].image}
              alt=""
              className="md:w-[80px] md:max-h-[80px]
                 w-[60px] max-h-[60px] rounded-lg object-fill"
            />
          </div>
          <div className="text-[20px] md:text-[25px]">
            <div className=" text-black  text-[1.2em] font-semibold">
              {songsData[index].name}
            </div>
            <div className=" text-gray-900 text-[0.8em] md:text-[0.75em] font-semibold">
              {songsData[index].singer}
            </div>
          </div>
        </div>
        <div className="right w-[20%] h-[100%] md:flex justify-center items-center ">
        {!playingSong ? (
          <div
            className="w-[50px] h-[50px] rounded-full bg-black text-white  flex justify-center items-center hover:bg-gray-600 transition-all cursor-pointer"
            onClick={() => Playsong()}
          >
            <CgPlayButtonO className="w-[60px] h-[60px] " />
          </div>
        ) : (
          <div
            className="w-[50px] h-[50px] rounded-full bg-black text-white flex justify-center items-center hover:bg-gray-600 transition-all cursor-pointer"
            onClick={() => Pausesong()}
          >
            <FaRegCirclePause className="w-[60px] h-[60px] " />
          </div>
        )}
        </div>
      </div>
    </>
  );
}

export default Player;
