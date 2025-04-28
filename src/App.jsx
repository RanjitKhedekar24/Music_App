import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { Playlist } from "./pages/Playlist";
import { Search } from "./pages/Search";
import Nav from "./Component/Nav";
import { Like } from "./pages/Like";

function App() {
  return (
    <>
      <BrowserRouter
  future={{
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }}
>
  <Nav />
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/playlist" element={<Playlist />} />
    <Route path="/like" element={<Like />} />
    <Route path="/search" element={<Search />} />
    <Route path="*" element={<h1>404 - Page Not Found</h1>} />
  </Routes>
</BrowserRouter>

    </>
  );
}

export default App;
