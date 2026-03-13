import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchRecommendations } from "../../services/aiApi";

export const loadRecommendations = createAsyncThunk(
  "recommendations/load",
  async (payload) => {
    const data = await fetchRecommendations(payload);
    return data.recommended_place_ids || [];
  }
);

const recommendationsSlice = createSlice({
  name: "recommendations",
  initialState: {
    recommended: ["p2", "p4"],
    status: "idle",
  },
  reducers: {
    setRecommended(state, action) {
      state.recommended = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadRecommendations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadRecommendations.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.recommended = action.payload;
      })
      .addCase(loadRecommendations.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { setRecommended } = recommendationsSlice.actions;
export default recommendationsSlice.reducer;
