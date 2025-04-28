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
    <>
      <div
        className="w-[90%] md:h-[102px] h-[70px] bg-gray-800 rounded-lg md:p-[2px] p-[5px] 
      flex justify-center hover:bg-gray-700 items-center transition-all"
      >
        <div
          className="flex cursor-pointer justify-start items-center gap-[20px] w-[80%] h-[100%]"
          onClick={() => {
            setIndex(songIndex);
            Playsong();
          }}
        >
          <div>
            <img
              src={image}
              alt=""
              className="md:w-[100px] md:max-h-[100px]
                 w-[60px] max-h-[60px] rounded-lg"
            />
          </div>
          <div className="text-[15px] md:text-[20px]">
            <div className=" text-white  text-[1.2em] font-semibold">
              {name}
            </div>
            <div className=" text-gray-400 text-[0.9em] md:text-[0.75em] font-semibold">
              {singer}
            </div>
          </div>
        </div>
        <div className="right text-[15px] md:text-[20px] flex justify-center items-center gap-[20px] w-[20%] h-[100%]">
          {!songExitstInPlaylist && (
            <div
              onClick={() => {
                dispatch(
                  AddSong({
                    name: name,
                    image: image,
                    singer: singer,
                    songIndex: songIndex,
                  })
                );
              }}
            >
              <MdPlaylistAdd className="text-white text-[1.5em] cursor-pointer" />
            </div>
          )}
          {songExitstInPlaylist && (
            <div
              onClick={() => {
                dispatch(RemoveSong(songIndex));
              }}
            >
              <CgPlayListRemove className="text-white text-[1.5em] cursor-pointer" />
            </div>
          )}

          <div onClick={() => {
            if (songExitstInLikked) {
              dispatch(RemoveLiked(songIndex));
            } else {
              dispatch(AddLiked({
                name: name,
                image: image,
                singer: singer,
                songIndex: songIndex,
              }));
            }
          }}>
            {songExitstInLikked ? (
              <FaHeart className="text-red-500 text-[1.5em] cursor-pointer" />
            ) : (
              <FaRegHeart className="text-white text-[1.5em] cursor-pointer" />
            )}
          </div>
        </div>
      </div>
    </>
  );
};



