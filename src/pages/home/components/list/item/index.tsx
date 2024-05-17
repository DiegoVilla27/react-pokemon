import { IPokemonEntry } from "@/interfaces/pokemon";

interface IProps {
  pokemon: IPokemonEntry;
}

export const PokemonItem = ({ pokemon }: IProps) => {
  return <li>{pokemon.pokemon_species.name}</li>;
};
