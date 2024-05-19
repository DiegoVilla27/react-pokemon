import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
  Store
} from "redux";
import { thunk, ThunkMiddleware } from "redux-thunk";

// Reducers
import { InitialStatePokemon, pokemonReducer } from "./pokemon/pokemonReducer";

export interface RootState {
  pokemonSelected: InitialStatePokemon;
}

const reducers = combineReducers<RootState>({
  pokemonSelected: pokemonReducer as any // eslint-disable-line @typescript-eslint/no-explicit-any
});

const store: Store<RootState> = createStore(
  reducers,
  applyMiddleware(thunk as ThunkMiddleware<RootState>)
);

export default store;
