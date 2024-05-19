import { Input } from "@/components/input";
import { IPokemon } from "@/interfaces/pokemon";
import { Dispatch, SetStateAction } from "react";
import { usePokeSearch } from "./hooks";

interface IProps {
  setFilteredPokemon: Dispatch<SetStateAction<IPokemon[]>>;
  pokemons: IPokemon[];
}

export const PokeSearch = ({ setFilteredPokemon, pokemons }: IProps) => {
  const { register, errors, handleSubmit, onSubmit, ICON_SEARCH } =
    usePokeSearch({ setFilteredPokemon, pokemons });

  return (
    <div className="search">
      <form
        className="search-form"
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <Input
          placeholder="Search Pokémon..."
          classes="search-form-input"
          name="query"
          type="text"
          errors={errors}
          register={register}
        />
        <img
          src={ICON_SEARCH}
          className="search-form-img"
        />
      </form>
    </div>
  );
};
