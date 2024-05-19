import { ColorType } from "@/helpers/color-type";
import { GradientBackground } from "@/helpers/gradient-background";
import { IconType } from "@/helpers/icon-type";
import { NameStats } from "@/helpers/name-stats";
import { PercentageStats } from "@/helpers/percentage-stats";
import { IPokemonApi, Stat, Type } from "@/interfaces/pokemon-api";
import { usePokeModal } from "./hooks";

export const PokeModal = () => {
  const { pokemon, ICON_CLOSE, closePokemonModal, front_default, info } =
    usePokeModal();

  return (
    <div className="modal">
      <div className="modal-card">
        <div
          className="modal-card-bg"
          style={{ backgroundImage: GradientBackground(pokemon?.color) }}
        ></div>
        <div className="modal-card-header">
          <img
            src={ICON_CLOSE}
            onClick={() => closePokemonModal()}
          />
        </div>
        <div className="modal-card-content">
          <img
            src={front_default}
            alt={`Avatar ${pokemon!.name}`}
          />
          <h1>{pokemon!.name}</h1>
          <div className="modal-card-content-types">
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
          <div
            className={`modal-card-content-stats ${(pokemon!.evolutions && pokemon!.evolutions.length <= 1) ?? "mb-2"}`}
          >
            {info!.stats.map((stats: Stat) => (
              <div
                key={stats.stat.name}
                className="modal-card-content-stats-content"
              >
                <p className="modal-card-content-stats-content-name">
                  {NameStats(stats.stat.name)}
                </p>
                <p className="modal-card-content-stats-content-value">
                  {stats.base_stat}
                </p>
                <div className="modal-card-content-stats-content-progress">
                  <div
                    style={{
                      width: PercentageStats(stats.base_stat),
                      backgroundImage: GradientBackground(pokemon!.color!)
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {pokemon!.evolution_data && pokemon!.evolution_data.length > 1 ? (
          <div className="modal-card-footer">
            <hr />
            <div
              className={`modal-card-footer-items ${pokemon!.evolutions!.length > 3 ? "!flex-nowrap !justify-start overflow-x-auto" : ""}`}
            >
              {pokemon!.evolution_data.map((evolution: IPokemonApi) => (
                <img
                  key={evolution.sprites.other!.home.front_default}
                  src={evolution.sprites.other!.home.front_default}
                  alt={`Evolution ${pokemon!.name}`}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
