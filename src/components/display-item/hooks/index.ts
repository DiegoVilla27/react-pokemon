import { IPokemon } from "@/interfaces/pokemon";
import { togglePokemonAction } from "@/redux/pokemon/pokemonAction";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";

export const usePokeModal = () => {
  const ICON_CLOSE: string = "/assets/icons/close.svg";

  const dispatch = useDispatch();

  const closePokemonModal = () => {
    dispatch(togglePokemonAction(null) as any); // eslint-disable-line @typescript-eslint/no-explicit-any
  };

  const pokemon: IPokemon | null = useSelector(
    (store: RootState) => store.pokemonSelected.pokemon
  );

  const { info } = pokemon!;
  const { sprites } = info!;
  const { other } = sprites;
  const { home } = other!;
  const { front_default } = home;

  return {
    pokemon,
    ICON_CLOSE,
    closePokemonModal,
    front_default,
    info
  };
};
