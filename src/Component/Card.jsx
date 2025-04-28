import { MdPlaylistAdd } from "react-icons/md";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import React, { useContext } from "react";
import { datacontext } from "../Context/UserContext";
import { useDispatch, useSelector } from "react-redux";
import { AddSong, RemoveSong } from "../redux/PlaylistSlice";
import { AddLiked, RemoveLiked } from "../redux/LikeSlice";
import { CgPlayListRemove } from "react-icons/cg";

export let Card = ({ name, image, singer, songIndex }) => {
  let { Playsong, index, setIndex } = useContext(datacontext);
  let dispatch = useDispatch();
  let gana = useSelector((state) => state.Playlist);
  let likedSongs = useSelector((state) => state.liked) || [];
  const songExitstInPlaylist = gana.find((song) => song.songIndex === songIndex);
  const songExitstInLikked = likedSongs.find((song) => song.songIndex === songIndex);

  return (
    <div className="w-[90%] md:h-[102px] h-[70px] bg-music-gray rounded-lg md:p-[2px] p-[5px] 
      flex justify-center hover:bg-opacity-80 items-center transition-all duration-300
      transform hover:scale-[1.02] animate-fade-in group">
      <div
        className="flex cursor-pointer justify-start items-center gap-[20px] w-[80%] h-[100%]"
        onClick={() => {
          setIndex(songIndex);
          Playsong();
        }}
      >
        <div className="overflow-hidden rounded-lg transition-transform duration-300 group-hover:scale-105">
          <img
            src={image}
            alt=""
            className="md:w-[100px] md:max-h-[100px] w-[60px] max-h-[60px] object-cover"
          />
        </div>
        <div className="text-[15px] md:text-[20px]">
          <div className="text-white text-[1.2em] font-semibold truncate group-hover:text-music-accent">
            {name}
          </div>
          <div className="text-music-light text-[0.9em] md:text-[0.75em] font-medium">
            {singer}
          </div>
        </div>
      </div>
      <div className="right text-[15px] md:text-[20px] flex justify-center items-center gap-[20px] w-[20%] h-[100%]">
        {!songExitstInPlaylist ? (
          <div
            onClick={() => {
              dispatch(AddSong({ name, image, singer, songIndex }));
            }}
            className="transform hover:scale-110 transition-transform"
          >
            <MdPlaylistAdd className="text-music-light hover:text-music-accent text-[1.5em] cursor-pointer" />
          </div>
        ) : (
          <div
            onClick={() => {
              dispatch(RemoveSong(songIndex));
            }}
            className="transform hover:scale-110 transition-transform"
          >
            <CgPlayListRemove className="text-music-accent hover:text-red-500 text-[1.5em] cursor-pointer" />
          </div>
        )}

        <div 
          onClick={() => {
            if (songExitstInLikked) {
              dispatch(RemoveLiked(songIndex));
            } else {
              dispatch(AddLiked({ name, image, singer, songIndex }));
            }
          }}
          className="transform hover:scale-110 transition-transform"
        >
          {songExitstInLikked ? (
            <FaHeart className="text-red-500 hover:text-red-600 text-[1.5em] cursor-pointer" />
          ) : (
            <FaRegHeart className="text-music-light hover:text-red-500 text-[1.5em] cursor-pointer" />
          )}
        </div>
      </div>
    </div>
  );
};



