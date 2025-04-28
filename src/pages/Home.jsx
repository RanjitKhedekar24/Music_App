import React, { useContext, useState, useEffect, useRef } from "react";
import { songsData } from ".././songs";
import musicimage from "../assets/musicanim.webp";
import { ImPrevious, ImNext } from "react-icons/im";
import { LuArrowDownNarrowWide } from "react-icons/lu";
import { CgPlayButtonO } from "react-icons/cg";
import { FaRegCirclePause } from "react-icons/fa6";
import { datacontext } from "../Context/UserContext";
import { Card } from "../Component/Card";
import Player from "../Component/player";

function Home() {
  let {
    audioRef,
    playingSong,
    Playsong,
    Pausesong,
    Nextsong,
    Previoussong,
    index,
  } = useContext(datacontext);

  let [range, setRange] = useState(0);
  let Progress = useRef(null);
  let [arrow, setArrow] = useState(false);

  useEffect(() => {
    const updateProgress = () => {
      const duration = audioRef.current.duration || 0;
      const currentTime = audioRef.current.currentTime || 0;
      const progressPercent = (currentTime / duration) * 100 || 0;
      setRange(isNaN(progressPercent) ? 0 : progressPercent);
      if (Progress.current) {
        Progress.current.style.width = `${progressPercent}%`;
      }
    };

    audioRef.current.addEventListener("timeupdate", updateProgress);
    return () =>
      audioRef.current.removeEventListener("timeupdate", updateProgress);
  }, [audioRef]);

  function handleRange(e) {
    const newRange = parseFloat(e.target.value);
    const duration = audioRef.current.duration;
    if (!isNaN(duration) && !isNaN(newRange)) {
      audioRef.current.currentTime = (newRange * duration) / 100;
      setRange(newRange);
    }
  }

  const [progress, setProgress] = useState(0);

  // Add audio progress tracking
  useEffect(() => {
    const audio = audioRef.current;

    const updateProgress = () => {
      const duration = audio.duration;
      const currentTime = audio.currentTime;
      const progressPercent = (currentTime / duration) * 100;
      setProgress(progressPercent || 0);
    };

    audio.addEventListener("timeupdate", updateProgress);
    return () => audio.removeEventListener("timeupdate", updateProgress);
  }, [audioRef]);

  const handleProgressChange = (e) => {
    const audio = audioRef.current;
    const value = e.target.value;
    const time = (value * audio.duration) / 100;
    audio.currentTime = time;
    setProgress(value);
  };

  return (
    <>
      <div className="w-full h-screen bg-black flex relative overflow-hidden">
        <LuArrowDownNarrowWide
          className="absolute text-white top-[25px] left-[10%] text-[28px] md:hidden"
          onClick={() => setArrow((prev) => !prev)}
        />
        {!arrow ? (
          <>
            <div
              className="md:w-[50%] w-full h-full  flex items-center justify-start 
        pt-[20px] md:pt-[120px] flex-col gap-[30px]"
            >
              <h1 className="text-white text-[20px] font-semibold">
                Now Playing
              </h1>
              <div className="md:max-w-[250px] w-[70%] h-[30%] object-fill rounded-md overflow-hidden relative">
                {songsData[index] && (
                  <img
                    src={songsData[index].image}
                    alt=""
                    className="w-[100%] h-[100%]"
                  />
                )}

                {playingSong ? (
                  <div className="w-full h-full bg-black absolute top-0 opacity-[0.5] flex justify-center items-center">
                    <img src={musicimage} alt="" className="w-[50%]" />
                  </div>
                ) : null}
              </div>
              <div>
                {songsData[index] && (
                  <>
                    <div className="text-white text-[30px] font-bold">
                      {songsData[index].name}
                    </div>
                    <div className="text-gray-400 text-[20px] text-center">
                      {songsData[index].singer}
                    </div>
                  </>
                )}
              </div>
              <div className="w-[50%] flex justify-center relative items-center rounded-md">
                <input
                  type="range"
                  className="appearance-none w-[100%] h-[8px]  bg-gray-600 cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-4
                [&::-webkit-slider-thumb]:h-4
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-white
                hover:[&::-webkit-slider-thumb]:bg-green-500
                transition-all duration-200"
                  min="0"
                  max="100"
                  value={range}
                  onChange={handleRange}
                />
                <div
                  className={`bg-white  h-[100%] absolute left-0`}
                  ref={Progress}
                ></div>
              </div>
              <div className="text-white flex justify-center items-center gap-5">
                <ImPrevious
                  className="w-[30px] h-[30px] hover:text-gray-600 transition-all cursor-pointer"
                  onClick={Previoussong}
                />
                {!playingSong ? (
                  <div
                    className="w-[50px] h-[50px] rounded-full bg-white text-black  flex justify-center items-center hover:bg-gray-600 transition-all cursor-pointer"
                    onClick={() => Playsong()}
                  >
                    <CgPlayButtonO className="w-[30px] h-[30px]" />
                  </div>
                ) : (
                  <div
                    className="w-[50px] h-[50px] rounded-full bg-white text-black flex justify-center items-center hover:bg-gray-600 transition-all cursor-pointer"
                    onClick={() => Pausesong()}
                  >
                    <FaRegCirclePause className="w-[30px] h-[30px]" />
                  </div>
                )}
                <ImNext
                  className="w-[30px] h-[30px] hover:text-gray-600 transition-all cursor-pointer"
                  onClick={Nextsong}
                />
              </div>
            </div>

            <div className="w-[100%] md:w-1/2 h-full hidden md:flex flex-col gap-[16px] pt-[120px] overflow-auto pb-[20px]">
              {songsData.map((song, index) => (
                <Card
                  key={index}
                  name={song.name}
                  image={song.image}
                  singer={song.singer}
                  songIndex={song.id - 1}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="w-[100%]  md:w-1/2 h-[80%] flex flex-col  items-center gap-3 mt-[60px] overflow-auto pb-[70px] bottom-1 relative">
            <Player />
            {songsData.map((song, index) => (
              <Card
                key={index}
                name={song.name}
                image={song.image}
                singer={song.singer}
                songIndex={song.id - 1}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
