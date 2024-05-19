import { PokeModal } from "@/components/display-item";
import { Spinner } from "@/components/spinner";
import { PokeHeader } from "./components/header";
import { PokeList } from "./components/list";
import { PokeSearch } from "./components/search";
import { useHome } from "./hooks";

const HomePage = () => {
  const {
    data,
    filteredPokemon,
    setFilteredPokemon,
    generation,
    setGeneration,
    loading,
    IMG_BG,
    togglePokemon
  } = useHome();

  return !loading ? (
    <>
      <div className="home">
        <img
          className="home-bg"
          src={IMG_BG}
        />
        <PokeHeader
          generation={generation}
          setGeneration={setGeneration}
        />
        <PokeSearch
          setFilteredPokemon={setFilteredPokemon}
          pokemons={data}
        />
        <PokeList pokemons={filteredPokemon} />
      </div>
      {togglePokemon ? <PokeModal /> : null}
    </>
  ) : (
    <Spinner />
  );
};

export default HomePage;
