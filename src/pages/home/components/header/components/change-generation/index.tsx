import { Dispatch, SetStateAction } from "react";

interface IProps {
  generation: number;
  setGeneration: Dispatch<SetStateAction<number>>;
}

export const ChangeGeneration = ({ generation, setGeneration }: IProps) => {
  const toggleGeneration = () => setGeneration(generation === 1 ? 2 : 1);

  return (
    <button onClick={() => toggleGeneration()}>
      Gen {generation === 1 ? 2 : 1}
    </button>
  );
};
