import ReactDOM from "react-dom/client";
//import "./assets/styles/index.scss";
import "./assets/styles/styles.min.css";
import HomePage from "./pages/home";
import { Provider } from "react-redux";
import store from "@redux/store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  //<React.StrictMode>
  <Provider store={store}>
    <HomePage />
  </Provider>
  //</React.StrictMode>
);
