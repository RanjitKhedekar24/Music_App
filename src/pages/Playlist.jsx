import React from "react";
import Player from "../Component/Player";
import { useSelector } from "react-redux";
import { Card } from "../Component/Card";

export let Playlist = () => {
  let songs = useSelector((state) => state.Playlist);
  
  return (
    <>
      <div className="w-[100%] h-[100vh] bg-black flex justify-start items-center flex-col md:pt-[100px] pt-[20px] gap-[30px] ">
        <Player />
        {songs.length > 0 ? (
          <>
            <h1 className="text-white text-3xl font-semibold">Playlist</h1>
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
              No Songs in Playlist
            </div>
          </>
        )}
      </div>
    </>
  );
};
