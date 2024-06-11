import { ColorType } from "@/helpers/color-type";
import { GradientBackground } from "@/helpers/gradient-background";
import { IconType } from "@/helpers/icon-type";
import { usePokeItem } from "./hooks";
import { PokeItemSkeleton } from "./skeleton/index.skeleton";
import { IPokemon } from "@/interfaces/pokemon";
import { Type } from "@/interfaces/pokemon-api";

interface IProps {
  pokemon: IPokemon;
}

export const PokeItem = ({ pokemon }: IProps) => {
  const { selectPokemon } = usePokeItem();

  if (pokemon) {
    const { info } = pokemon;
    const { sprites } = info!;
    const { other } = sprites;
    const { home } = other!;
    const { front_default } = home;
    return (
      <div
        className="pokemon group"
        style={{
          backgroundImage: GradientBackground(pokemon?.color)
        }}
        onClick={() => selectPokemon(pokemon)}
      >
        <div className="pokemon-info">
          <small>#{info!.id}</small>
          <h1>{info!.name}</h1>
          <div className="pokemon-info-stats">
            <div>{info!.weight}kg</div>
            <div>{info!.height}m</div>
          </div>
          <div className="pokemon-info-types">
            {info!.types.map((type: Type) => (
              <div
                key={type.type.name}
                style={{ backgroundColor: ColorType(type.type.name) }}
              >
                <img src={IconType(type.type.name)} />
                {type.type.name}
              </div>
            ))}
          </div>
        </div>
        <div className="pokemon-bubble"></div>
        <img
          className="pokemon-img"
          src={front_default}
        />
      </div>
    );
  }
  return <PokeItemSkeleton></PokeItemSkeleton>;
};
