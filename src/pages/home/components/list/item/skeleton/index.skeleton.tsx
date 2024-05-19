import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const PokeItemSkeleton = () => {
  return (
    <SkeletonTheme
      baseColor="#cccccc"
      highlightColor="#b9b9b9"
    >
      <div className="poke-item-skeleton">
        <div>
          <Skeleton
            width={80}
            height={30}
          />
          <Skeleton
            width={150}
            height={30}
          />
          <div className="poke-item-skeleton-box">
            <Skeleton
              width={100}
              height={40}
            />
            <Skeleton
              width={100}
              height={40}
            />
          </div>
          <div className="poke-item-skeleton-box">
            <Skeleton
              width={100}
              height={40}
            />
            <Skeleton
              width={100}
              height={40}
            />
          </div>
        </div>
        <div>
          <Skeleton
            circle
            width={80}
            height={80}
          />
        </div>
      </div>
    </SkeletonTheme>
  );
};
