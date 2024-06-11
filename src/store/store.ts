import { configureStore } from "@reduxjs/toolkit";

// Reducers
import pokemonReducer from "./pokemon";

const store = configureStore({
  reducer: {
    pokemonSelected: pokemonReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
