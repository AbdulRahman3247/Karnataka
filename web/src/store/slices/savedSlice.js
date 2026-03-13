import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  saved: ["p3"],
};

const savedSlice = createSlice({
  name: "saved",
  initialState,
  reducers: {
    toggleSaved(state, action) {
      const id = action.payload;
      if (state.saved.includes(id)) {
        state.saved = state.saved.filter((x) => x !== id);
      } else {
        state.saved.push(id);
      }
    },
  },
});

export const { toggleSaved } = savedSlice.actions;
export default savedSlice.reducer;
