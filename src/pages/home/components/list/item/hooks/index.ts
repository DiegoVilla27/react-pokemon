import { Color } from "@/interfaces/colors";
import { IPokemon } from "@/interfaces/pokemon";
import { togglePokemonAction } from "@/redux/pokemon/pokemonAction";
import store from "@/redux/store";
import { prominent } from "color.js";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const usePokeItem = (pokemon: IPokemon) => {
  const [pokemonFull, setPokemonFull] = useState<IPokemon>();

  const dispatch = useDispatch<typeof store.dispatch>();

  const selectPokemon = (pokemon: IPokemon) =>
    dispatch(togglePokemonAction(pokemon) as any); // eslint-disable-line @typescript-eslint/no-explicit-any

  useEffect(() => {
    if (pokemon) {
      const setNewData = async () => {
        await setColorBG(pokemon);
        setPokemonFull(pokemon);
      };
      setNewData();
    }
  }, [pokemon]);

  return {
    pokemonFull,
    selectPokemon
  };
};

const setColorBG = async (pokemon: IPokemon): Promise<void> => {
  const { info } = pokemon;
  const { sprites } = info!;
  const { other } = sprites;
  const { home } = other!;
  const { front_default } = home;
  await prominent(front_default!).then((color: Color) => {
    return (pokemon.color = color[1]);
  });
};
