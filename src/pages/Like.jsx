import React from "react";
import Player from "../Component/player";
import { useSelector } from "react-redux";
import { Card } from "../Component/Card";

export const Like = () => {
  let songs = useSelector((state) => state.liked);
  
  return (
    <>
      <div className="w-[100%] h-[100vh] bg-black flex justify-start items-center flex-col md:pt-[100px] pt-[20px] gap-[30px] ">
        <Player />
        {songs?.length > 0 ? (
          <>
            <h1 className="text-white text-3xl font-semibold">Liked Songs</h1>
            <div className="w-full h-[100%] md:h-[65%] flex justify-start items-center flex-col gap-4 overflow-auto px-4">
              {songs.map((song, index) => (
                <Card 
                  key={index}
                  name={song.name} 
                  image={song.image} 
                  singer={song.singer} 
                  songIndex={song.songIndex}
                />
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="text-gray-600 flex justify-center items-center font-semibold text-3xl mt-20">
              No Liked Songs
            </div>
          </>
        )}
      </div>
    </>
  );
};
