// redux/slices/favoriteSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FavoriteState {
  favorites: any[]; // Укажите правильный тип вместо `any`, если он известен
}

const initialState: FavoriteState = {
  favorites: [],
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<any>) {
      const item = action.payload;
      const exists = state.favorites.find((fav) => fav.id === item.id);
      if (exists) {
        state.favorites = state.favorites.filter((fav) => fav.id !== item.id);
      } else {
        state.favorites.push(item);
      }
    },
  },
});

export const { toggleFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
