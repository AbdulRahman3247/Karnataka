import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reviewsByPlace: {
    p3: [
      { id: "r1", user: "Ananya", rating: 5, text: "Beautiful heritage store and warm staff." },
      { id: "r2", user: "Rahul", rating: 4, text: "Great quality silk, a bit pricey." },
    ],
  },
};

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    addReview(state, action) {
      const { placeId, review } = action.payload;
      if (!state.reviewsByPlace[placeId]) {
        state.reviewsByPlace[placeId] = [];
      }
      state.reviewsByPlace[placeId].unshift(review);
    },
  },
});

export const { addReview } = reviewsSlice.actions;
export default reviewsSlice.reducer;
