import { Rgb } from "../colors";
import { IPokemonApi } from "../pokemon-api";

// POKEMON
export interface IPokemon {
  name: string;
  url: string;
  info?: IPokemonApi;
  evolutions?: string[];
  evolution_url?: string;
  evolution_data?: IPokemonApi[];
  color?: string | number | Rgb;
}
