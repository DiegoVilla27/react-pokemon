import { IPokemon } from "@/interfaces/pokemon";
import { Reducer } from "redux";
import { TogglePokemonAction } from "./pokemonAction";
import { pokemonType } from "./pokemonType";

export interface InitialStatePokemon {
  show: boolean;
  pokemon: IPokemon | null;
}

const initialState: InitialStatePokemon = {
  show: false,
  pokemon: null
};

export const pokemonReducer: Reducer<
  InitialStatePokemon,
  TogglePokemonAction
> = (
  state: InitialStatePokemon = initialState,
  action: TogglePokemonAction
) => {
  switch (action.type) {
    case pokemonType.toggle:
      if (state.show) document.body.style.overflowY = "auto";
      else document.body.style.overflowY = "hidden";
      return {
        ...state,
        pokemon: action.payload.pokemon,
        show: !state.show
      };
    default:
      return state;
  }
};
