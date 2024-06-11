import { IPokemon } from "@interfaces/pokemon";
import { toggle } from "@store/pokemon";
import store from "@store/store";
import { useDispatch } from "react-redux";

export const usePokeItem = () => {
  const dispatch = useDispatch<typeof store.dispatch>();

  const selectPokemon = (pokemon: IPokemon) =>
    dispatch(toggle({ pokemon }) as any); // eslint-disable-line @typescript-eslint/no-explicit-any

  return {
    selectPokemon
  };
};
