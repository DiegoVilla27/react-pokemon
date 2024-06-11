import { IPokemon } from "@/interfaces/pokemon";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface InitialStatePokemon {
  show: boolean;
  pokemon: IPokemon | null;
}

const initialState: InitialStatePokemon = {
  show: false,
  pokemon: null
};

export const pokemonSlice = createSlice({
  name: "pokemonSelected",
  initialState,
  reducers: {
    toggle: (state, action: PayloadAction<{ pokemon: IPokemon | null }>) => {
      state.pokemon = action.payload.pokemon;
      state.show = !state.show;
    }
  }
});

// Actions
export const { toggle } = pokemonSlice.actions;

// Reducer
export default pokemonSlice.reducer;
