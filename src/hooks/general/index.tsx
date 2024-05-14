import { useEffect } from "react";
import { TITLE_APP } from "@config/general.config";

const changeTitleDocument = () => {
  useEffect(() => {
    document.title = TITLE_APP;
  }, []);
};

export { changeTitleDocument };
