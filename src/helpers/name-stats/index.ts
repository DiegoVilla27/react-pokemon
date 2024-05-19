import { IDictionaryString } from "@/interfaces/general";

export const NameStats = (name: string): string => {
  const names: IDictionaryString = {
    "hp": "Hp",
    "attack": "Attack",
    "defense": "Defense",
    "special-attack": "Sp. Atk",
    "special-defense": "Sp. Def",
    "speed": "Speed"
  };
  return names[name];
};
