// LIST
export interface IPokemonList {
  pokemon_species: IPokemonSpecies[];
}

export interface IPokemonEntry {
  entry_number: number;
  pokemon_species: IPokemonSpecies;
  evolution_chain: string | null;
}

export interface IPokemonSpecies {
  name: string;
  url: string;
}
