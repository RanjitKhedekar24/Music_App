import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import {Playlist} from "./pages/Playlist";
import {Search} from "./pages/Search";
import Nav from "./Component/Nav";
import { Like } from "./pages/Like";

function App() {
  return (
    <>
      <BrowserRouter basename="/music-app">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/playlist" element={<Playlist />} />
          <Route path="/like" element={<Like/>} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
