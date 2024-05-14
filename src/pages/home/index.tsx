import { IPokemonSpecies } from "@interfaces/pokemon";
import { useGetPokemonsSvc } from "@services/pokemon";
import { useState } from "react";

const HomePage = () => {
  const [generation, setGeneration] = useState<number>(1);
  const { data, loading } = useGetPokemonsSvc(generation);

  const toggleGeneration = () => setGeneration(generation === 1 ? 2 : 1);

  return (
    <>
      <button onClick={() => toggleGeneration()}>
        Gen {generation === 1 ? 2 : 1}
      </button>
      {!loading ? (
        <ul>
          {data &&
            data.pokemon_species.map((pokemon: IPokemonSpecies) =>
              PokemonItem(pokemon)
            )}
        </ul>
      ) : (
        <p>No hay pokemons</p>
      )}
    </>
  );
};

const PokemonItem = (pokemon: IPokemonSpecies) => {
  return <li key={pokemon.name}>{pokemon.name}</li>;
};

export default HomePage;
