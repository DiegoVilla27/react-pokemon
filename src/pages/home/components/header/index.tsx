import { TITLE_APP } from "@/config/general.config";
import { ChangeGeneration } from "./components/change-generation";
import { Dispatch, SetStateAction } from "react";

interface IProps {
  generation: number;
  setGeneration: Dispatch<SetStateAction<number>>;
}

export const Header = ({ generation, setGeneration }: IProps) => {
  return (
    <div>
      <h1>{TITLE_APP}</h1>
      <ChangeGeneration
        generation={generation}
        setGeneration={setGeneration}
      />
    </div>
  );
};
