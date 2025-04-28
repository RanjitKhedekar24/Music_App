import { createSlice } from "@reduxjs/toolkit";

const LikeSlice = createSlice({
  name: "liked",
  initialState: [],
  reducers: {
    AddLiked: (state, action) => {
      let exist = state.find((song) => song.songIndex === action.payload.songIndex);
      if (exist) {
        return;
      } else {
        state.push(action.payload);
      }
    },
    RemoveLiked: (state, action) => {
      return state.filter((song) => song.songIndex !== action.payload);
    }
  },
});

export const { AddLiked, RemoveLiked } = LikeSlice.actions;
export default LikeSlice.reducer;