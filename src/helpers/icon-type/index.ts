import { IDictionaryString } from "@/interfaces/general";

export const IconType = (name: string) => {
  const url: string = "/assets/icons/types-pokemon";
  const types: IDictionaryString = {
    "normal": `${url}/normal.svg`,
    "fighting": `${url}/fighting.svg`,
    "flying": `${url}/flying.svg`,
    "poison": `${url}/poison.svg`,
    "ground": `${url}/ground.svg`,
    "rock": `${url}/rock.svg`,
    "bug": `${url}/bug.svg`,
    "ghost": `${url}/ghost.svg`,
    "steel": `${url}/steel.svg`,
    "fire": `${url}/fire.svg`,
    "water": `${url}/water.svg`,
    "grass": `${url}/grass.svg`,
    "electric": `${url}/electric.svg`,
    "psychic": `${url}/psychic.svg`,
    "ice": `${url}/ice.svg`,
    "dragon": `${url}/dragon.svg`,
    "dark": `${url}/dark.svg`,
    "fairy": `${url}/fairy.svg`
  };
  return types[name];
};
