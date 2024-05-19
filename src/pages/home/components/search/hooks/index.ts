import { IPokemon } from "@/interfaces/pokemon";
import { yupResolver } from "@hookform/resolvers/yup";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";
import { validationsSearch } from "../validations";

export interface IForm {
  query?: string | null;
}

interface IProps {
  setFilteredPokemon: Dispatch<SetStateAction<IPokemon[]>>;
  pokemons: IPokemon[];
}

export const usePokeSearch = ({ setFilteredPokemon, pokemons }: IProps) => {
  const ICON_SEARCH: string = "/assets/icons/search.svg";

  // CONFIG FORM
  const {
    watch,
    //reset,
    register,
    //clearErrors,
    handleSubmit,
    formState: { errors /*isValid*/ }
  } = useForm<IForm>({
    resolver: yupResolver(validationsSearch({ maxLength: 50 })),
    criteriaMode: "all",
    mode: "all"
  });

  // SUBMIT FORM
  const onSubmit = () => {
    return;
  };

  /*const cleanForm = () => {
    reset();
    clearErrors();
  };*/

  useEffect(() => {
    const subscription = watch(({ query }, { name }) => {
      if (name === "query" && query!.length > 0) {
        const handler = setTimeout(() => {
          const filter: IPokemon[] = pokemons.filter((pokemon: IPokemon) =>
            pokemon.name.toLowerCase().includes(query!.toLowerCase())
          );
          setFilteredPokemon(filter);
        }, 500);
        return () => clearTimeout(handler);
      } else if (name === "query" && query!.length === 0)
        setFilteredPokemon(pokemons);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return {
    register,
    errors,
    handleSubmit,
    onSubmit,
    ICON_SEARCH
  };
};
