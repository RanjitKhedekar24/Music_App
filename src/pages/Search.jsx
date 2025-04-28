import React, { useEffect, useState } from "react";
import Player from "../Component/player";
import { TbMusicSearch } from "react-icons/tb";
import { songsData } from "../songs";
import {Card} from "../Component/Card";

export let Search=()=> {
  let [input, setInput] = useState("");
  let [newList, setnewList] = useState([]);
  useEffect(() => {
    let a = songsData.filter(
      (song) =>
        song.name.toLowerCase().includes(input) ||
        song.singer.toLowerCase().includes(input)
    );
    setnewList(a);
  }, [input]);
  return (
    <>
      <div className="w-[100%] h-[100vh] bg-black flex justify-start items-center flex-col md:pt-[100px] pt-[20px] gap-[30px] ">
        <Player />
        <form
          className="w-[90%] md:w-[70%] h-[60px] bg-gray-800 flex items-center gap-4 rounded-lg px-6"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <TbMusicSearch className="text-2xl text-gray-300" />
          <input
            type="text"
            placeholder="Search for songs..."
            className="w-full h-full bg-transparent text-white outline-none placeholder:text-gray-400 "
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
        </form>
        {input ? (
          <div className="w-full h-[calc(100vh-250px)] flex flex-col p-6 gap-5 items-center overflow-y-auto">
            {newList.map((song, index) => (
              <Card
                key={index}
                name={song.name}
                image={song.image}
                singer={song.singer}
                songIndex={song.id - 1}
              />
            ))}
          </div>
        ) : (
          <div className="text-gray-600 flex justify-center items-center font-semibold text-3xl mt-20">
            Search Songs...
          </div>
        )}
      </div>
    </>
  );
}

