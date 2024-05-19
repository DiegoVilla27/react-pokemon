import { IPokemon } from "@/interfaces/pokemon";
import { PokeItem } from "./item";

interface IProps {
  pokemons: IPokemon[];
}

export const PokeList = ({ pokemons }: IProps) => {
  return (
    <div className="pokemons">
      {pokemons &&
        pokemons.map((pokemon: IPokemon) => (
          <div
            className="pokemons-item"
            key={pokemon.name}
          >
            <PokeItem pokemon={pokemon} />
          </div>
        ))}
    </div>
  );
};
