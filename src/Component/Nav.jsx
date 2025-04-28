import React from "react";
import { FaHome, FaSearch, FaHeart } from "react-icons/fa";
import { RiPlayListFill } from "react-icons/ri";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <>
      <div className="w-full h-20 bg-black fixed bottom-0 md:top-0 text-white flex md:justify-center justify-around items-center md:gap-12 gap-5 p-5 md:rounded rounded-t-3xl z-10">
        <Link to="/"><FaHome className="w-6 h-6" /></Link>
        <Link to="/search"><FaSearch className="w-[25px] h-[25px]" /></Link>
        <Link to="/playlist"><RiPlayListFill className="w-[25px] h-[25px]" /></Link>
        <Link to="/like"><FaHeart className="w-[25px] h-[25px]" /></Link>
      </div>
    </>
  );
}

export default Nav;