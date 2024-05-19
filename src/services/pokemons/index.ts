import { API_URL } from "@/config/general.config";
import { IPokemon } from "@/interfaces/pokemon";
import {
  Chain,
  IEvolutionChain,
  IGenerationResponse,
  IPokemonApi,
  IPokemonNameUrl,
  IPokemonSpecies
} from "@/interfaces/pokemon-api";
import axios from "@interceptor/index";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

export const useGetPokemonsSvc = (generation: number) => {
  const controller: AbortController = new AbortController();
  const { signal }: { signal: AbortSignal } = controller;

  const [data, setData] = useState<IPokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData: () => Promise<void> = async () => {
      setError(null);
      setLoading(true);
      try {
        const response: AxiosResponse<IGenerationResponse> = await axios.get(
          `${API_URL}/generation/${generation}`,
          { signal }
        );
        let pokemons: IPokemon[] = sortingPokemon(
          response.data.pokemon_species
        );
        pokemons = await getEvolutionUrl(pokemons);
        pokemons = await getEvolution(pokemons);
        pokemons = await getPokemon(pokemons);
        pokemons = findPokemonCurrent(pokemons);
        setData(pokemons);
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

const sortingPokemon = (pokemons: IPokemonNameUrl[]): IPokemonNameUrl[] => {
  return pokemons.sort((a: IPokemonNameUrl, b: IPokemonNameUrl) => {
    const numA = parseInt(a.url.match(/\/(\d+)\/$/)![1]);
    const numB = parseInt(b.url.match(/\/(\d+)\/$/)![1]);
    return numA - numB;
  });
};

const getEvolutionUrl = async (pokemons: IPokemon[]): Promise<IPokemon[]> => {
  const requests: Promise<IPokemon>[] = pokemons.map((pokemon: IPokemon) => {
    return axios
      .get(pokemon.url)
      .then((res: AxiosResponse<IPokemonSpecies>) => {
        const evolution_url = res.data.evolution_chain.url ?? null;
        return { ...pokemon, evolution_url };
      });
  });
  const entries: IPokemon[] = await Promise.all<Promise<IPokemon>[]>(requests);
  return entries;
};

const getEvolution = async (pokemons: IPokemon[]): Promise<IPokemon[]> => {
  const requests: Promise<IPokemon>[] = pokemons.map((pokemon: IPokemon) => {
    return axios
      .get(pokemon.evolution_url!)
      .then((res: AxiosResponse<IEvolutionChain>) => {
        const evolutions: string[] = extractEvolutions(res.data.chain);
        return { ...pokemon, evolutions };
      });
  });
  const entries: IPokemon[] = await Promise.all<Promise<IPokemon>[]>(requests);
  return entries;
};

const extractEvolutions = (
  chain: Chain,
  speciesArray: string[] = []
): string[] => {
  speciesArray.push(chain.species.name);
  chain.evolves_to.forEach((evolution: Chain) => {
    extractEvolutions(evolution, speciesArray);
  });
  return speciesArray;
};

const getPokemon = async (pokemons: IPokemon[]): Promise<IPokemon[]> => {
  const requests: Promise<IPokemon>[] = pokemons.map(
    async (pokemon: IPokemon) => {
      const evolutionDataPromises: Promise<IPokemonApi>[] =
        pokemon.evolutions!.map((evolution: string) =>
          axios
            .get(`${API_URL}/pokemon/${evolution}`)
            .then((res: AxiosResponse<IPokemonApi>) => res.data)
        );
      const evolution_data: IPokemonApi[] = await Promise.all(
        evolutionDataPromises
      );
      return {
        ...pokemon,
        evolution_data
      };
    }
  );
  const entries: IPokemon[] = await Promise.all<Promise<IPokemon>[]>(requests);
  return entries;
};

const findPokemonCurrent = (pokemons: IPokemon[]) => {
  return pokemons.map((pokemon: IPokemon) => {
    const find: IPokemonApi = pokemon.evolution_data!.find(
      (evolution: IPokemonApi) => evolution.name === pokemon.name
    )!;
    return {
      ...pokemon,
      info: find
    };
  });
};
