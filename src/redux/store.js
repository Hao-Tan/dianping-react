import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import api from "../redux/middlewares/api";
import rootReducer from "./modules";

let store;

if (
  process.env.NODE_ENV === "production" &&
  window.__REDUX_DEVTOOLS_EXTENTION__
) {
  const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENTION_COMPOSE__;
  store = createStore(
    rootReducer,
    composeEnhancer,
    applyMiddleware(thunk, api)
  );
} else {
  store = createStore(rootReducer, applyMiddleware(thunk, api));
}

export default store;
