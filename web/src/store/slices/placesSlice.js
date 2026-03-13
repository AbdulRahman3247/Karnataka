import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [
    "Food",
    "Stay",
    "Shops",
    "Hidden Gems",
    "Temples",
    "Nature",
    "Historical Places",
    "Local Picks",
  ],
  featured: [
    { id: "p1", name: "CTR Bengaluru", category: "Food", distance: 2.4, rating: 4.7 },
    { id: "p2", name: "Hampi Riverside", category: "Nature", distance: 6.1, rating: 4.8 },
    { id: "p3", name: "Mysuru Silk House", category: "Shops", distance: 3.3, rating: 4.5 },
  ],
  places: [
    { id: "p1", name: "CTR Bengaluru", category: "Food", distance: 2.4, rating: 4.7 },
    { id: "p2", name: "Hampi Riverside", category: "Nature", distance: 6.1, rating: 4.8 },
    { id: "p3", name: "Mysuru Silk House", category: "Shops", distance: 3.3, rating: 4.5 },
    { id: "p4", name: "Belur Temple", category: "Temples", distance: 12.2, rating: 4.6 },
    { id: "p5", name: "Coorg Homestay", category: "Stay", distance: 18.4, rating: 4.4 },
    { id: "p6", name: "Kabini Hideout", category: "Hidden Gems", distance: 25.5, rating: 4.5 },
  ],
  selectedCategory: "All",
};

const placesSlice = createSlice({
  name: "places",
  initialState,
  reducers: {
    setCategory(state, action) {
      state.selectedCategory = action.payload;
    },
    clearCategory(state) {
      state.selectedCategory = "All";
    },
  },
});

export const { setCategory, clearCategory } = placesSlice.actions;
export default placesSlice.reducer;
