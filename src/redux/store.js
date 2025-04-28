import { configureStore } from "@reduxjs/toolkit";
import PlaylistSlice from "./PlaylistSlice";
import LikeSlice from "./LikeSlice";

export const store = configureStore({
  reducer: {
    Playlist: PlaylistSlice,
    liked: LikeSlice
  },
});
