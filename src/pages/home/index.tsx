import { Layout } from "@/layout";
import { useGetPokemonsSvc } from "@/services/pokemons";
import { PokemonList } from "./components/list";
import { Search } from "./components/search";
import { Header } from "./components/header";
import { useState } from "react";
import { Spinner } from "@/components/spinner";

const HomePage = () => {
  const [generation, setGeneration] = useState<number>(1);
  const { data, loading } = useGetPokemonsSvc(generation);

  return (
    <Layout>
      <div>
        <Header
          generation={generation}
          setGeneration={setGeneration}
        />
        <Search />
      </div>
      {!loading ? <PokemonList data={data} /> : <Spinner />}
    </Layout>
  );
};

export default HomePage;
