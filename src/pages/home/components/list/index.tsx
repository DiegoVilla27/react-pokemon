import { IPokemonEntry } from "@/interfaces/pokemon";
import { PokemonItem } from "./item";

interface IProps {
  data: IPokemonEntry[];
}

export const PokemonList = ({ data }: IProps) => {
  return (
    <ul>
      {data &&
        data.map((pokemon: IPokemonEntry) => (
          <PokemonItem
            key={pokemon.entry_number}
            pokemon={pokemon}
          />
        ))}
    </ul>
  );
};
