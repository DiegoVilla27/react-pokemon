import { useEffect } from "react";
import { TITLE_APP } from "../../config/general.config";

const useGeneral = () => {
  useEffect(() => {
    document.title = TITLE_APP;
  }, []);
};

export default useGeneral;
