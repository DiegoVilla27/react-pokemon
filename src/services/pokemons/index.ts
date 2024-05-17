import { API_URL } from "@/config/general.config";
import {
  IPokemonEntry,
  IPokemonEvolutionChain,
  IPokemonList,
  IPokemonSpecies
} from "@/interfaces/pokemon";
import axios from "@interceptor/index";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

export const useGetPokemonsSvc = (generation: number) => {
  const controller: AbortController = new AbortController();
  const { signal }: { signal: AbortSignal } = controller;

  const [data, setData] = useState<IPokemonEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData: () => Promise<void> = async () => {
      setError(null);
      setLoading(true);
      try {
        const response: AxiosResponse<IPokemonList> = await axios.get(
          `${API_URL}/generation/${generation}`,
          { signal }
        );
        const species: IPokemonSpecies[] = sortingPokemon(
          response.data.pokemon_species
        );
        const entries: IPokemonEntry[] = mapSpeciesToEntry(species);
        const entries_with_evolution: IPokemonEntry[] =
          await mapEvolutionChain(entries);
        setData(entries_with_evolution);
      } catch (err: unknown) {
        if (axios.isCancel(err)) {
          setError((err as AxiosError).message);
        } else {
          setError((err as Error).message);
        }
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    };
    fetchData();
    return () => controller.abort();
  }, [generation]);

  return {
    data,
    loading,
    error
  };
};

const sortingPokemon = (pokemons: IPokemonSpecies[]): IPokemonSpecies[] => {
  return pokemons.sort((a: IPokemonSpecies, b: IPokemonSpecies) => {
    const numA = parseInt(a.url.match(/\/(\d+)\/$/)![1]);
    const numB = parseInt(b.url.match(/\/(\d+)\/$/)![1]);
    return numA - numB;
  });
};

const mapSpeciesToEntry = (species: IPokemonSpecies[]): IPokemonEntry[] => {
  return species.map<IPokemonEntry>((specie: IPokemonSpecies) => {
    const entry_number: string = specie.url.match(/\/(\d+)\/$/)![1];
    return {
      entry_number: Number(entry_number),
      pokemon_species: specie,
      evolution_chain: null
    };
  });
};

const mapEvolutionChain = async (
  pokemonEntry: IPokemonEntry[]
): Promise<IPokemonEntry[]> => {
  const requests: Promise<IPokemonEntry>[] = pokemonEntry.map(
    (pokemon: IPokemonEntry) => {
      return axios
        .get(pokemon.pokemon_species.url)
        .then((res: AxiosResponse<IPokemonEvolutionChain>) => {
          const evolution_chain = res.data.evolution_chain.url ?? null;
          return { ...pokemon, evolution_chain };
        });
    }
  );
  const entries: IPokemonEntry[] =
    await Promise.all<Promise<IPokemonEntry>[]>(requests);
  return entries;
};
