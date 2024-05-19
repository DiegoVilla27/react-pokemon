import { IPokemon } from "@/interfaces/pokemon";
import { pokemonType } from "./pokemonType";

export interface TogglePokemonAction {
  type: string;
  payload: {
    pokemon: IPokemon | null;
  };
}

// Action toggle pokemon
export const togglePokemonAction = (
  pokemon: IPokemon | null
): TogglePokemonAction => ({
  type: pokemonType.toggle,
  payload: {
    pokemon
  }
});
